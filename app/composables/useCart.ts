import { products, type Product } from '~/data/products'

export interface CartLine {
  slug: string
  qty: number
}

export interface CartLineWithProduct extends CartLine {
  product: Product
}

const STORAGE_KEY = 'zoo-cart-v1'
let hydrated = false

/**
 * Panier partagé (état SSR-safe via useState) persisté en localStorage. Démarre vide côté
 * serveur ET au tout premier rendu client (comme prefersReducedMotion, voir ce composable) :
 * la lecture du localStorage n'a lieu qu'en onMounted, jamais pendant setup(), pour éviter
 * tout mismatch d'hydratation. Ici la valeur n'est utilisée que de façon réactive dans les
 * templates (compteur, liste), donc un seul appelant a besoin de faire la lecture initiale —
 * contrairement à useReducedMotion, aucune logique impérative ailleurs ne dépend de lire la
 * valeur exacte dès son propre onMounted.
 */
export function useCart() {
  const cart = useState<CartLine[]>('cart', () => [])

  if (import.meta.client && !hydrated) {
    hydrated = true
    onMounted(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) cart.value = JSON.parse(raw)
      } catch {
        // localStorage indisponible ou contenu corrompu : on repart d'un panier vide.
      }
    })

    watch(
      cart,
      (value) => {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        } catch {
          // quota dépassé / navigation privée : rien de grave, juste pas de persistance.
        }
      },
      { deep: true }
    )
  }

  const lines = computed<CartLineWithProduct[]>(() =>
    cart.value
      .map((line) => {
        const product = products.find((p) => p.slug === line.slug)
        return product ? { ...line, product } : null
      })
      .filter((line): line is CartLineWithProduct => line !== null)
  )

  const count = computed(() => cart.value.reduce((total, line) => total + line.qty, 0))
  const total = computed(() => lines.value.reduce((sum, line) => sum + line.product.price * line.qty, 0))

  function addToCart(slug: string, qty = 1) {
    const existing = cart.value.find((line) => line.slug === slug)
    if (existing) {
      existing.qty += qty
    } else {
      cart.value.push({ slug, qty })
    }
  }

  function removeFromCart(slug: string) {
    cart.value = cart.value.filter((line) => line.slug !== slug)
  }

  function setQuantity(slug: string, qty: number) {
    if (qty < 1) {
      removeFromCart(slug)
      return
    }
    const existing = cart.value.find((line) => line.slug === slug)
    if (existing) existing.qty = qty
  }

  function clearCart() {
    cart.value = []
  }

  return { lines, count, total, addToCart, removeFromCart, setQuantity, clearCart }
}

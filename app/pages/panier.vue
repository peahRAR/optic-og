<script setup lang="ts">
useSeoMeta({
  title: 'Panier · Zoom Optique Cysoing',
  robots: 'noindex, follow'
})

const { lines, total, setQuantity, removeFromCart, clearCart } = useCart()

// Pas de classe `.reveal` sur le contenu du panier (liste, résumé, état vide) : ce contenu
// dépend de `lines`, qui n'est peuplé qu'après l'hydratation du panier depuis localStorage
// (useCart, en onMounted). useReveal ne capture que les `.reveal` présents au montage — un
// élément qui apparaît après serait animé... jamais, et resterait bloqué à opacity:0 (voir
// la classe `.reveal` dans main.css). Seul le titre, toujours présent, garde le reveal.
const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
</script>

<template>
  <div ref="root" class="mx-auto max-w-4xl px-6 pb-28 pt-40">
    <p class="reveal text-sm uppercase tracking-widest text-terracotta">Panier</p>
    <h1 class="reveal mt-3 text-4xl sm:text-5xl">Votre sélection</h1>

    <div v-if="lines.length" class="mt-12">
      <ul class="divide-y divide-anthracite/10 border-y border-anthracite/10">
        <li
          v-for="line in lines"
          :key="line.slug"
          class="flex flex-col gap-4 py-6 sm:flex-row sm:items-center"
        >
          <NuxtLink :to="`/boutique/${line.slug}`" class="h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-cream">
            <img
              :src="line.product.image"
              :alt="`${line.product.brand} ${line.product.name}`"
              width="200"
              height="150"
              class="h-full w-full object-cover"
            />
          </NuxtLink>

          <div class="flex-1">
            <p class="text-xs uppercase tracking-widest text-anthracite/50">{{ line.product.brand }}</p>
            <NuxtLink :to="`/boutique/${line.slug}`" class="text-lg hover:text-terracotta">
              {{ line.product.name }}
            </NuxtLink>
            <p class="mt-1 text-sm text-anthracite/60">{{ line.product.price }} € / unité</p>
          </div>

          <div class="flex items-center gap-6">
            <div class="flex items-center rounded-full border border-anthracite/15">
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center text-anthracite/70 hover:text-terracotta"
                aria-label="Diminuer la quantité"
                @click="setQuantity(line.slug, line.qty - 1)"
              >
                <Icon name="ph:minus" size="14" />
              </button>
              <span class="w-5 text-center text-sm">{{ line.qty }}</span>
              <button
                type="button"
                class="flex h-9 w-9 items-center justify-center text-anthracite/70 hover:text-terracotta"
                aria-label="Augmenter la quantité"
                @click="setQuantity(line.slug, line.qty + 1)"
              >
                <Icon name="ph:plus" size="14" />
              </button>
            </div>

            <p class="w-16 text-right text-sm">{{ line.product.price * line.qty }} €</p>

            <button
              type="button"
              class="text-anthracite/40 hover:text-terracotta"
              aria-label="Retirer du panier"
              @click="removeFromCart(line.slug)"
            >
              <Icon name="ph:trash" size="18" />
            </button>
          </div>
        </li>
      </ul>

      <div class="mt-8 flex flex-col items-end gap-2">
        <p class="text-sm text-anthracite/60">
          Total <span class="ml-3 text-xl text-anthracite">{{ total }} €</span>
        </p>
        <p class="max-w-sm text-right text-xs text-anthracite/50">
          Récapitulatif indicatif. Aucun paiement n'est pris en ligne : nous finalisons votre
          commande ensemble, par téléphone ou en boutique.
        </p>
      </div>

      <div class="mt-8 flex flex-wrap justify-end gap-4">
        <button type="button" class="text-sm text-anthracite/50 hover:text-terracotta" @click="clearCart">
          Vider le panier
        </button>
        <MagneticButton to="/?sujet=autre#contact">
          <Icon name="ph:chat-circle-text" size="18" />
          Finaliser ma commande
        </MagneticButton>
      </div>
    </div>

    <div v-else class="mt-16 rounded-2xl border border-anthracite/10 bg-white/40 p-12 text-center">
      <p class="text-anthracite/60">Votre panier est vide pour le moment.</p>
      <div class="mt-6">
        <MagneticButton to="/boutique" variant="outline">
          <Icon name="ph:eyeglasses" size="18" />
          Voir la boutique
        </MagneticButton>
      </div>
    </div>
  </div>
</template>

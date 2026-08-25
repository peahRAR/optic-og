<script setup lang="ts">
import { products } from '~/data/products'

const route = useRoute()
const product = products.find((p) => p.slug === route.params.slug)

if (!product) {
  throw createError({ statusCode: 404, statusMessage: 'Modèle introuvable', fatal: false })
}

useSeoMeta({
  title: `${product.brand} ${product.name} · Zoom Optique Cysoing`,
  description: product.description
})

const { addToCart } = useCart()
const quantity = ref(1)
const added = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

function handleAddToCart() {
  addToCart(product.slug, quantity.value)
  added.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    added.value = false
  }, 1600)
}

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 pb-28 pt-40">
    <div ref="root">
      <NuxtLink
        to="/boutique"
        class="reveal inline-flex items-center gap-1.5 text-sm text-anthracite/60 hover:text-terracotta"
      >
        <Icon name="ph:arrow-left" size="16" />
        Retour à la boutique
      </NuxtLink>

      <div class="mt-8 grid gap-12 lg:grid-cols-2">
        <div class="reveal overflow-hidden rounded-2xl bg-cream" style="aspect-ratio: 4/3">
          <img
            :src="product.image"
            :alt="`${product.brand} ${product.name}`"
            width="800"
            height="520"
            class="h-full w-full object-cover"
          />
        </div>

        <div>
          <p class="reveal text-sm uppercase tracking-widest text-terracotta">{{ product.brand }}</p>
          <h1 class="reveal mt-3 text-4xl sm:text-5xl">{{ product.name }}</h1>
          <p class="reveal mt-4 text-2xl text-anthracite/80">{{ product.price }} €</p>
          <p class="reveal mt-6 max-w-md leading-relaxed text-anthracite/70">{{ product.description }}</p>

          <dl class="reveal mt-8 flex gap-8 border-t border-anthracite/10 pt-6 text-sm">
            <div>
              <dt class="text-anthracite/50">Catégorie</dt>
              <dd class="mt-1 capitalize">{{ product.category }}</dd>
            </div>
            <div>
              <dt class="text-anthracite/50">Marque</dt>
              <dd class="mt-1">{{ product.brand }}</dd>
            </div>
          </dl>

          <div class="reveal mt-8 flex items-center gap-4">
            <div class="flex items-center rounded-full border border-anthracite/15">
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center text-anthracite/70 hover:text-terracotta"
                aria-label="Diminuer la quantité"
                @click="quantity = Math.max(1, quantity - 1)"
              >
                <Icon name="ph:minus" size="16" />
              </button>
              <span class="w-6 text-center text-sm">{{ quantity }}</span>
              <button
                type="button"
                class="flex h-11 w-11 items-center justify-center text-anthracite/70 hover:text-terracotta"
                aria-label="Augmenter la quantité"
                @click="quantity += 1"
              >
                <Icon name="ph:plus" size="16" />
              </button>
            </div>

            <MagneticButton type="button" @click="handleAddToCart">
              <Icon :name="added ? 'ph:check' : 'ph:shopping-bag'" size="18" />
              {{ added ? 'Ajouté au panier' : 'Ajouter au panier' }}
            </MagneticButton>
          </div>

          <div class="reveal mt-4 flex flex-wrap gap-4">
            <MagneticButton :to="`/?sujet=autre#contact`" variant="outline">
              <Icon name="ph:chat-circle-text" size="18" />
              Nous demander conseil sur ce modèle
            </MagneticButton>
            <MagneticButton to="/#boutiques" variant="outline">
              <Icon name="ph:map-pin" size="18" />
              Essayer en boutique
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

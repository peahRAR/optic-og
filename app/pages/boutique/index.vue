<script setup lang="ts">
import { products, type ProductCategory } from '~/data/products'

useSeoMeta({
  title: 'Boutique en ligne · Zoom Optique Cysoing',
  description: 'Découvrez une sélection de montures optiques et solaires homme, femme et enfant, disponibles chez Zoom Optique Cysoing.'
})

const { addToCart } = useCart()

// Retour visuel bref sur le bouton cliqué ("Ajouté ✓"), sans bloquer les autres cartes.
const justAdded = ref<string | null>(null)
let resetTimer: ReturnType<typeof setTimeout> | undefined
function handleAddToCart(slug: string) {
  addToCart(slug)
  justAdded.value = slug
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => {
    justAdded.value = null
  }, 1400)
}

const categories: { value: ProductCategory | 'tous'; label: string }[] = [
  { value: 'tous', label: 'Tous' },
  { value: 'homme', label: 'Homme' },
  { value: 'femme', label: 'Femme' },
  { value: 'kids', label: 'Kids' }
]

const activeCategory = ref<ProductCategory | 'tous'>('tous')
const activeBrand = ref('toutes')
const sortOrder = ref<'default' | 'price-asc' | 'price-desc'>('default')

const brands = computed(() => [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b)))

const filteredProducts = computed(() => {
  let list = products.filter((p) => activeCategory.value === 'tous' || p.category === activeCategory.value)
  if (activeBrand.value !== 'toutes') {
    list = list.filter((p) => p.brand === activeBrand.value)
  }
  if (sortOrder.value === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price)
  } else if (sortOrder.value === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price)
  }
  return list
})

const root = ref<HTMLElement | null>(null)
const grid = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
useReveal(grid, { children: '.reveal-card', stagger: 0.06 })
</script>

<template>
  <div class="mx-auto max-w-6xl px-6 pb-28 pt-40">
    <div ref="root">
      <p class="reveal text-sm uppercase tracking-widest text-terracotta">Boutique en ligne</p>
      <h1 class="reveal mt-3 max-w-2xl text-4xl sm:text-5xl">Nos montures</h1>
      <p class="reveal mt-4 max-w-xl text-anthracite/70 leading-relaxed">
        Un aperçu de notre sélection homme, femme et enfant. Disponibilité et essayage en boutique,
        à Cysoing.
      </p>

      <div class="reveal mt-10 flex flex-wrap items-center justify-between gap-4 border-y border-anthracite/10 py-5">
        <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filtrer par catégorie">
          <button
            v-for="cat in categories"
            :key="cat.value"
            type="button"
            role="tab"
            :aria-selected="activeCategory === cat.value"
            class="rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ease-editorial"
            :class="
              activeCategory === cat.value
                ? 'bg-anthracite text-cream'
                : 'bg-white/60 text-anthracite/70 hover:text-terracotta'
            "
            @click="activeCategory = cat.value"
          >
            {{ cat.label }}
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <label class="sr-only" for="filter-brand">Filtrer par marque</label>
          <select
            id="filter-brand"
            v-model="activeBrand"
            class="rounded-xl border border-anthracite/15 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-terracotta"
          >
            <option value="toutes">Toutes les marques</option>
            <option v-for="brand in brands" :key="brand" :value="brand">{{ brand }}</option>
          </select>

          <label class="sr-only" for="sort-order">Trier par prix</label>
          <select
            id="sort-order"
            v-model="sortOrder"
            class="rounded-xl border border-anthracite/15 bg-cream px-4 py-2.5 text-sm outline-none transition-colors focus:border-terracotta"
          >
            <option value="default">Tri par défaut</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
      </div>
    </div>

    <p class="mt-6 text-sm text-anthracite/50">
      {{ filteredProducts.length }} modèle{{ filteredProducts.length > 1 ? 's' : '' }}
    </p>

    <div v-if="filteredProducts.length" ref="grid" class="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <NuxtLink
        v-for="product in filteredProducts"
        :key="product.slug"
        :to="`/boutique/${product.slug}`"
        class="reveal-card group rounded-2xl border border-anthracite/10 bg-white/40 p-6 transition-colors duration-300 ease-editorial hover:border-terracotta/40"
      >
        <div class="overflow-hidden rounded-xl bg-cream" style="aspect-ratio: 4/3">
          <img
            :src="product.image"
            :alt="`${product.brand} ${product.name}`"
            width="400"
            height="260"
            loading="lazy"
            class="h-full w-full object-cover transition-transform duration-500 ease-editorial group-hover:scale-105"
          />
        </div>
        <p class="mt-5 text-xs uppercase tracking-widest text-anthracite/50">{{ product.brand }}</p>
        <h2 class="mt-1 text-lg">{{ product.name }}</h2>
        <div class="mt-2 flex items-center justify-between gap-3">
          <p class="text-sm text-terracotta">{{ product.price }} €</p>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 rounded-full border border-anthracite/15 px-3 py-1.5 text-xs transition-colors duration-300 ease-editorial hover:border-terracotta hover:text-terracotta"
            :class="justAdded === product.slug ? 'border-terracotta text-terracotta' : 'text-anthracite/70'"
            @click.stop.prevent="handleAddToCart(product.slug)"
          >
            <Icon :name="justAdded === product.slug ? 'ph:check' : 'ph:shopping-bag'" size="14" />
            {{ justAdded === product.slug ? 'Ajouté' : 'Ajouter' }}
          </button>
        </div>
      </NuxtLink>
    </div>

    <div v-else class="mt-16 rounded-2xl border border-anthracite/10 bg-white/40 p-10 text-center text-anthracite/60">
      Aucun modèle ne correspond à ces filtres.
    </div>
  </div>
</template>

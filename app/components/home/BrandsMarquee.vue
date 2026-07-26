<script setup lang="ts">
import { brands, type Brand } from '~/data/brands'

const { prefersReducedMotion } = useReducedMotion()

// In'Bô est un écusson circulaire avec du texte fin : il a besoin de plus de hauteur
// que les wordmarks simples pour rester lisible dans le bandeau.
function logoClass(brand: Brand) {
  return brand.dense ? 'h-12 max-w-[160px]' : 'h-7 max-w-[120px]'
}
</script>

<template>
  <section id="marques" class="border-y border-anthracite/10 py-16">
    <p class="mx-auto max-w-6xl px-6 text-sm uppercase tracking-widest text-anthracite/50">Nos marques</p>

    <!-- Sous reduced-motion : grille statique plutôt qu'un défilement. -->
    <div
      v-if="prefersReducedMotion"
      class="mx-auto mt-8 flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6"
    >
      <div
        v-for="brand in brands"
        :key="brand.name"
        class="flex h-12 items-center"
        :class="brand.onDark ? 'rounded-lg bg-anthracite px-4 py-2' : ''"
      >
        <NuxtImg
          v-if="brand.logo"
          :src="brand.logo"
          :alt="brand.name"
          class="object-contain grayscale"
          :class="[logoClass(brand), brand.onDark ? '' : 'opacity-70']"
        />
        <span v-else class="font-serif text-lg text-anthracite/70">{{ brand.name }}</span>
      </div>
    </div>

    <template v-else>
      <div class="group relative mt-8 overflow-hidden no-scrollbar" aria-hidden="true">
        <div class="flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused]">
          <div
            v-for="(brand, index) in [...brands, ...brands]"
            :key="`${brand.name}-${index}`"
            class="flex h-12 shrink-0 items-center"
            :class="brand.onDark ? 'rounded-lg bg-anthracite px-4 py-2' : ''"
          >
            <NuxtImg
              v-if="brand.logo"
              :src="brand.logo"
              :alt="brand.name"
              class="object-contain grayscale transition duration-300 ease-editorial hover:grayscale-0"
              :class="[logoClass(brand), brand.onDark ? '' : 'opacity-70 hover:opacity-100']"
            />
            <span v-else class="whitespace-nowrap font-serif text-lg text-anthracite/70">{{ brand.name }}</span>
          </div>
        </div>
      </div>
      <span class="sr-only">{{ brands.map((b) => b.name).join(', ') }}</span>
    </template>
  </section>
</template>

<style scoped>
@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 32s linear infinite;
}
</style>

<script setup lang="ts">
import { inbo } from '~/data/services'

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
</script>

<template>
  <section id="inbo" class="mx-auto max-w-6xl px-6 py-28">
    <div ref="root" class="grid items-center gap-12 lg:grid-cols-2">
      <div class="reveal overflow-hidden rounded-2xl lg:order-2" style="aspect-ratio: 547/300">
        <NuxtImg
          src="/img/brands/inbo-product.jpg"
          alt="Montures In'Bô en bois, fabriquées dans les Vosges"
          :width="1200"
          :height="658"
          format="webp"
          quality="82"
          class="h-full w-full object-cover"
        />
      </div>
      <div class="lg:order-1">
        <p class="reveal text-sm uppercase tracking-widest text-terracotta">{{ inbo.eyebrow }}</p>
        <h2 class="reveal mt-3 text-3xl sm:text-4xl">{{ inbo.title }}</h2>
        <p class="reveal mt-5 max-w-md text-anthracite/70 leading-relaxed">{{ inbo.description }}</p>
      </div>
    </div>
  </section>
</template>

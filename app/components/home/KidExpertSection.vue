<script setup lang="ts">
import { kidExpert } from '~/data/services'

const root = ref<HTMLElement | null>(null)
const photo = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
useImageReveal(photo)
</script>

<template>
  <section id="kid-expert" class="bg-sand/40 py-28">
    <div class="mx-auto max-w-6xl px-6">
      <div ref="root" class="grid items-center gap-12 lg:grid-cols-2">
        <div class="overflow-hidden rounded-2xl lg:order-2" style="aspect-ratio: 547/300">
          <!-- ref sur un wrapper (pas sur NuxtImg) : un composant n'expose pas forcément
               l'élément DOM au ref, contrairement à un élément natif. -->
          <div ref="photo" class="h-full w-full">
            <NuxtImg
              src="/img/highlight/kid-expert.jpg"
              alt="Le coin enfants de la boutique Zoom Optique Cysoing"
              :width="1200"
              :height="658"
              format="webp"
              quality="82"
              class="photo-grade h-full w-full object-cover"
            />
          </div>
        </div>
        <div class="lg:order-1">
          <p class="reveal text-sm uppercase tracking-widest text-terracotta">{{ kidExpert.eyebrow }}</p>
          <h2 class="reveal mt-3 text-3xl sm:text-4xl">{{ kidExpert.title }}</h2>
          <p class="reveal mt-5 max-w-md text-anthracite/70 leading-relaxed">{{ kidExpert.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

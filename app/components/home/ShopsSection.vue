<script setup lang="ts">
import { shops } from '~/data/shops'

const shop = shops[0]

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })

const photo = ref<HTMLElement | null>(null)
useImageReveal(photo, { blur: 6 })
</script>

<template>
  <section id="boutiques" class="bg-sand/40 py-28">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Nous trouver" title="Une boutique, un vrai savoir-faire">
        {{ shop.name }} à {{ shop.city }} : un opticien indépendant, membre du réseau Zoom
        Optique, à votre écoute.
      </SectionHeading>

      <div ref="root" class="mt-12 grid gap-10 rounded-3xl bg-cream p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr]">
        <div class="reveal">
          <BrandMark :height="32" />
          <h3 class="mt-4 text-2xl">{{ shop.name }}</h3>
          <address class="mt-4 text-anthracite/70 not-italic">{{ shop.address }}</address>

          <dl class="mt-6 space-y-2 text-sm">
            <div v-for="line in shop.hours" :key="line.days" class="flex justify-between gap-6">
              <dt class="text-anthracite/60">{{ line.days }}</dt>
              <dd>{{ line.hours }}</dd>
            </div>
          </dl>
          <p class="mt-2 text-xs text-anthracite/50">{{ shop.closedDays }}</p>

          <div class="mt-8 flex flex-wrap gap-4">
            <MagneticButton :to="`tel:${shop.phoneHref}`">
              <Icon name="ph:phone" size="18" />
              {{ shop.phone }}
            </MagneticButton>
            <MagneticButton v-if="shop.email" :to="`mailto:${shop.email}`" variant="outline">
              <Icon name="ph:envelope-simple" size="18" />
              {{ shop.email }}
            </MagneticButton>
          </div>
        </div>

        <div class="reveal overflow-hidden rounded-2xl">
          <div ref="photo" class="h-full min-h-[280px] w-full">
            <NuxtImg
              :src="shop.photo"
              :alt="`Intérieur de la boutique ${shop.name}`"
              :width="600"
              :height="450"
              format="webp"
              quality="80"
              class="photo-grade h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

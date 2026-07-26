<script setup lang="ts">
import { secondPairOffer, secondPairSteps } from '~/data/services'

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })

const stepsRoot = ref<HTMLElement | null>(null)
useReveal(stepsRoot, { children: '.reveal-step', stagger: 0.12 })
</script>

<template>
  <section id="offre" class="bg-anthracite py-28 text-cream">
    <div ref="root" class="mx-auto max-w-3xl px-6 text-center">
      <p class="reveal text-sm uppercase tracking-widest text-terracotta">{{ secondPairOffer.eyebrow }}</p>
      <h2 class="reveal mt-4 text-4xl sm:text-5xl">{{ secondPairOffer.title }}</h2>
      <p class="reveal mx-auto mt-6 max-w-xl text-cream/70 leading-relaxed">
        {{ secondPairOffer.description }}
      </p>
      <div class="reveal mt-10">
        <MagneticButton to="#boutiques">En profiter en boutique</MagneticButton>
      </div>
    </div>

    <div ref="stepsRoot" class="mx-auto mt-20 max-w-5xl px-6">
      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="(step, index) in secondPairSteps"
          :key="step.title"
          class="reveal-step rounded-2xl border border-cream/10 bg-cream/[0.04] p-7"
        >
          <div class="flex items-center gap-3">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-terracotta/20 text-sm text-terracotta">
              {{ index + 1 }}
            </span>
            <Icon :name="step.icon" size="24" class="text-terracotta" />
          </div>
          <h3 class="mt-5 text-lg">{{ step.title }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-cream/60">{{ step.description }}</p>
        </div>
      </div>

      <p class="reveal-step mx-auto mt-10 max-w-2xl text-center text-xs text-cream/40">
        {{ secondPairOffer.disclaimer }}
      </p>
    </div>
  </section>
</template>

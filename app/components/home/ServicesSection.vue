<script setup lang="ts">
import { services } from '~/data/services'

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal-card', stagger: 0.1 })
</script>

<template>
  <section id="services" class="mx-auto max-w-6xl px-6 py-28">
    <SectionHeading eyebrow="Produits & services" title="Un accompagnement complet">
      Au-delà de l'équipement, un suivi pensé pour durer.
    </SectionHeading>

    <div ref="root" class="mt-14 grid gap-6 sm:grid-cols-2">
      <article
        v-for="item in services"
        :key="item.title"
        class="reveal-card rounded-2xl border border-anthracite/10 bg-white/40 p-7"
      >
        <Icon :name="item.icon" size="26" class="text-terracotta" />
        <h3 class="mt-5 text-lg">{{ item.title }}</h3>
        <p class="mt-2 text-sm leading-relaxed text-anthracite/70">{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

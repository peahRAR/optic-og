<script setup lang="ts">
import { expertises } from '~/data/services'

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal-card', stagger: 0.12 })
</script>

<template>
  <section id="expertises" class="mx-auto max-w-6xl px-6 py-28">
    <SectionHeading eyebrow="Notre métier" title="Trois expertises, une exigence">
      Montures, verres et lentilles : nous prenons le temps de bien faire, à chaque étape.
    </SectionHeading>

    <div ref="root" class="mt-14 grid gap-8 sm:grid-cols-3">
      <article
        v-for="item in expertises"
        :key="item.title"
        class="reveal-card rounded-2xl border border-anthracite/10 bg-white/40 p-8"
      >
        <Icon :name="item.icon" size="28" class="text-terracotta" />
        <h3 class="mt-6 text-xl">{{ item.title }}</h3>
        <p class="mt-3 text-sm leading-relaxed text-anthracite/70">{{ item.description }}</p>
        <NuxtLink
          v-if="item.ctaLabel && item.ctaHref"
          :to="item.ctaHref"
          class="mt-5 inline-flex items-center gap-1.5 text-sm text-terracotta hover:text-terracotta-dark"
        >
          {{ item.ctaLabel }}
          <Icon name="ph:arrow-right" size="16" />
        </NuxtLink>
      </article>
    </div>
  </section>
</template>

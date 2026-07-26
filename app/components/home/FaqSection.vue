<script setup lang="ts">
import { faq } from '~/data/faq'

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })

const openIndex = ref<number | null>(0)

function toggle(index: number) {
  openIndex.value = openIndex.value === index ? null : index
}

// Données structurées FAQPage — reprend mot pour mot les questions/réponses affichées.
useSchemaOrg([
  {
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
])
</script>

<template>
  <section id="faq" class="mx-auto max-w-3xl px-6 py-28">
    <SectionHeading eyebrow="Questions fréquentes" title="Tout ce qu'il faut savoir" align="center">
      Tiers payant, garanties, lentilles, offre 2ᵉ paire… nos réponses aux questions les plus
      courantes.
    </SectionHeading>

    <div ref="root" class="mt-14 divide-y divide-anthracite/10 border-y border-anthracite/10">
      <div v-for="(item, index) in faq" :key="item.question" class="reveal">
        <h3>
          <button
            :id="`faq-trigger-${index}`"
            type="button"
            class="flex w-full items-center justify-between gap-4 py-6 text-left"
            :aria-expanded="openIndex === index"
            :aria-controls="`faq-panel-${index}`"
            @click="toggle(index)"
          >
            <span class="text-lg">{{ item.question }}</span>
            <Icon
              name="ph:plus"
              size="20"
              class="shrink-0 text-terracotta transition-transform duration-300 ease-editorial"
              :class="openIndex === index ? 'rotate-45' : ''"
            />
          </button>
        </h3>
        <div
          :id="`faq-panel-${index}`"
          role="region"
          :aria-labelledby="`faq-trigger-${index}`"
          class="grid transition-[grid-template-rows] duration-300 ease-editorial"
          :style="{ gridTemplateRows: openIndex === index ? '1fr' : '0fr' }"
        >
          <div class="overflow-hidden">
            <p class="pb-6 pr-10 leading-relaxed text-anthracite/70">{{ item.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

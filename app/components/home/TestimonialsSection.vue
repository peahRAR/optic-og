<script setup lang="ts">
import { testimonials, reviewLink } from '~/data/testimonials'

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal-card', stagger: 0.12 })
</script>

<template>
  <section id="avis" class="bg-sand/40 py-28">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Avis clients" title="Ce qu'en disent nos clients" align="center">
        Des avis Google réels, laissés par nos clients à Cysoing.
      </SectionHeading>

      <div ref="root" class="mt-14">
        <div class="grid gap-8 sm:grid-cols-3">
          <figure
            v-for="testimonial in testimonials"
            :key="testimonial.date"
            class="reveal-card flex flex-col rounded-2xl border border-anthracite/10 bg-cream p-8"
          >
            <div class="flex gap-0.5 text-terracotta" aria-hidden="true">
              <Icon v-for="n in testimonial.rating" :key="n" name="ph:star-fill" size="16" />
            </div>
            <blockquote class="mt-5 flex-1 font-serif text-lg leading-snug text-anthracite">
              « {{ testimonial.quote }} »
            </blockquote>
            <figcaption class="mt-6 text-sm text-anthracite/60">Avis Google · {{ testimonial.date }}</figcaption>
          </figure>
        </div>

        <div class="reveal-card mt-12 text-center">
          <MagneticButton :to="reviewLink" variant="outline">
            <Icon name="ph:pencil-simple-line" size="18" />
            Laisser un avis
          </MagneticButton>
        </div>
      </div>
    </div>
  </section>
</template>

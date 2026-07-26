<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })

const stats = [
  { value: '5', label: 'membres dans l’équipe' },
  { value: '4', label: 'opticiennes diplômées d’État' },
  { value: '86 m²', label: 'de surface de vente' }
]
</script>

<template>
  <section id="equipe" class="mx-auto max-w-6xl px-6 py-28">
    <div ref="root" class="grid items-center gap-12 lg:grid-cols-2">
      <div class="reveal overflow-hidden rounded-2xl lg:order-2" style="aspect-ratio: 787/585">
        <NuxtImg
          src="/img/team/team-photo.png"
          alt="L'équipe d'Optique Ogimont"
          :width="1200"
          :height="891"
          format="webp"
          quality="85"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="lg:order-1">
        <p class="reveal text-sm uppercase tracking-widest text-terracotta">L'équipe</p>
        <h2 class="reveal mt-3 text-3xl sm:text-4xl">
          Une équipe complémentaire, dans un espace pensé pour vous
        </h2>
        <p class="reveal mt-5 max-w-md text-anthracite/70 leading-relaxed">
          Cinq personnes, dont quatre opticiennes diplômées d'État aux compétences
          complémentaires, vous accueillent avec convivialité et bienveillance. Sur 86 m²
          lumineux, un large choix de montures optiques et solaires des plus grandes marques
          vous attend.
        </p>

        <div class="reveal mt-10 grid grid-cols-3 gap-6 border-t border-anthracite/10 pt-8">
          <div v-for="stat in stats" :key="stat.label">
            <p class="font-serif text-3xl text-terracotta">{{ stat.value }}</p>
            <p class="mt-1 text-xs uppercase tracking-wide leading-snug text-anthracite/60">
              {{ stat.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

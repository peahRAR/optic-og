<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const photo = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
useImageReveal(photo, { blur: 8 })

const stats = [
  { value: '5', label: 'membres dans l’équipe' },
  { value: '4', label: 'opticiennes diplômées d’État' },
  { value: '86 m²', label: 'de surface de vente' }
]
</script>

<template>
  <!-- Plein cadre (photo + texte en surimpression) : rompt volontairement avec le motif
       "image / texte en 2 colonnes" utilisé par les sections voisines (À domicile, In'Bô).
       Section plus basse (60vh, pas 85vh) + voile assombri + grain : la photo source est
       en résolution modeste, cette combinaison camoufle l'agrandissement plutôt que de
       l'exposer, et garantit la lisibilité du texte quel que soit l'endroit où il tombe. -->
  <section id="equipe" class="relative flex min-h-[60vh] items-end overflow-hidden">
    <div ref="photo" class="absolute inset-0">
      <NuxtImg
        src="/img/team/team-photo.png"
        alt="L'équipe d'Optique Ogimont"
        :width="1600"
        :height="1200"
        format="webp"
        quality="85"
        class="photo-grade h-full w-full object-cover"
        style="object-position: 50% 22%"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-anthracite/95 via-anthracite/75 to-anthracite/40" />
    <div class="grain-overlay absolute inset-0" aria-hidden="true" />

    <div ref="root" class="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 text-cream">
      <p class="reveal text-sm uppercase tracking-widest text-terracotta">L'équipe</p>
      <h2 class="reveal mt-3 max-w-xl text-3xl sm:text-4xl">
        Une équipe complémentaire, dans un espace pensé pour vous
      </h2>
      <p class="reveal mt-5 max-w-md leading-relaxed text-cream/80">
        Cinq personnes, dont quatre opticiennes diplômées d'État aux compétences
        complémentaires, vous accueillent avec convivialité et bienveillance. Sur 86 m²
        lumineux, un large choix de montures optiques et solaires des plus grandes marques
        vous attend.
      </p>

      <div class="reveal mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-cream/15 pt-8">
        <div v-for="stat in stats" :key="stat.label">
          <p class="font-serif text-3xl text-terracotta">{{ stat.value }}</p>
          <p class="mt-1 text-xs uppercase tracking-wide leading-snug text-cream/70">
            {{ stat.label }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

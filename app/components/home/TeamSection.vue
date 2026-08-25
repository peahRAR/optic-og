<script setup lang="ts">
const root = ref<HTMLElement | null>(null)
const photo = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
useImageReveal(photo, { blur: 8 })

const stats = [
  { value: '2006', label: 'depuis, à Cysoing' },
  { value: '4', label: 'membres dans l’équipe' },
  { value: '2000+', label: 'opticiens indépendants dans le réseau' }
]
</script>

<template>
  <!-- Plein cadre (photo + texte en surimpression) : rompt volontairement avec le motif
       "image / texte en 2 colonnes" utilisé par les sections voisines (boutique, Kid Expert).
       Section plus basse (60vh, pas 85vh) + voile assombri + grain : la photo source est
       en résolution modeste, cette combinaison camoufle l'agrandissement plutôt que de
       l'exposer, et garantit la lisibilité du texte quel que soit l'endroit où il tombe. -->
  <section id="equipe" class="relative flex min-h-[60vh] items-end overflow-hidden">
    <div ref="photo" class="absolute inset-0">
      <NuxtImg
        src="/img/team/team-photo.jpg"
        alt="L'équipe de Zoom Optique Cysoing"
        :width="1600"
        :height="1200"
        format="webp"
        quality="85"
        class="photo-grade h-full w-full object-cover"
        style="object-position: 50% 18%"
      />
    </div>
    <div class="absolute inset-0 bg-gradient-to-t from-anthracite/95 via-anthracite/75 to-anthracite/40" />
    <div class="grain-overlay absolute inset-0" aria-hidden="true" />

    <div ref="root" class="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-32 text-cream">
      <p class="reveal text-sm uppercase tracking-widest text-terracotta">L'équipe</p>
      <h2 class="reveal mt-3 max-w-xl text-3xl sm:text-4xl">
        Séverine, Pascal et leur équipe, à votre écoute depuis 2006
      </h2>
      <p class="reveal mt-5 max-w-md leading-relaxed text-cream/80">
        Séverine et Pascal NGO, opticiens passionnés, épaulés par Julie-Flore et Céline, vous
        accueillent avec une ambiance familiale. Une adresse indépendante qui s'appuie sur la
        force d'un réseau national pour vous offrir le meilleur des deux mondes.
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

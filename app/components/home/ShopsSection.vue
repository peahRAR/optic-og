<script setup lang="ts">
import { shops } from '~/data/shops'

const { prefersReducedMotion } = useReducedMotion()

const active = ref(shops[0].id)
const activeShop = computed(() => shops.find((shop) => shop.id === active.value)!)

// Photo par boutique : re-déclenchée par un clic d'onglet (pas le scroll), donc pas
// useImageReveal (scroll-only) — un tween direct, léger, à chaque changement d'onglet.
const photoEl = ref<HTMLElement | null>(null)
watch(
  activeShop,
  () => {
    if (!import.meta.client || prefersReducedMotion.value) return
    nextTick(() => {
      const el = photoEl.value
      if (!el) return
      const { $gsap } = useNuxtApp()
      el.style.filter = 'blur(6px)'
      el.style.opacity = '0'
      // État séparé (pas d'auto-référence au tween dans son propre onUpdate — voir
      // le même commentaire dans useImageReveal.ts pour le pourquoi).
      const state = { blur: 6 }
      $gsap.to(el, { opacity: 1, duration: 0.8, ease: 'power2.out' })
      $gsap.to(state, {
        blur: 0,
        duration: 0.8,
        ease: 'power2.out',
        onUpdate() {
          el.style.filter = `blur(${state.blur}px)`
        }
      })
    })
  },
  { immediate: true }
)

const tabButtons = ref<HTMLButtonElement[]>([])
function setTabRef(el: unknown, index: number) {
  if (el) tabButtons.value[index] = el as HTMLButtonElement
}

function selectByOffset(offset: number) {
  const index = shops.findIndex((shop) => shop.id === active.value)
  const next = (index + offset + shops.length) % shops.length
  active.value = shops[next].id
  nextTick(() => tabButtons.value[next]?.focus())
}
</script>

<template>
  <section id="boutiques" class="bg-sand/40 py-28">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Nous trouver" title="Deux boutiques, un même engagement">
        Optique Ogimont à Baisieux et Optique Willems : deux points de vente indépendants, chacun à
        votre écoute.
      </SectionHeading>

      <div class="mt-12 flex gap-3" role="tablist" aria-label="Choisir une boutique">
        <button
          v-for="(shop, index) in shops"
          :id="`tab-${shop.id}`"
          :key="shop.id"
          :ref="(el) => setTabRef(el, index)"
          type="button"
          role="tab"
          :aria-selected="active === shop.id"
          :aria-controls="`panel-${shop.id}`"
          :tabindex="active === shop.id ? 0 : -1"
          class="rounded-full px-6 py-3 text-sm transition-colors duration-300 ease-editorial"
          :class="
            active === shop.id
              ? 'bg-anthracite text-cream'
              : 'bg-white/60 text-anthracite/70 hover:text-terracotta'
          "
          @click="active = shop.id"
          @keydown.right.prevent="selectByOffset(1)"
          @keydown.left.prevent="selectByOffset(-1)"
        >
          {{ shop.name }} · {{ shop.city }}
        </button>
      </div>

      <div
        :id="`panel-${activeShop.id}`"
        role="tabpanel"
        :aria-labelledby="`tab-${activeShop.id}`"
        class="mt-10 grid gap-10 rounded-3xl bg-cream p-8 sm:p-10 lg:grid-cols-[1.1fr_0.8fr_0.8fr]"
      >
        <div>
          <div class="flex items-center gap-3">
            <NuxtImg :src="activeShop.logo" :alt="activeShop.name" width="44" height="44" class="h-11 w-11 rounded-xl" />
            <h3 class="text-2xl">{{ activeShop.name }}</h3>
          </div>
          <address class="mt-4 text-anthracite/70 not-italic">{{ activeShop.address }}</address>

          <dl class="mt-6 space-y-2 text-sm">
            <div v-for="line in activeShop.hours" :key="line.days" class="flex justify-between gap-6">
              <dt class="text-anthracite/60">{{ line.days }}</dt>
              <dd>{{ line.hours }}</dd>
            </div>
          </dl>
          <p class="mt-2 text-xs text-anthracite/50">{{ activeShop.closedDays }}</p>

          <div class="mt-8 flex flex-wrap gap-4">
            <MagneticButton :to="`tel:${activeShop.phoneHref}`">
              <Icon name="ph:phone" size="18" />
              {{ activeShop.phone }}
            </MagneticButton>
            <MagneticButton v-if="activeShop.email" :to="`mailto:${activeShop.email}`" variant="outline">
              <Icon name="ph:envelope-simple" size="18" />
              {{ activeShop.email }}
            </MagneticButton>
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl">
          <div :key="activeShop.id" ref="photoEl" class="h-full min-h-[280px] w-full">
            <NuxtImg
              :src="activeShop.photo"
              :alt="`Boutique ${activeShop.name} à ${activeShop.city}`"
              :width="600"
              :height="450"
              format="webp"
              quality="80"
              class="photo-grade h-full w-full object-cover"
            />
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl">
          <iframe
            :key="activeShop.id"
            :title="`Carte de ${activeShop.name}`"
            class="h-full min-h-[280px] w-full border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="`https://www.google.com/maps?q=${encodeURIComponent(activeShop.mapQuery)}&output=embed`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

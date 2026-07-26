<script setup lang="ts">
import { homeVisit } from '~/data/shops'

const { prefersReducedMotion } = useReducedMotion()

const root = ref<HTMLElement | null>(null)
const frame = ref<HTMLElement | null>(null)
const carImg = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })

let scrollTrigger: import('gsap/ScrollTrigger').ScrollTrigger | undefined

onMounted(() => {
  if (prefersReducedMotion.value) return
  const car = carImg.value
  const frameEl = frame.value
  if (!car || !frameEl) return

  const { $gsap } = useNuxtApp()
  // Hors cadre à gauche au départ (largeur du cadre + marge), glisse vers la droite
  // jusqu'à sa place. scrub (pas une durée fixe) : asservi au scroll, impossible à manquer.
  const startX = -(frameEl.getBoundingClientRect().width + 80)

  const tween = $gsap.fromTo(
    car,
    { x: startX, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 90%',
        end: 'top 40%',
        scrub: 0.3
      }
    }
  )
  scrollTrigger = tween.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger
})

onUnmounted(() => {
  scrollTrigger?.kill()
})
</script>

<template>
  <section id="domicile" class="mx-auto max-w-6xl px-6 py-28">
    <div ref="root" class="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <p class="reveal text-sm uppercase tracking-widest text-terracotta">Sur secteur</p>
        <h2 class="reveal mt-3 text-3xl sm:text-4xl">{{ homeVisit.title }}</h2>
        <p class="reveal mt-5 max-w-md text-anthracite/70 leading-relaxed">{{ homeVisit.description }}</p>
        <div class="reveal mt-8">
          <MagneticButton :to="`tel:${homeVisit.phoneHref}`">
            <Icon name="ph:phone-call" size="18" />
            Prendre RDV · {{ homeVisit.phone }}
          </MagneticButton>
        </div>
      </div>
      <!-- Le cadre reste fixe (reveal normal) ; seule la voiture, à l'intérieur, glisse
           de gauche à droite et s'arrête au centre. overflow-hidden : hors cadre = invisible. -->
      <div
        ref="frame"
        class="reveal relative flex items-center justify-center overflow-hidden rounded-2xl bg-sand/30 p-10"
        style="aspect-ratio: 4/3"
      >
        <div ref="carImg" class="flex h-full w-full items-center justify-center">
          <NuxtImg
            src="/img/services/home-visit.png"
            alt="Optique mobile Ogimont, véhicule de visite à domicile"
            :width="1000"
            :height="421"
            format="webp"
            quality="85"
            class="h-full w-full object-contain"
          />
        </div>
      </div>
    </div>
  </section>
</template>

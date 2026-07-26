import type { Ref } from 'vue'

interface ParallaxOptions {
  /** Distance parcourue en px (positive = l'élément monte en scrollant). */
  distance?: number
  scrub?: number | boolean
}

/**
 * Parallaxe verticale légère liée au scroll, désactivée sous prefers-reduced-motion.
 */
export function useParallax(target: Ref<HTMLElement | null>, options: ParallaxOptions = {}) {
  const { prefersReducedMotion } = useReducedMotion()
  let scrollTrigger: import('gsap/ScrollTrigger').ScrollTrigger | undefined

  onMounted(() => {
    const el = target.value
    if (!el || prefersReducedMotion.value) return

    const { $gsap } = useNuxtApp()

    const tween = $gsap.to(el, {
      y: -(options.distance ?? 80),
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: options.scrub ?? 1
      }
    })

    scrollTrigger = tween.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger
  })

  onUnmounted(() => {
    scrollTrigger?.kill()
  })
}

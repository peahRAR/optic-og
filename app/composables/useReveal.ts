import type { Ref } from 'vue'

interface RevealOptions {
  /** Sélecteur des enfants à animer en stagger ; sans quoi c'est le conteneur lui-même qui est animé. */
  children?: string
  y?: number
  duration?: number
  stagger?: number
  delay?: number
  start?: string
}

/**
 * Reveal au scroll (fade + translateY) sur un conteneur, via GSAP + ScrollTrigger.
 * Coupé si l'utilisateur préfère les animations réduites. Nettoyage systématique au unmount.
 */
export function useReveal(target: Ref<HTMLElement | null>, options: RevealOptions = {}) {
  const { prefersReducedMotion } = useReducedMotion()

  let scrollTrigger: import('gsap/ScrollTrigger').ScrollTrigger | undefined

  onMounted(() => {
    const el = target.value
    if (!el) return

    const elements = options.children ? el.querySelectorAll<HTMLElement>(options.children) : [el]
    const { $gsap } = useNuxtApp()

    if (prefersReducedMotion.value) {
      $gsap.set(elements, { opacity: 1, y: 0 })
      return
    }

    const tween = $gsap.fromTo(
      elements,
      { opacity: 0, y: options.y ?? 24 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.9,
        delay: options.delay ?? 0,
        stagger: options.stagger ?? 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 80%',
          // Ne joue qu'une fois : un ScrollTrigger.refresh() ultérieur (fonts/layout)
          // ne doit pas réinitialiser puis rejouer un reveal déjà visible (flash).
          once: true
        }
      }
    )

    scrollTrigger = tween.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger
  })

  onUnmounted(() => {
    scrollTrigger?.kill()
  })
}

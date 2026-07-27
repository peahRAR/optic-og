import type { Ref } from 'vue'

interface ImageRevealOptions {
  /** Flou de départ en px — volontairement très léger (mise au point discrète, pas un effet). */
  blur?: number
  duration?: number
  start?: string
}

/**
 * "Mise au point" au scroll : l'image part très légèrement floue et devient nette,
 * plutôt qu'un simple fondu. Une fois au premier passage dans le viewport.
 * Coupé sous prefers-reduced-motion.
 */
export function useImageReveal(target: Ref<HTMLElement | null>, options: ImageRevealOptions = {}) {
  const { prefersReducedMotion } = useReducedMotion()
  const blurAmount = options.blur ?? 6 // léger par design — ne pas monter beaucoup plus haut

  let scrollTrigger: import('gsap/ScrollTrigger').ScrollTrigger | undefined

  onMounted(() => {
    const el = target.value
    if (!el || prefersReducedMotion.value) return

    const { $gsap } = useNuxtApp()
    el.style.filter = `blur(${blurAmount}px)`
    el.style.opacity = '0'

    // État séparé (pas de référence au tween dans son propre onUpdate — GSAP peut
    // exécuter le premier rendu de façon synchrone, avant la fin de l'affectation
    // `const tween = ...`, ce qui lève "Cannot access 'tween' before initialization").
    const state = { blur: blurAmount }

    const tl = $gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: options.start ?? 'top 85%',
        once: true
      }
    })
    tl.to(el, { opacity: 1, duration: options.duration ?? 1.2, ease: 'power2.out' }, 0)
    tl.to(
      state,
      {
        blur: 0,
        duration: options.duration ?? 1.2,
        ease: 'power2.out',
        onUpdate() {
          el.style.filter = `blur(${state.blur}px)`
        }
      },
      0
    )

    scrollTrigger = tl.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger
  })

  onUnmounted(() => {
    scrollTrigger?.kill()
  })
}

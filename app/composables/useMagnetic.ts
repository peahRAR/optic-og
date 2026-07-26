import type { Ref } from 'vue'

interface MagneticOptions {
  /** Force du déplacement (fraction de la distance curseur → centre). */
  strength?: number
}

/**
 * Hover magnétique discret : l'élément suit légèrement le curseur puis revient à sa place.
 * Désactivé au clavier/tactile et sous prefers-reduced-motion.
 */
export function useMagnetic(target: Ref<HTMLElement | null>, options: MagneticOptions = {}) {
  const { prefersReducedMotion } = useReducedMotion()
  const strength = options.strength ?? 0.3

  let handleMove: ((event: PointerEvent) => void) | undefined
  let handleLeave: (() => void) | undefined

  onMounted(() => {
    const el = target.value
    if (!el || prefersReducedMotion.value || window.matchMedia('(pointer: coarse)').matches) return

    const { $gsap } = useNuxtApp()

    handleMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = event.clientX - (rect.left + rect.width / 2)
      const relY = event.clientY - (rect.top + rect.height / 2)

      $gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.6,
        ease: 'power3.out'
      })
    }

    handleLeave = () => {
      $gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    el.addEventListener('pointermove', handleMove)
    el.addEventListener('pointerleave', handleLeave)
  })

  onUnmounted(() => {
    const el = target.value
    if (!el) return
    if (handleMove) el.removeEventListener('pointermove', handleMove)
    if (handleLeave) el.removeEventListener('pointerleave', handleLeave)
  })
}

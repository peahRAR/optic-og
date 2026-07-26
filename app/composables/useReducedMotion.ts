/**
 * Source de vérité unique pour couper GSAP / Lenis / 3D quand
 * l'utilisateur a activé "Réduire les animations" côté OS/navigateur.
 * Ref partagée (état module) : un seul listener pour toute l'app.
 */
const prefersReducedMotion = ref(false)
let initialized = false

export function useReducedMotion() {
  if (!initialized && import.meta.client) {
    initialized = true
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = query.matches
    query.addEventListener('change', (event) => {
      prefersReducedMotion.value = event.matches
    })
  }

  return { prefersReducedMotion: readonly(prefersReducedMotion) }
}

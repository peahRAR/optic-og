/**
 * Source de vérité unique pour couper GSAP / Lenis / 3D quand
 * l'utilisateur a activé "Réduire les animations" côté OS/navigateur.
 * Ref partagée (état module) : un seul listener pour toute l'app.
 */
const prefersReducedMotion = ref(false)
let listenerAttached = false

export function useReducedMotion() {
  // Lue dans onMounted, jamais pendant setup() : la ref doit rester à sa valeur par défaut
  // (false) le temps du rendu d'hydratation initial, identique au SSR. La lire de façon
  // synchrone ferait diverger le tout premier rendu client d'un visiteur en "mouvement
  // réduit" du HTML rendu serveur — mismatch structurel pour tout template qui branche
  // dessus en v-if (ex: EngagementsMarquee).
  //
  // Chaque appelant enregistre SON PROPRE onMounted (pas juste le premier) : Vue exécute
  // les onMounted d'un même composant dans leur ordre d'enregistrement, donc un composant
  // qui appelle useReducedMotion() puis lit prefersReducedMotion.value dans son propre
  // onMounted (ex: useHeroLens) est garanti de voir la valeur à jour — sans dépendre de
  // l'ordre de montage d'un AUTRE composant, qui n'est pas fiable (déjà source d'un bug de
  // ce type ailleurs dans ce projet). Seul le listener 'change' reste un singleton global.
  if (import.meta.client) {
    onMounted(() => {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)')
      prefersReducedMotion.value = query.matches
      if (!listenerAttached) {
        listenerAttached = true
        query.addEventListener('change', (event) => {
          prefersReducedMotion.value = event.matches
        })
      }
    })
  }

  return { prefersReducedMotion: readonly(prefersReducedMotion) }
}

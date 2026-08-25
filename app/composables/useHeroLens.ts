import type { Ref } from 'vue'

interface HeroLensOptions {
  /** Longueur de scroll dédiée à l'animation, en multiples de 100vh (1.5 = 150%). */
  scrollLength?: number
  /** Flou du calque réel : départ et arrivée, en px. */
  blurFrom?: number
  blurTo?: number
}

interface HeroLensRefs {
  section: Ref<HTMLElement | null>
  /** Calque réel (contenu accessible) sur lequel le filter: blur() est appliqué. */
  blurLayer: Ref<HTMLElement | null>
  /** <clipPath> SVG qui découpe le calque décoratif net — reçoit le transform animé. */
  clipPath: Ref<SVGClipPathElement | null>
  /** Anneau de reflet optionnel, suit le même transform que clipPath. */
  rim?: Ref<SVGGElement | null>
}

/**
 * Pilote l'effet "on chausse les lunettes" :
 * - la TAILLE du verre et le flou du calque réel sont animés par un ScrollTrigger
 *   unique (pin + scrub) : le verre grandit et le flou diminue en scrollant.
 * - la POSITION du verre suit le curseur de la souris (GSAP quickTo, lissé),
 *   indépendamment du scroll.
 *
 * - Desktop / pointeur fin : pin complet + masque qui grandit + suit la souris.
 * - Mobile / pointeur tactile : repli simplifié, sans pin ni masque (pas de souris sur
 *   tactile) et sans scroll requis — un fondu flou -> net joué une fois au chargement,
 *   pour que le texte devienne lisible tout seul plutôt que de dépendre d'une action.
 * - prefers-reduced-motion : `showEffect` reste à false, rien ne s'anime.
 *
 * Important (SSR) : `showEffect` démarre à `false` et n'est mis à `true` que dans
 * onMounted. Le flou lui-même n'est JAMAIS posé par une classe/style réactif dans le
 * template — Vue ne corrige pas les mismatches de *style* à l'hydratation (contrairement
 * aux mismatches de structure), donc un style lié à prefersReducedMotion resterait figé
 * à sa valeur serveur. Tout le flou est appliqué ici, impérativement, après le montage.
 */
export function useHeroLens(refs: HeroLensRefs, options: HeroLensOptions = {}) {
  const { prefersReducedMotion } = useReducedMotion()

  const scrollLength = options.scrollLength ?? 1.5
  const blurFrom = options.blurFrom ?? 12
  const blurTo = options.blurTo ?? 0

  // Démarre à false côté serveur ET côté client (avant montage) : aucun mismatch
  // d'hydratation possible. Les v-if du template doivent se baser sur ce flag,
  // jamais directement sur prefersReducedMotion.
  const showEffect = ref(false)
  const isSimplified = ref(false)

  let scrollTrigger: import('gsap/ScrollTrigger').ScrollTrigger | undefined
  let onPointerMove: ((event: PointerEvent) => void) | undefined
  let pointerTarget: HTMLElement | undefined

  onMounted(() => {
    if (prefersReducedMotion.value) return // showEffect reste false : hero net et statique

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    const isNarrow = window.matchMedia('(max-width: 640px)').matches
    isSimplified.value = isCoarsePointer || isNarrow
    showEffect.value = true

    // Important : pas de `await nextTick()` ici. Le pin (ScrollTrigger) doit s'enregistrer
    // de façon SYNCHRONE, dans le même passage que le montage des autres composants plus
    // bas sur la page. Un await aurait retardé sa création après celle de triggers créés
    // plus tard dans l'arbre (ex: un ScrollTrigger d'une section plus bas), et GSAP calcule les
    // positions de ces triggers suivants EN FONCTION de l'ordre de création des pins — un
    // pin enregistré trop tard fait que les triggers après lui sont mal positionnés (décalage
    // exactement égal à la longueur de scroll du pin, constaté en debug). `clipPath` n'est
    // jamais sous v-if (toujours dans le DOM), donc pas besoin d'attendre pour l'obtenir ;
    // `rim` (optionnel) peut être null le temps d'un tick, `apply()` gère ça avec `rim?.`.
    const { $gsap } = useNuxtApp()
    const section = refs.section.value
    const blur = refs.blurLayer.value
    if (!section || !blur) return

    if (isSimplified.value) {
      // Repli mobile/tactile : pas de pin, pas de masque (pas de curseur à suivre sur
      // tactile), pas de scroll requis (le texte doit être lisible tout seul, sans action
      // de l'utilisateur) — un simple fondu flou -> net, joué une fois au chargement.
      const state = { blur: blurFrom }
      blur.style.filter = `blur(${state.blur}px)`
      $gsap.to(state, {
        blur: blurTo,
        duration: 1.1,
        delay: 0.15,
        ease: 'power2.out',
        onUpdate() {
          blur.style.filter = `blur(${state.blur}px)`
        }
      })
      return
    }

    const clipPath = refs.clipPath.value
    if (!clipPath) return

    const vw = window.innerWidth
    const vh = window.innerHeight
    const diag = Math.hypot(vw, vh)

    // Le verre (tracé local ~ cercle de rayon 100, voir template) part petit et bas,
    // comme posé sur le nez, puis grandit jusqu'à couvrir tout l'écran au fil du scroll.
    const startRadius = Math.min(vw, vh) * 0.16
    const endRadius = (diag / 2) * 1.15 // marge pour déborder franchement du viewport

    const state = {
      x: vw / 2,
      y: vh * 0.92,
      scale: startRadius / 100,
      blur: blurFrom
    }

    function apply() {
      const transform = `translate(${state.x} ${state.y}) scale(${state.scale})`
      clipPath.setAttribute('transform', transform)
      // Lu à chaque appel (pas capturé une fois) : au premier appel ci-dessous, le <svg
      // v-if="showEffect && !isSimplified"> n'existe pas encore (showEffect vient d'être
      // activé mais Vue n'a pas encore posé le patch DOM dans ce même tick synchrone) —
      // une capture figée resterait null pour toujours, laissant le reflet s'afficher
      // sans transform (donc épinglé en haut à gauche, comme une 2e loupe fantôme).
      refs.rim?.value?.setAttribute('transform', transform)
      blur.style.filter = `blur(${state.blur}px)`
    }

    apply()
    // Vue crée le <g ref="rimEl"> juste après ce tick synchrone (patch réactif de
    // showEffect) : on rejoue apply() une fois le DOM à jour pour le positionner
    // immédiatement, sans attendre un premier scroll/mousemove.
    nextTick(apply)

    // Position du verre : suit la souris, avec un léger lissage (quickTo réutilise
    // une seule interpolation par frame, plus performant qu'un tween recréé à chaque event).
    const moveX = $gsap.quickTo(state, 'x', { duration: 0.5, ease: 'power3', onUpdate: apply })
    const moveY = $gsap.quickTo(state, 'y', { duration: 0.5, ease: 'power3', onUpdate: apply })

    pointerTarget = section
    onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      moveX(event.clientX - rect.left)
      moveY(event.clientY - rect.top)
    }
    pointerTarget.addEventListener('pointermove', onPointerMove)

    // Taille du verre + flou : pilotés par le scroll (pin + scrub), indépendamment de la souris.
    const tween = $gsap.to(state, {
      scale: endRadius / 100,
      blur: blurTo,
      ease: 'none',
      onUpdate: apply,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        // Course de scroll ajustable : window.innerHeight * scrollLength (voir option ci-dessus).
        end: () => `+=${window.innerHeight * scrollLength}`,
        scrub: 0.6,
        pin: true
      }
    })

    scrollTrigger = tween.scrollTrigger as import('gsap/ScrollTrigger').ScrollTrigger
  })

  onUnmounted(() => {
    scrollTrigger?.kill()
    if (onPointerMove && pointerTarget) {
      pointerTarget.removeEventListener('pointermove', onPointerMove)
    }
  })

  return {
    showEffect: readonly(showEffect),
    isSimplified: readonly(isSimplified)
  }
}

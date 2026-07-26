import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  const query = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (query.matches) return

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true
  })

  // Lenis pilote le rendu, ScrollTrigger se recalibre à chaque frame de scroll.
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)

  // Un seul refresh, débounced : les images/polices qui finissent de charger décalent la
  // mise en page (donc les positions de déclenchement calculées par les triggers plus bas
  // sur la page, y compris le pin du hero). Appeler refresh() plusieurs fois à des moments
  // différents (mount / load / fonts.ready) sans coordination fait se chevaucher les cycles
  // de recalcul du pin épinglé du hero, ce qui corrompt les positions des triggers suivants
  // (constaté : décalage de position égal pile à la longueur de scroll du pin). Un seul
  // minuteur debounced garantit qu'une seule passe de refresh s'exécute, une fois que tout
  // s'est stabilisé.
  let refreshTimer: ReturnType<typeof setTimeout> | undefined
  function scheduleRefresh() {
    clearTimeout(refreshTimer)
    refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 200)
  }

  const nuxtApp = useNuxtApp()
  nuxtApp.hook('app:mounted', scheduleRefresh)
  window.addEventListener('load', scheduleRefresh)
  document.fonts?.ready?.then(scheduleRefresh)

  return {
    provide: { lenis }
  }
})

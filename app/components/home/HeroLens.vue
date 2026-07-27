<script setup lang="ts">
/**
 * Hero "on chausse les lunettes" (POV monoculaire).
 *
 * Deux calques superposés de la même scène :
 * - `blurLayer` : le contenu RÉEL (accessible, lu normalement par les lecteurs d'écran).
 *   Son flou (filter) est purement visuel, appliqué impérativement par useHeroLens
 *   (jamais via un style réactif dans ce template — voir le commentaire du composable
 *   sur les mismatches d'hydratation) — jamais de contenu dupliqué pour les lecteurs d'écran.
 * - le calque `aria-hidden` sous les <svg> : une copie DÉCORATIVE de la même scène,
 *   toujours nette, découpée par le masque `hero-lens-clip` (forme de verre).
 *
 * La frontière net/flou = la forme du masque, animée en transform (scale/translate,
 * pas de reflow) par useHeroLens via un unique ScrollTrigger (pin + scrub).
 *
 * `showEffect` démarre à false (SSR + avant montage) et n'est activé qu'après le montage
 * si prefers-reduced-motion n'est pas actif : aucun v-if ici ne dépend directement de
 * prefersReducedMotion, donc aucun mismatch d'hydratation possible.
 *
 * Réglages à ajuster : voir les options passées à useHeroLens ci-dessous
 * (scrollLength = course de scroll, blurFrom/blurTo = intensité du flou).
 */
const section = ref<HTMLElement | null>(null)
const blurLayer = ref<HTMLElement | null>(null)
const clipPathEl = ref<SVGClipPathElement | null>(null)
const rimEl = ref<SVGGElement | null>(null)

const { showEffect, isSimplified } = useHeroLens(
  { section, blurLayer, clipPath: clipPathEl, rim: rimEl },
  {
    scrollLength: 1.5, // course de scroll pour l'animation, en multiples de 100vh
    blurFrom: 12, // flou de départ du calque réel (px)
    blurTo: 0
  }
)
</script>

<template>
  <section ref="section" class="relative h-screen overflow-hidden bg-cream">
    <!-- Calque réel/accessible — seul contenu lu par les lecteurs d'écran. Le flou initial
         (hero-blur-initial, voir main.css) est posé en CSS pur, jamais en style réactif Vue,
         pour être présent dès le premier paint ; useHeroLens reprend ensuite la main en JS
         via un style inline (même valeur de départ, donc aucun flash net -> flou). -->
    <div
      ref="blurLayer"
      class="hero-blur-initial absolute inset-0 flex items-center"
      style="will-change: filter"
    >
      <div class="absolute inset-0" aria-hidden="true">
        <NuxtImg
          src="/img/hero/hero-background.jpg"
          alt=""
          :width="1600"
          :height="1000"
          format="webp"
          quality="80"
          preload
          fetchpriority="high"
          class="photo-grade h-full w-full object-cover"
          style="object-position: 85% 65%"
        />
        <div
          class="absolute inset-0"
          style="
            background-image: linear-gradient(
              100deg,
              rgba(247, 242, 236, 0.95) 0%,
              rgba(247, 242, 236, 0.8) 40%,
              rgba(247, 242, 236, 0.25) 68%,
              rgba(247, 242, 236, 0.05) 90%
            );
          "
        />
      </div>

      <div class="relative mx-auto max-w-6xl px-6">
        <p class="text-sm uppercase tracking-widest text-terracotta">
          Opticien indépendant · Baisieux &amp; Willems
        </p>
        <h1 class="mt-5 max-w-2xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          La vue est belle,<br />
          elle mérite un regard <span class="text-terracotta">juste</span>.
        </h1>
        <p class="mt-6 max-w-lg text-lg leading-relaxed text-anthracite/70">
          Deux boutiques à votre écoute, à Baisieux et à Willems.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton to="#boutiques">Prendre rendez-vous</MagneticButton>
        </div>
      </div>
    </div>

    <!-- Calque décoratif : copie toujours nette, révélée par le masque en forme de verre.
         Absent en repli simplifié (isSimplified) : pas de masque à animer sur mobile. -->
    <div
      v-if="showEffect && !isSimplified"
      class="pointer-events-none absolute inset-0 flex items-center"
      aria-hidden="true"
      style="clip-path: url(#hero-lens-clip); will-change: clip-path"
    >
      <div class="absolute inset-0">
        <NuxtImg
          src="/img/hero/hero-background.jpg"
          alt=""
          :width="1600"
          :height="1000"
          format="webp"
          quality="80"
          class="photo-grade h-full w-full object-cover"
          style="object-position: 85% 65%"
        />
        <div
          class="absolute inset-0"
          style="
            background-image: linear-gradient(
              100deg,
              rgba(247, 242, 236, 0.95) 0%,
              rgba(247, 242, 236, 0.8) 40%,
              rgba(247, 242, 236, 0.25) 68%,
              rgba(247, 242, 236, 0.05) 90%
            );
          "
        />
      </div>

      <div class="relative mx-auto max-w-6xl px-6">
        <p class="text-sm uppercase tracking-widest text-terracotta">
          Opticien indépendant · Baisieux &amp; Willems
        </p>
        <!-- div (pas h1) : copie purement décorative, un seul vrai titre de niveau 1 sur la page. -->
        <div class="mt-5 max-w-2xl text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
          La vue est belle,<br />
          elle mérite un regard <span class="text-terracotta">juste</span>.
        </div>
        <p class="mt-6 max-w-lg text-lg leading-relaxed text-anthracite/70">
          Deux boutiques à votre écoute, à Baisieux et à Willems.
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-4">
          <span class="inline-flex items-center rounded-full bg-terracotta px-7 py-3.5 text-sm text-cream">
            Prendre rendez-vous
          </span>
        </div>
      </div>
    </div>

    <!--
      Définition du masque SVG (forme du verre). Invisible en soi (0x0), seul le
      clip-path="url(#hero-lens-clip)" ci-dessus l'utilise. Le <clipPath> reçoit son
      transform (translate/scale) directement de useHeroLens à chaque frame de scroll.
      Placeholder : voir public/img/hero/lens-placeholder.svg pour le même tracé exporté.
    -->
    <svg width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="hero-lens-clip" ref="clipPathEl" clipPathUnits="userSpaceOnUse">
          <path d="M -100,0 A 100,100 0 1,0 100,0 A 100,100 0 1,0 -100,0 Z" />
        </clipPath>
      </defs>
    </svg>

    <!-- Reflet discret sur le bord du verre (aberration/grossissement léger), même transform. -->
    <svg
      v-if="showEffect && !isSimplified"
      class="pointer-events-none absolute inset-0"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <g ref="rimEl">
        <circle r="100" fill="none" stroke="rgba(255, 255, 255, 0.35)" stroke-width="3" />
        <circle r="93" fill="none" stroke="rgba(34, 23, 20, 0.15)" stroke-width="1.5" />
      </g>
    </svg>
  </section>
</template>

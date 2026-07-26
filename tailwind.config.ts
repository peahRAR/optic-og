import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue'
  ],
  theme: {
    extend: {
      // Palette recalée sur les logos Optique Ogimont / Optique Willems
      // (badge dégradé rouge-orange #F53C18 → maroon #4C1217, spirale orange vive #FF5C0B).
      colors: {
        cream: '#F7F2EC',
        sand: '#EAE1D2',
        anthracite: '#221714',
        terracotta: {
          DEFAULT: '#C22C0D', // recalé pour un contraste AA (5.15:1) sur cream — le rouge brut du logo (#F53C18) est trop clair pour du texte
          dark: '#9C260C'
        },
        flame: '#FF5C0B' // orange vif du logo — décoratif uniquement (gradients, 3D, glows), jamais pour du texte
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        tightest: '-0.03em'
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.65, 0, 0.35, 1)'
      }
    }
  },
  plugins: []
}

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
      // Palette recalée sur l'identité Zoom Optique Cysoing (échantillonnée sur leur
      // logo réel : "ZOOM" gris charbon #4E4C4D, doubles-O rouge vif #FC0203, titre du
      // site en rouge sombre #A21A20 — déjà AA/AAA sur cream, gardé tel quel pour le texte).
      colors: {
        cream: '#F7F2EC',
        sand: '#EAE1D2',
        anthracite: '#221714',
        terracotta: {
          DEFAULT: '#A21A20', // contraste ~8:1 sur cream, repris directement de leur rouge de titre
          dark: '#7C1418'
        },
        flame: '#FC0203' // rouge vif du logo — décoratif uniquement (gradients, glows), jamais pour du texte
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

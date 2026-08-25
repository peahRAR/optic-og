// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt'
  ],

  css: ['~/assets/css/main.css'],

  // Composants rangés par dossier (layout/home/ui) mais appelés sans préfixe :
  // components/home/HeroSection.vue -> <HeroSection>, pas <HomeHeroSection>.
  components: [{ path: '~/components', pathPrefix: false }],

  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      link: [{ rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }]
    }
  },

  fonts: {
    families: [
      { name: 'Fraunces', provider: 'google', weights: [300, 400, 500, 600] },
      { name: 'Inter', provider: 'google', weights: [400, 500, 600] }
    ]
  },

  image: {
    quality: 82,
    format: ['avif', 'webp']
  },

  // Base @nuxtjs/seo config — remplacer par le vrai domaine avant mise en prod.
  site: {
    url: 'https://www.zoom-optique-cysoing.fr',
    name: 'Zoom Optique Cysoing',
    description:
      'Opticien indépendant à Cysoing, membre du réseau Zoom Optique : montures, verres, lentilles, 2ᵉ paire à 1€. Prenez soin de votre vue avec un accompagnement sur-mesure.',
    defaultLocale: 'fr'
  }
})

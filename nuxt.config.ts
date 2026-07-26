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
      htmlAttrs: { lang: 'fr' }
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
    url: 'https://www.optique-ogimont.fr',
    name: 'Optique Ogimont',
    description:
      "Opticien indépendant à Baisieux et Willems : montures, verres, lentilles, optique à domicile. Prenez soin de votre vue avec un accompagnement sur-mesure.",
    defaultLocale: 'fr'
  }
})

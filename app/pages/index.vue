<script setup lang="ts">
import { shops } from '~/data/shops'

useSeoMeta({
  title: 'Optique Ogimont · Opticien indépendant à Baisieux & Willems',
  description:
    "Montures, verres Essilor & Novacel, lentilles et optique à domicile. Deux boutiques indépendantes à Baisieux et Willems, à votre écoute.",
  ogTitle: 'Optique Ogimont · Opticien indépendant à Baisieux & Willems',
  ogDescription:
    "Montures, verres, lentilles et optique à domicile. Deux boutiques indépendantes, un accompagnement sur-mesure.",
  ogType: 'website'
})

// Données structurées LocalBusiness pour les deux boutiques — améliore le référencement local.
useSchemaOrg(
  shops.map((shop) =>
    defineLocalBusiness({
      name: shop.name,
      address: {
        streetAddress: shop.streetAddress,
        addressLocality: shop.city,
        postalCode: shop.postalCode,
        addressCountry: 'FR'
      },
      telephone: shop.phone,
      email: shop.email
    })
  )
)
</script>

<template>
  <div>
    <HeroLens />
    <ExpertiseSection />
    <TeamSection />
    <ShopsSection />
    <HomeVisitSection />
    <SecondPairSection />
    <BrandsMarquee />
    <InboSection />
    <ServicesSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>

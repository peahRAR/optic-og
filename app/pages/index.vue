<script setup lang="ts">
import { shops } from '~/data/shops'

useSeoMeta({
  title: 'Zoom Optique Cysoing · Opticien indépendant à Cysoing',
  description:
    "Montures, verres Essilor, lentilles et 2ᵉ paire à 1€. Opticien indépendant membre du réseau Zoom Optique, à Cysoing (galerie Intermarché).",
  ogTitle: 'Zoom Optique Cysoing · Opticien indépendant à Cysoing',
  ogDescription:
    'Montures, verres, lentilles. Opticien indépendant membre du réseau Zoom Optique, à votre écoute depuis 2006.',
  ogType: 'website'
})

// Image de partage social de marque (logo + titre) plutôt que le rendu générique par défaut.
defineOgImage('Home', {
  title: 'Zoom Optique Cysoing',
  description: 'Opticien indépendant à Cysoing'
})

// Données structurées LocalBusiness — améliore le référencement local.
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
    <SecondPairSection />
    <BrandsMarquee />
    <KidExpertSection />
    <ServicesSection />
    <TestimonialsSection />
    <FaqSection />
    <ContactSection />
  </div>
</template>

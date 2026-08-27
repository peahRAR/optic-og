<script setup lang="ts">
import { shops } from '~/data/shops'

const year = new Date().getFullYear()

// TODO: remplacer par les URLs réelles des pages Facebook / Instagram Zoom Optique Cysoing
const socials = [
  { label: 'Facebook', icon: 'ph:facebook-logo', href: 'https://www.facebook.com/' },
  { label: 'Instagram', icon: 'ph:instagram-logo', href: 'https://www.instagram.com/' }
]
</script>

<template>
  <footer class="border-t border-anthracite/10 bg-anthracite text-cream">
    <div class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid gap-12 md:grid-cols-[1.2fr_1fr]">
        <div>
          <BrandMark :height="36" dark />
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Opticien indépendant à Cysoing, membre du réseau Zoom Optique. Montures, verres et
            lentilles, choisis avec exigence.
          </p>
          <div class="mt-6 flex items-center gap-5">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm text-cream/70 transition-colors duration-300 hover:text-terracotta"
            >
              <Icon :name="social.icon" size="20" />
              {{ social.label }}
            </a>
          </div>
        </div>

        <div v-for="shop in shops" :key="shop.id">
          <p class="text-sm uppercase tracking-widest text-cream/50">{{ shop.name }} · {{ shop.city }}</p>
          <address class="mt-3 space-y-2 text-sm not-italic leading-relaxed text-cream/80">
            <p>{{ shop.address }}</p>
            <a :href="`tel:${shop.phoneHref}`" class="block hover:text-terracotta">{{ shop.phone }}</a>
            <a v-if="shop.email" :href="`mailto:${shop.email}`" class="block hover:text-terracotta">
              {{ shop.email }}
            </a>
          </address>
        </div>
      </div>

      <div class="mt-14 flex flex-col gap-3 border-t border-cream/10 pt-6 text-xs text-cream/50 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1.5">
          <p>© {{ year }} Zoom Optique Cysoing. Tous droits réservés.</p>
          <p class="flex items-center gap-1.5">
            <Icon name="ph:sparkle" size="12" />
            Propulsé parmi les étoiles par Astrocom
          </p>
        </div>
        <NuxtLink to="/mentions-legales" class="hover:text-cream">Mentions légales</NuxtLink>
      </div>
    </div>
  </footer>
</template>

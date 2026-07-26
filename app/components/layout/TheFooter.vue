<script setup lang="ts">
import { shops } from '~/data/shops'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-anthracite/10 bg-anthracite text-cream">
    <div class="mx-auto max-w-6xl px-6 py-16">
      <div class="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <NuxtImg src="/img/logo/Logo_Baisieux_2026.png" alt="Optique Ogimont" width="64" height="64" class="h-16 w-16 rounded-xl" />
          <p class="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Opticien indépendant à Baisieux et Willems. Montures, verres, lentilles et optique à
            domicile, choisis avec exigence.
          </p>
          <!-- TODO: remplacer par l'URL réelle de la page Facebook Optique Ogimont -->
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-2 text-sm text-cream/70 transition-colors duration-300 hover:text-terracotta"
          >
            <Icon name="ph:facebook-logo" size="20" />
            Suivez-nous sur Facebook
          </a>
        </div>

        <div v-for="shop in shops" :key="shop.id">
          <div class="flex items-center gap-2.5">
            <NuxtImg :src="shop.logo" :alt="shop.name" width="28" height="28" class="h-7 w-7 rounded-md" />
            <p class="text-sm uppercase tracking-widest text-cream/50">{{ shop.name }} · {{ shop.city }}</p>
          </div>
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
        <p>© {{ year }} Optique Ogimont. Tous droits réservés.</p>
        <NuxtLink to="/mentions-legales" class="hover:text-cream">Mentions légales</NuxtLink>
      </div>
    </div>
  </footer>
</template>

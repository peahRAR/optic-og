<script setup lang="ts">
import { navLinks } from '~/data/nav'

const { prefersReducedMotion } = useReducedMotion()
const { count: cartCount } = useCart()

const scrolled = ref(false)
const mobileOpen = ref(false)
const logoMark = ref<HTMLElement | null>(null)

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  // Bref instant de marque au tout premier chargement (pas sur les navigations internes
  // suivantes, ce composant reste monté une fois sur cette page unique).
  if (!prefersReducedMotion.value && logoMark.value) {
    const { $gsap } = useNuxtApp()
    $gsap.fromTo(
      logoMark.value,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, scale: 1, duration: 0.6, delay: 0.15, ease: 'back.out(1.7)' }
    )
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-editorial"
    :class="scrolled ? 'bg-cream/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(33,31,27,0.08)] py-3' : 'bg-transparent py-6'"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6">
      <NuxtLink to="/" class="flex items-center" @click="closeMobile">
        <span ref="logoMark" class="inline-block">
          <BrandMark :height="40" />
        </span>
      </NuxtLink>

      <nav class="hidden items-center gap-9 md:flex" aria-label="Navigation principale">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm text-anthracite/80 transition-colors duration-300 hover:text-terracotta"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="hidden items-center gap-4 md:flex">
        <NuxtLink to="/panier" class="relative flex h-10 w-10 items-center justify-center text-anthracite hover:text-terracotta" aria-label="Voir le panier">
          <Icon name="ph:shopping-bag" size="22" />
          <span
            v-if="cartCount > 0"
            class="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-medium leading-none text-cream"
          >
            {{ cartCount }}
          </span>
        </NuxtLink>
        <NuxtLink
          to="/#boutiques"
          class="inline-flex items-center rounded-full bg-anthracite px-5 py-2.5 text-sm text-cream transition-colors duration-300 ease-editorial hover:bg-terracotta"
        >
          Prendre RDV
        </NuxtLink>
      </div>

      <div class="flex items-center gap-1 md:hidden">
        <NuxtLink to="/panier" class="relative flex h-10 w-10 items-center justify-center text-anthracite" aria-label="Voir le panier">
          <Icon name="ph:shopping-bag" size="22" />
          <span
            v-if="cartCount > 0"
            class="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-medium leading-none text-cream"
          >
            {{ cartCount }}
          </span>
        </NuxtLink>
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center text-anthracite"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          aria-label="Ouvrir le menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :name="mobileOpen ? 'ph:x' : 'ph:list'" size="24" />
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-editorial"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-200 ease-editorial"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="mobileOpen"
        id="mobile-nav"
        aria-label="Navigation mobile"
        class="border-t border-anthracite/10 bg-cream px-6 py-6 md:hidden"
      >
        <ul class="flex flex-col gap-5">
          <li v-for="link in navLinks" :key="link.href">
            <a :href="link.href" class="text-base text-anthracite" @click="closeMobile">
              {{ link.label }}
            </a>
          </li>
          <li>
            <a
              href="/#boutiques"
              class="inline-flex items-center rounded-full bg-anthracite px-5 py-2.5 text-sm text-cream"
              @click="closeMobile"
            >
              Prendre RDV
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

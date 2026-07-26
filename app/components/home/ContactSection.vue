<script setup lang="ts">
import { shops, homeVisit } from '~/data/shops'

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })

const subjects = [
  { value: 'rdv', label: 'Prendre rendez-vous' },
  { value: 'lentilles', label: 'Renouvellement de lentilles' },
  { value: 'domicile', label: 'Optique à domicile' },
  { value: 'autre', label: 'Autre demande' }
]

const form = reactive({
  name: '',
  email: '',
  phone: '',
  subject: 'rdv',
  message: ''
})

// Préremplit le sujet via ?sujet=lentilles (CTA "Demander un renouvellement").
// `watch` (pas juste onMounted) : sur cette page unique, ContactSection reste monté en
// permanence, donc un clic sur le CTA ne fait que changer la query de la route courante
// sans démonter/remonter le composant — onMounted seul ne se redéclencherait jamais.
const route = useRoute()
watch(
  () => route.query.sujet,
  (value) => {
    if (typeof value === 'string' && subjects.some((s) => s.value === value)) {
      form.subject = value
    }
  },
  { immediate: true }
)

const submitted = ref(false)
const sending = ref(false)

// TODO: brancher un envoi réel (route API Nuxt /api/contact, ou service tiers type
// Resend / Formspree). Pour l'instant la soumission n'envoie rien, elle affiche
// uniquement une confirmation côté client.
function handleSubmit() {
  sending.value = true
  setTimeout(() => {
    sending.value = false
    submitted.value = true
  }, 500)
}
</script>

<template>
  <section id="contact" class="bg-sand/40 py-28">
    <div class="mx-auto max-w-6xl px-6">
      <SectionHeading eyebrow="Nous contacter" title="Une question ? Écrivez-nous">
        Nous vous répondons rapidement, ou orientons votre demande vers la bonne boutique.
      </SectionHeading>

      <div ref="root" class="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div class="reveal rounded-3xl bg-cream p-8 sm:p-10">
          <form v-if="!submitted" class="grid gap-5 sm:grid-cols-2" @submit.prevent="handleSubmit">
            <div class="sm:col-span-1">
              <label for="contact-name" class="text-sm text-anthracite/70">Nom complet</label>
              <input
                id="contact-name"
                v-model="form.name"
                type="text"
                name="name"
                required
                autocomplete="name"
                class="mt-2 w-full rounded-xl border border-anthracite/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta"
              />
            </div>

            <div class="sm:col-span-1">
              <label for="contact-email" class="text-sm text-anthracite/70">Email</label>
              <input
                id="contact-email"
                v-model="form.email"
                type="email"
                name="email"
                required
                autocomplete="email"
                class="mt-2 w-full rounded-xl border border-anthracite/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta"
              />
            </div>

            <div class="sm:col-span-1">
              <label for="contact-phone" class="text-sm text-anthracite/70">Téléphone (optionnel)</label>
              <input
                id="contact-phone"
                v-model="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
                class="mt-2 w-full rounded-xl border border-anthracite/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta"
              />
            </div>

            <div class="sm:col-span-1">
              <label for="contact-subject" class="text-sm text-anthracite/70">Sujet</label>
              <select
                id="contact-subject"
                v-model="form.subject"
                name="subject"
                class="mt-2 w-full rounded-xl border border-anthracite/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta"
              >
                <option v-for="s in subjects" :key="s.value" :value="s.value">{{ s.label }}</option>
              </select>
            </div>

            <div class="sm:col-span-2">
              <label for="contact-message" class="text-sm text-anthracite/70">Message</label>
              <textarea
                id="contact-message"
                v-model="form.message"
                name="message"
                rows="5"
                required
                class="mt-2 w-full resize-none rounded-xl border border-anthracite/15 bg-cream px-4 py-3 text-sm outline-none transition-colors focus:border-terracotta"
              />
            </div>

            <div class="sm:col-span-2">
              <MagneticButton type="submit" :disabled="sending">
                {{ sending ? 'Envoi…' : 'Envoyer le message' }}
              </MagneticButton>
            </div>
          </form>

          <div v-else class="flex flex-col items-start gap-3 py-10">
            <Icon name="ph:check-circle" size="32" class="text-terracotta" />
            <p class="text-lg">Merci, votre message a bien été enregistré.</p>
            <p class="text-sm text-anthracite/70">
              Nous revenons vers vous rapidement. Pour une urgence, appelez directement l'une de
              nos boutiques ci-contre.
            </p>
          </div>
        </div>

        <div class="reveal space-y-6">
          <div v-for="shop in shops" :key="shop.id" class="rounded-2xl bg-cream p-6">
            <p class="text-sm uppercase tracking-widest text-anthracite/50">{{ shop.name }} · {{ shop.city }}</p>
            <a :href="`tel:${shop.phoneHref}`" class="mt-3 flex items-center gap-2 text-sm hover:text-terracotta">
              <Icon name="ph:phone" size="16" />
              {{ shop.phone }}
            </a>
            <a
              v-if="shop.email"
              :href="`mailto:${shop.email}`"
              class="mt-2 flex items-center gap-2 text-sm hover:text-terracotta"
            >
              <Icon name="ph:envelope-simple" size="16" />
              {{ shop.email }}
            </a>
          </div>

          <div class="rounded-2xl bg-cream p-6">
            <p class="text-sm uppercase tracking-widest text-anthracite/50">Optique à domicile</p>
            <a :href="`tel:${homeVisit.phoneHref}`" class="mt-3 flex items-center gap-2 text-sm hover:text-terracotta">
              <Icon name="ph:phone-call" size="16" />
              {{ homeVisit.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

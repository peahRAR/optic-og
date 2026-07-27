<script setup lang="ts">
interface Props {
  to?: string
  variant?: 'solid' | 'outline'
  /** Ignoré quand `to` est fourni (rendu en lien) — utile pour un submit de formulaire. */
  type?: 'button' | 'submit'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: undefined,
  variant: 'solid',
  type: 'button',
  disabled: false
})

const root = ref<HTMLElement | null>(null)
useMagnetic(root)

const isExternal = computed(() => /^https?:\/\//.test(props.to ?? ''))

const classes =
  props.variant === 'solid'
    ? 'bg-terracotta text-cream hover:bg-terracotta-dark'
    : 'border border-anthracite/20 text-anthracite hover:border-terracotta hover:text-terracotta'
</script>

<template>
  <span ref="root" class="inline-block">
    <NuxtLink
      v-if="to"
      :to="to"
      :target="isExternal ? '_blank' : undefined"
      :rel="isExternal ? 'noopener noreferrer' : undefined"
      class="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm transition-colors duration-300 ease-editorial"
      :class="classes"
    >
      <slot />
    </NuxtLink>
    <button
      v-else
      :type="type"
      :disabled="disabled"
      class="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm transition-colors duration-300 ease-editorial disabled:cursor-not-allowed disabled:opacity-60"
      :class="classes"
    >
      <slot />
    </button>
  </span>
</template>

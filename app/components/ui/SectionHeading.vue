<script setup lang="ts">
interface Props {
  eyebrow?: string
  title: string
  align?: 'left' | 'center'
}

withDefaults(defineProps<Props>(), { align: 'left', eyebrow: undefined })

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '.reveal' })
</script>

<template>
  <div ref="root" :class="align === 'center' ? 'text-center mx-auto' : 'text-left'" class="max-w-2xl">
    <p v-if="eyebrow" class="reveal text-sm uppercase tracking-widest text-terracotta">{{ eyebrow }}</p>
    <h2 class="reveal mt-3 text-3xl leading-tight sm:text-4xl">{{ title }}</h2>
    <p v-if="$slots.default" class="reveal mt-4 text-anthracite/70 leading-relaxed">
      <slot />
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  /** Ratio CSS (ex: '4/3', '1/1', '4/5') — garder ce ratio lors du remplacement par la vraie photo. */
  ratio?: string
  label: string
}

withDefaults(defineProps<Props>(), { ratio: '4/3' })
</script>

<template>
  <!--
    Placeholder à remplacer par :
    <NuxtImg :src="~/assets/images/..." :alt="label" class="h-full w-full object-cover"
             :width="..." :height="..." />
    en conservant le conteneur (ratio + arrondi) ci-dessous.
  -->
  <div
    class="flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sand to-sand/40"
    :style="{ aspectRatio: ratio }"
  >
    <p class="px-6 text-center text-xs uppercase tracking-widest text-anthracite/40">{{ label }}</p>
  </div>
</template>

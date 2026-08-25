<script setup lang="ts">
/**
 * Vrai logo Zoom Optique Cysoing (fourni par le client, public/img/logo/logo.png).
 * C'est un wordmark large (595x175, ratio ~3.4:1), pas une icône carrée : dimensionné par
 * hauteur (`height`), largeur automatique — ne jamais le forcer dans un cadre carré comme
 * l'ancien repère provisoire en CSS.
 *
 * Le texte du logo original est quasi noir (#151415), illisible sur l'anthracite du footer
 * (#221714, luminance quasi identique). `dark` bascule sur logo-on-dark.png, une variante où
 * seul le texte est recoloré en crème (le rouge des verres reste inchangé) — générée une
 * fois via script, pas de logique de couleur ici.
 */
interface Props {
  height?: number
  dark?: boolean
}

withDefaults(defineProps<Props>(), { height: 40, dark: false })
</script>

<template>
  <NuxtImg
    :src="dark ? '/img/logo/logo-on-dark.png' : '/img/logo/logo.png'"
    alt="Zoom Optique Cysoing"
    :height="height"
    :width="Math.round(height * (595 / 175))"
    format="webp"
    class="w-auto shrink-0 object-contain"
    :style="{ height: `${height}px` }"
  />
</template>

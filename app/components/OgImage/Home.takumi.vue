<script setup lang="ts">
withDefaults(
  defineProps<{ title?: string; description?: string }>(),
  {
    title: 'Optique Ogimont',
    description: 'Opticien indépendant à Baisieux & Willems'
  }
)
</script>

<template>
  <div
    style="
      width: 1200px;
      height: 630px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 80px;
      background-color: #f7f2ec;
    "
  >
    <img src="/img/logo/Logo_Baisieux_2026.png" width="96" height="96" style="border-radius: 22px" />
    <div
      style="
        margin-top: 48px;
        max-width: 900px;
        font-family: Georgia, serif;
        font-size: 64px;
        line-height: 1.1;
        color: #221714;
      "
    >
      {{ title }}
    </div>
    <div style="margin-top: 24px; max-width: 800px; font-size: 28px; color: #221714b3">
      {{ description }}
    </div>
    <div style="margin-top: 40px; width: 120px; height: 6px; background-color: #c22c0d; border-radius: 4px" />
  </div>
</template>

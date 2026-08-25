<script setup lang="ts">
withDefaults(
  defineProps<{ title?: string; description?: string }>(),
  {
    title: 'Zoom Optique Cysoing',
    description: 'Opticien indépendant à Cysoing'
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
    <img src="/img/logo/logo.png" width="272" height="80" style="object-fit: contain" />
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
    <div style="margin-top: 40px; width: 120px; height: 6px; background-color: #a21a20; border-radius: 4px" />
  </div>
</template>

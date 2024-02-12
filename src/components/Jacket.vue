<script setup>
const props = defineProps(["jacket", "zoomIn"]);
</script>

<template>
  <img
    class="rounded-xl overflow-visible"
    :src="jacket"
    :class="zoomIn && 'jacket-zoom-in'"
    width="264"
    height="352"
  />
</template>

<style scoped>
img {
  box-shadow:
    rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
}
</style>

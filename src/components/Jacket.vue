<script setup>
defineProps(["jacket", "gameName", "songName"]);
</script>

<template>
  <img
    class="rounded-xl"
    :src="jacket"
    :alt="`Jaquette de ${gameName} ${songName}`"
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

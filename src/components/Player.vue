<script setup>
const props = defineProps(["isPaused"]);
const emit = defineEmits(["togglePlayPause", "next", "previous"]);
</script>

<template>
  <ul class="w-44 flex items-center justify-between mx-auto">
    <li class="cursor-pointer" @click="emit('previous')">
      <img width="30" height="30" src="../assets/icons/back.png" />
    </li>
    <li class="cursor-pointer" @click="emit('togglePlayPause')">
      <img
        v-show="props.isPaused"
        width="56"
        height="56"
        src="../assets/icons/play.png"
      />
      <img
        v-show="!props.isPaused"
        width="56"
        height="56"
        src="../assets/icons/pause.png"
      />
    </li>
    <li class="cursor-pointer" @click="emit('next')">
      <img
        class="rotate-180"
        width="30"
        height="30"
        src="../assets/icons/back.png"
      />
    </li>
  </ul>
</template>

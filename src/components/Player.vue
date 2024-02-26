<script setup>
const props = defineProps(["isPaused"]);
const emit = defineEmits(["togglePlayPause", "next", "previous"]);
</script>

<template>
  <div class="w-44 flex items-center justify-between mx-auto">
    <div
      class="cursor-pointer"
      role="button"
      tabindex="0"
      @click="emit('previous')"
      @keypress="emit('previous')"
    >
      <img
        width="30"
        height="30"
        alt="Chanson précédente"
        src="../assets/icons/back.png"
      />
    </div>
    <div
      class="cursor-pointer"
      role="button"
      tabindex="0"
      @click="emit('togglePlayPause')"
      @keypress="emit('togglePlayPause')"
    >
      <img
        v-show="props.isPaused"
        width="56"
        height="56"
        alt="Play"
        src="../assets/icons/play.png"
      />
      <img
        v-show="!props.isPaused"
        width="56"
        height="56"
        alt="Pause"
        src="../assets/icons/pause.png"
      />
    </div>
    <div
      class="cursor-pointer"
      role="button"
      tabindex="0"
      @click="emit('next')"
      @keypress="emit('next')"
    >
      <img
        class="rotate-180"
        width="30"
        height="30"
        alt="Chanson suivante"
        src="../assets/icons/back.png"
      />
    </div>
  </div>
</template>

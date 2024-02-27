<script setup>
import { watch } from "vue";

const props = defineProps(["progress", "duration"]);
const emit = defineEmits(["seek"]);

watch(
  () => props.progress,
  () => {
    if (!props.progress) return;

    const progressBar = document.getElementById("progress-bar");
    progressBar.value = props.progress / props.duration;
  }
);

const seek = (event) => {
  const progressBar = document.getElementById("progress-bar");
  const progressBarPosition = progressBar.getBoundingClientRect();
  const percent =
    (event.clientX - progressBarPosition.left) /
    (progressBarPosition.right - progressBarPosition.left);

  emit("seek", percent * props.duration);
};
</script>

<template>
  <progress
    id="progress-bar"
    class="w-full"
    value="0"
    max="1"
    aria-label="Barre de chargement"
    @click="seek"
  />
</template>

<style scoped lang="scss">
progress {
  cursor: pointer;
}

progress[value] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 8px;
  background-color: #d9d9d9;
  color: #06a09b;
  height: 10px;

  @media (min-width: 768px) {
    background-color: white;
  }
}

progress[value]::-webkit-progress-bar {
  background-color: #d9d9d9;
  border-radius: 8px;
  color: #06a09b;

  @media (min-width: 768px) {
    background-color: white;
  }
}

progress[value]::-moz-progress-bar {
  border-radius: 8px;
  background-color: #06a09b;
}

progress::-webkit-progress-value {
  border-radius: 8px;
  background-color: #06a09b;
}
</style>

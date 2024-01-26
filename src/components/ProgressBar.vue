<script setup>
import { watch } from 'vue';

const props = defineProps(['progress', 'duration'])
const emit = defineEmits(['seek'])

watch(() => props.progress, () => {
    const progressBar = document.getElementById('progress-bar');
    progressBar.value = (props.progress / props.duration);
    progressBar.addEventListener("click", seek);
})

const seek = (event) => {
    const progressBar = document.getElementById('progress-bar');
    const progressBarPosition = progressBar.getBoundingClientRect();
    const percent = (event.clientX - progressBarPosition.left) / (progressBarPosition.right - progressBarPosition.left);
    emit('seek', percent * props.duration)
}
</script>

<template>
    <progress id="progress-bar" value="0" max="1"></progress>
</template>

<style>
progress {
    width: 90%;
    margin-bottom: 1em;
    cursor: pointer;
}

progress[value] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: 1px solid black;
    border-radius: 8px;
    background-color: white;
    color: #d30320;
    height: 10px;
}

progress[value]::-webkit-progress-bar {
    background-color: white;
    border-radius: 2px;
    color: #d30320;
}

progress[value]::-moz-progress-bar {
  background-color: #d30320;
}

progress::-webkit-progress-value {
    background-color: #d30320;
}
</style>
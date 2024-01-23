<script setup>
import { ref } from 'vue';
import AudioPlayer from './components/AudioPlayer.vue';
import musicNames from './assets/musicNames?raw'

let audio;
const isPaused = ref(true);
const fileName = ref('')

const selectFileToPlay = () => {
  const files = musicNames.split(',')
  let max = files.length - 1;
  let min = 0;
  
  let index = Math.round(Math.random() * (max - min) + min);
  let file = files[index];
  fileName.value = file.substring(0, file.indexOf('.mp3'))
  return file
}

const selectNewFile = () => {
  const fileToPlay = selectFileToPlay()
  audio = new Audio(fileToPlay)
  audio.addEventListener("ended", () => console.log('ended') || next());
  console.log(audio)
}

const play = async() => {
  audio.play()
  isPaused.value = false
}

const pause = async() => {
  audio.pause()
  isPaused.value = true
}

const next = async() => {
  pause()
  selectNewFile()
  play()
  isPaused.value = false
}

selectNewFile()
</script>

<template>
  <AudioPlayer :file-name="fileName" :play="play" :pause="pause" :next="next" :is-paused="isPaused" />
</template>

<style scoped>
button {
  margin: 10px;
  background-color: rgb(237, 98, 98);
}
</style>

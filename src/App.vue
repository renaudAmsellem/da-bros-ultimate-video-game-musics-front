<script setup>
import musicNames from './assets/musicNames?raw'

let audio;

const selectFileToPlay = () => {
  const files = musicNames.split(',')
  let max = files.length - 1;
  let min = 0;
  
  let index = Math.round(Math.random() * (max - min) + min);
  let file = files[index];
  return file
}

const selectNewFile = () => {
  const fileToPlay = selectFileToPlay()
  audio = new Audio(fileToPlay)
}

const play = async() => {
  audio.play()
}

const pause = async() => {
  audio.pause()
}

const next = async() => {
  pause()
  selectNewFile()
  play()
}

selectNewFile()
</script>

<template>
  <button @click="play">play</button>
  <button @click="pause">pause</button>
  <button @click="next">next</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

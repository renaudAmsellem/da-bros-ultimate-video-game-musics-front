<script setup>
import { ref } from 'vue';
import musicNames from './assets/musicNames?raw'
import Stars from './components/Stars.vue';
import ProgressBar from './components/ProgressBar.vue';

let audio;
const progress = ref(0)
const duration = ref(0)
const isPaused = ref(true);
const fileName = ref('')

const selectFileToPlay = () => {
  const files = musicNames.split('.mp3,')
  let max = files.length - 1;
  let min = 0;
  
  let index = Math.round(Math.random() * (max - min) + min);
  let file = files[index];
  fileName.value = file
  return file
}

const selectNewFile = () => {
  const fileToPlay = selectFileToPlay()
  audio = new Audio(fileToPlay + '.mp3')
  audio.addEventListener("ended", next);
  audio.addEventListener("timeupdate", () =>  progress.value = audio.currentTime);
  audio.addEventListener("loadedmetadata", () =>  duration.value = audio.duration);
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
  <div class="player__container">
    <div class="mario_image">
      <img src="./assets/mario_listening_music.png" alt="Album cover" />
    </div>
    <div class="body__info">
      <div class="info__song">{{ fileName }}</div>
    </div>

    <div>
      <ProgressBar :progress="progress" :duration="duration"/>
    </div>

    <div class="body__buttons">
      <ul class="list list--buttons">
        <li><a href="#" class="list__link"><i class="fa fa-step-backward"></i></a></li>

        <li v-show="isPaused" @click="play"><img src="./assets/playIcon.png" /></li>
        <li v-show="!isPaused" @click="pause"><img src="./assets/pauseIcon.png" /></li>

        <li @click="next"><img src="./assets/nextIcon.png" /></li>
      </ul>
    </div>
    <Stars class="stars" :fileName="fileName" />
  </div>
</template>

<style lang="scss">
html {
  font-size: 16px;
}

body {
  font-family: 'Roboto', Arial, Verdana, sans-serif;
  background: #e4f2fb;
}

.player__container {
  height: calc(100vh - 64px);
  max-height: calc(100vh - 64px);
  width: 720px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .19), 0 6px 6px -10px rgba(0, 0, 0, .23);;
}

.mario_image {
  max-height: 100%;
  height: 60%;
}

img {
  height: 100%;
}

.list {
  display: flex;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.body__info {
  padding-top: 1rem;
  padding-bottom: 1em;
}

.info__song {
  font-size: 1.5rem;
  color: #d30320;
}

.list--buttons {
  align-items: center;
  justify-content: center;
}

.list--buttons li:nth-of-type(n+1) {
  margin-left: 1.5rem;
}

li {
    cursor: pointer;
}

.stars {
  padding-bottom: 1em;
}
</style>
<script setup>
import { computed, ref, watch } from 'vue';
import Stars from './components/Stars.vue';
import WaitingList from './components/WaitingList.vue';
import ProgressBar from './components/ProgressBar.vue';
import Player from './components/Player.vue';
import KeyboardEventListener from './components/KeyboardEventListener.vue';
import {getShuffledSongs} from './helpers/getShuffledSongs'
import {gamesMetadata} from './gamesMetadata'

let audio;
const song = ref({
  name: '',
  progress: 0,
  duration: 0
})
const isPaused = ref(true);

const songs = getShuffledSongs()
const indexSong = ref(0)

const waitingList = computed(() => {
  const list = []
  for (let i = 1 ; i <= 5 ; i ++) {
    list.push(songs[indexSong.value + i])
  }
  return list
})

const playPreviousSong = () => {
  if (indexSong.value === 0) return

  indexSong.value = indexSong.value - 1
}

const playNextSong = () => {
  if (indexSong.value === songs.length) {
    indexSong.value = 0;
    return
  }
  
  indexSong.value = indexSong.value + 1
}

const selectSong = (index) => {
  indexSong.value = indexSong.value + index + 1
}

const play = () => {
  audio.play()
  isPaused.value = false
}

const pause = () => {
  audio.pause()
  isPaused.value = true
}

const togglePlayPause = () => {
  if (isPaused.value === true) return play()
  return pause()
}

const previous = () => {
  pause()
  playPreviousSong()
  play()
  isPaused.value = false
}

const next = () => {
  pause()
  playNextSong()
  play()
  isPaused.value = false
}

const seek = (time) => {
  audio.currentTime = time
}

watch(indexSong, () => {
  if (audio) audio.pause()
  const songToPlay = songs[indexSong.value]
  const gameName = songToPlay.substring(0, songToPlay.indexOf(' -'))
  const songMetadata = gamesMetadata[gameName]
  song.value.name = songToPlay
  audio = new Audio(songToPlay + '.mp3')
  audio.addEventListener("ended", next);
  audio.addEventListener("timeupdate", () =>  song.value.progress = audio.currentTime);
  audio.addEventListener("loadedmetadata", () =>  song.value.duration = audio.duration);
  // audio.addEventListener("audioprocess", () =>  console.log('audioprocess'));
  // audio.addEventListener("canplay", () =>  console.log('canplay'));
  // audio.addEventListener("canplaythrough", () =>  console.log('canplaythrough'));
  // audio.addEventListener("complete", () =>  console.log('complete'));
  // audio.addEventListener("loadeddata", () =>  console.log('loadeddata'));
  // audio.addEventListener("loadedmetadata", () =>  console.log('loadedmetadata'));
  // audio.addEventListener("loadstart", () =>  console.log('loadstart'));
  // audio.addEventListener("pause", () =>  console.log('pause'));
  // audio.addEventListener("play", () =>  console.log('play'));
  // audio.addEventListener("playing", () =>  console.log('playing'));
  // audio.addEventListener("seeked", () =>  console.log('seeked'));
  // audio.addEventListener("seeking", () =>  console.log('seeking'));
  // audio.addEventListener("stalled", () =>  console.log('stalled'));
  // audio.addEventListener("suspend", () =>  console.log('suspend'));
  // audio.addEventListener("waiting", () =>  console.log('waiting'));
  audio.play()
}, {immediate: true})
</script>

<template>
  <div class="player__container">
    <div class="mario_image">
      <img src="./assets/mario_listening_music.png" alt="Album cover" />
    </div>
    <div class="wrapper">
      <ProgressBar :progress="song.progress" :duration="song.duration" @seek="seek" />

      <WaitingList :waiting-list="waitingList" @selectSong="selectSong" />

      <Player :songName="song.name" :isPaused="isPaused" @play="play" @pause="pause" @next="next" @previous="previous" />

      <Stars class="stars" :songName="song.name" />

      <KeyboardEventListener :songName="song.name" @play="play" @pause="pause" @previous="previous" @next="next" @togglePlayPause="togglePlayPause" />
    </div>
  </div>
</template>

<style lang="scss">
html {
  font-size: 16px;
  height: 100%
}

body {
  font-family: 'Roboto', Arial, Verdana, sans-serif;
  background: #e4f2fb;
  height: 100%;
}

.player__container {
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  align-items: center;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, .19), 0 6px 6px -10px rgba(0, 0, 0, .23);;

  @media screen and (min-width: 780px) {
    width: 780px;
  }
}

.wrapper {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.mario_image {
  max-height: 100%;
  height: 200px;
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
  padding-bottom: 1em;
}

.info__song {
  font-size: 1.5rem;
  color: #d30320;
}

li {
    cursor: pointer;
}
</style>
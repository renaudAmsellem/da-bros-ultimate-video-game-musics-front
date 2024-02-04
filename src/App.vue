<script setup lang="js">
import { computed, ref, watch } from "vue";
import Stars from "./components/Stars.vue";
import WaitingList from "./components/WaitingList.vue";
import Player from "./components/Player.vue";
import ProgressBar from "./components/ProgressBar.vue"
import KeyboardEventListener from "./components/KeyboardEventListener.vue";
import { getShuffledSongs } from "./helpers/getShuffledSongs";
import { gamesMetadata } from "./gamesMetadata";

let audio;

const song = ref({
  name: "",
  progress: 0,
  duration: 0,
  gameName: "",
  metadata: {},
});

const songState = ref({
  paused: true,
  playing: false,
  waiting: false,
  canplaythrough: false,
});

const songs = getShuffledSongs();
const indexSong = ref(0);

const waitingList = computed(() => {
  const list = [];
  for (let i = 1; i <= 5; i++) {
    list.push(songs[indexSong.value + i]);
  }
  return list;
});

const playPreviousSong = () => {
  if (song.value.progress > 3) return restartCurrentSong();

  if (indexSong.value === 0) return;

  indexSong.value = indexSong.value - 1;
};

const playNextSong = () => {
  if (indexSong.value === songs.length) {
    indexSong.value = 0;
    return;
  }

  indexSong.value = indexSong.value + 1;
};

const restartCurrentSong = () => {
  audio.pause();
  audio.currentTime = 0;
  audio.play();
};

const selectSong = (index) => {
  indexSong.value = indexSong.value + index + 1;
};

const togglePlayPause = () => {
  if (songState.value.paused === true) return play();
  return pause();
};

const seek = time => audio.currentTime = time
const seekForward = () => audio.currentTime += 10
const seekBackward = () => audio.currentTime -= 10

const play = () => audio.play();
const pause = () => audio.pause();
const canplaythrough = () => (songState.value.canplaythrough = true);
const ended = () => playNextSong()
const timeupdate = () => (song.value.progress = audio.currentTime);
const loadedmetadata = () => (song.value.duration = audio.duration);
const paused = () => {
  songState.value.playing = false;
  songState.value.paused = true;
};
const playing = () => {
  songState.value.playing = true;
  songState.value.paused = false;
};

const addEventListeners = () => {
  audio.addEventListener("canplaythrough", canplaythrough);
  audio.addEventListener("ended", ended);
  audio.addEventListener("loadedmetadata", loadedmetadata);
  audio.addEventListener("pause", paused);
  audio.addEventListener("playing", playing);
  audio.addEventListener("timeupdate", timeupdate);
};

const removeEventListeners = () => {
  audio.removeEventListener("canplaythrough", canplaythrough);
  audio.removeEventListener("ended", ended);
  audio.removeEventListener("loadedmetadata", loadedmetadata);
  audio.removeEventListener("pause", pause);
  audio.removeEventListener("playing", playing);
  audio.removeEventListener("timeupdate", timeupdate);
};

const stopAndRemoveOldAudio = () => {
  removeEventListeners();
  audio.src = '';
  audio.load()
};

watch(
  () => indexSong.value,
  () => {
    const songName = songs[indexSong.value];
    const gameName = songName.substring(0, songName.indexOf(" -"));
    const songMetadata = gamesMetadata[gameName];
    const songNameWithExtension = `${songName}.webm`
    song.value.name = songName;
    song.value.gameName = gameName;
    song.value.metadata = songMetadata;
    songState.value.src = songNameWithExtension;

    if (audio) stopAndRemoveOldAudio();

    audio = new Audio(songNameWithExtension);
    addEventListeners();
    audio.play();  
  },
  { immediate: true }
);
</script>

<template>
  <div class="player__container">
    <div class="mario_image">
      <img src="./assets/mario_listening_music.png" alt="Album cover" />
    </div>
    <div class="wrapper">
      <ProgressBar
        :progress="song.progress"
        :duration="song.duration"
        @seek="seek"
      />

      <WaitingList :waiting-list="waitingList" @selectSong="selectSong" />

      <Player
        :songName="song.name"
        :isPaused="songState.paused"
        @play="play"
        @pause="pause"
        @next="playNextSong"
        @previous="playPreviousSong"
      />

      <Stars class="stars" :songName="song.name" />

      <KeyboardEventListener
        :songName="song.name"
        :gameName="song.gameName"
        @play="play"
        @pause="pause"
        @previous="playPreviousSong"
        @next="playNextSong"
        @togglePlayPause="togglePlayPause"
        @seekBackward="seekBackward"
        @seekForward="seekForward"
      />
    </div>
  </div>
</template>

<style lang="scss">
html {
  font-size: 16px;
  height: 100%;
}

body {
  font-family: "Roboto", Arial, Verdana, sans-serif;
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
  box-shadow:
    0 10px 20px -5px rgba(0, 0, 0, 0.19),
    0 6px 6px -10px rgba(0, 0, 0, 0.23);

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

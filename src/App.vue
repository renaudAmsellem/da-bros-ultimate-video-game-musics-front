<script setup lang="js">
import { ref, computed, watch } from "vue";
import MobileLayout from "./layouts/MobileLayout.vue";
import Like from "./components/Like.vue";
import Share from "./components/Share.vue";
import SmallJacket from "./components/SmallJacket.vue";
import Player from "./components/Player.vue";
import ProgressBar from "./components/ProgressBar.vue";
import KeyboardEventListener from "./components/KeyboardEventListener.vue";
import MobileSongsView from "./components/MobileSongsView.vue";
import DesktopSongsView from "./components/DesktopSongsView.vue";
import SearchSongs from "./components/SearchSongs.vue";
import { getShuffledSongs } from "./helpers/getShuffledSongs";
import { gamesMetadata } from "./gamesMetadata";
import { isWebmSupported } from "./helpers/supportedFormats";
import { getGameName, getSongName } from "./helpers/parseSong";
import { useWindowResize } from "./composables/useWindowResize";
import "./index.css";

let audio;

const song = ref({
  name: "",
  progress: 0,
  duration: 0,
  gameName: "",
  songName: "",
  metadata: {},
});

const songState = ref({
  paused: true,
  playing: false,
});

const songs = getShuffledSongs();
const indexSong = ref(0);

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
  indexSong.value = index;
  if (currentSearch.value) {
    currentPlaylist.value = currentSearch.value;
  } else {
    currentPlaylist.value = songs;
  }
};

const togglePlayPause = () => {
  if (songState.value.paused === true) return play();
  return pause();
};

const seek = (time) => (audio.currentTime = time);
const seekForward = () => (audio.currentTime += 10);
const seekBackward = () => (audio.currentTime -= 10);

const play = () => audio.play();
const pause = () => audio.pause();
const ended = () => playNextSong();
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
  audio.addEventListener("ended", ended);
  audio.addEventListener("loadedmetadata", loadedmetadata);
  audio.addEventListener("pause", paused);
  audio.addEventListener("playing", playing);
  audio.addEventListener("timeupdate", timeupdate);
};

const removeEventListeners = () => {
  audio.removeEventListener("ended", ended);
  audio.removeEventListener("loadedmetadata", loadedmetadata);
  audio.removeEventListener("pause", pause);
  audio.removeEventListener("playing", playing);
  audio.removeEventListener("timeupdate", timeupdate);
};

const stopAndRemoveOldAudio = () => {
  removeEventListeners();
  // audio.src = '';
  audio.load();
};

const currentSearch = ref(false);
const currentPlaylist = ref(songs);
const searching = (searchSongs) => (currentSearch.value = searchSongs);
const stopSearching = () => (currentSearch.value = false);

watch(
  () => [indexSong.value, currentPlaylist.value],
  () => {
    const gameAndSongName = currentPlaylist.value[indexSong.value];
    const gameName = getGameName(gameAndSongName);
    const songName = getSongName(gameAndSongName);
    const songMetadata = gamesMetadata[gameName];
    let extension = "mp3";
    if (isWebmSupported) extension = "webm";
    const gameAndSongNameWithExtension = `${gameAndSongName}.${extension}`;
    song.value.name = gameAndSongName;
    song.value.gameName = gameName;
    song.value.songName = songName;
    song.value.metadata = songMetadata;
    songState.value.src = gameAndSongNameWithExtension;

    if (audio) stopAndRemoveOldAudio();

    audio = new Audio(gameAndSongNameWithExtension);
    addEventListeners();
    audio.play();
  },
  { immediate: true }
);

const { width } = useWindowResize();
const isMobile = computed(() => width.value < 768);
</script>

<template>
  <header>
    <h1 class="text-center text-xl font-bold py-5 row-start-2">oidaЯ Rabio</h1>
    <SearchSongs
      v-if="!isMobile"
      :songs="songs"
      @searching="searching"
      @stop-searching="stopSearching"
    />
  </header>

  <MobileLayout v-if="isMobile">
    <MobileSongsView
      :songs="songs"
      :current-index="indexSong"
      @next="playNextSong"
      @previous="playPreviousSong"
    />

    <div class="absolute left-0 right-0 bottom-5 h-15">
      <div class="mb-3">
        <ProgressBar
          class="progress-bar"
          :progress="song.progress"
          :duration="song.duration"
          @seek="seek"
        />
      </div>
      <Player
        :is-paused="songState.paused"
        @toggle-play-pause="togglePlayPause"
        @next="playNextSong"
        @previous="playPreviousSong"
      />
      <Share class="absolute left-3 bottom-1" :song-name="song.name" />
      <Like class="absolute right-3 bottom-1" :song-name="song.name" />
    </div>
  </MobileLayout>

  <main v-else>
    <DesktopSongsView
      :songs="currentSearch ? currentSearch : songs"
      :active-song="song.name"
      :is-active-song-in-search="currentPlaylist === currentSearch"
      :current-index="indexSong"
      @select-song="selectSong"
    />

    <div
      class="desktop-player-wrapper fixed left-5 right-5 bottom-5 p-2 h-23 rounded-lg flex"
    >
      <SmallJacket
        class="small-jacket"
        :song-name="song.songName"
        :game-name="song.gameName"
      />
      <Player
        class="player absolute"
        :is-paused="songState.paused"
        @toggle-play-pause="togglePlayPause"
        @next="playNextSong"
        @previous="playPreviousSong"
      />
      <ProgressBar
        class="progress-bar absolute"
        :progress="song.progress"
        :duration="song.duration"
        @seek="seek"
      />
      <Share class="share absolute right-20" :song-name="song.name" />
      <Like class="like absolute right-5" :song-name="song.name" />
    </div>
  </main>

  <KeyboardEventListener
    :game-and-song-name="song.name"
    :game-name="song.gameName"
    @play="play"
    @pause="pause"
    @previous="playPreviousSong"
    @next="playNextSong"
    @toggle-play-pause="togglePlayPause"
    @seek-backward="seekBackward"
    @seek-forward="seekForward"
  />
</template>

<style>
.desktop-player-wrapper {
  background-color: #c2f5e9c0;
}

.player {
  left: calc(50vw - 88px - 1.25rem);
  bottom: calc((76px - 56px) / 2 + 0.5rem);
}

.progress-bar {
  max-width: 90%;
  @media (min-width: 768px) {
    left: calc(50vw + 88px);
    bottom: calc((76px - 24px) / 2 + 0.5rem);
    max-width: calc(50vw - 88px - 200px);
  }
}

.small-jacket {
  width: 35%;
  margin-right: 2%;
}

.like,
.share {
  bottom: calc((76px - 52px) / 2 + 0.5rem);
}
</style>

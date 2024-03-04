<script setup>
import { computed } from "vue";
import SongView from "./SongView.vue";
import { getGameName, getSongName } from "../helpers/parseSong";
import { useWindowResize } from "../composables/useWindowResize";

const props = defineProps([
  "songs",
  "currentIndex",
  "activeSong",
  "isActiveSongInSearch",
]);
const emit = defineEmits(["selectSong"]);

const { width, desktopHeight } = useWindowResize();

// with w-48 class:
const jacketWidth = 192;
const jacketHeight = 284;
const yMarginBetweenJackets = 16;
const headerMarginWithContent = 20;

const jacketLinesCount = computed(() => {
  let result = -1;
  let totalHeight = desktopHeight.value;
  do {
    if (result > 0) totalHeight -= yMarginBetweenJackets;
    totalHeight -= jacketHeight;
    result += 1;
  } while (totalHeight > 0);

  return result;
});

const jacketByLines = computed(() => Math.floor(width.value / jacketWidth));
const yPadding = computed(() =>
  Math.max(
    0,
    (desktopHeight.value - jacketLinesCount.value * jacketHeight) / 2 -
      headerMarginWithContent
  )
);

const songsByX = computed(() => {
  const result = [];
  let tempSongsByX = [];
  for (let i = 0; i < props.songs.length; i++) {
    tempSongsByX.push(props.songs[i]);
    if (i % jacketByLines.value === jacketByLines.value - 1) {
      result.push(tempSongsByX);
      tempSongsByX = [];
    }
  }
  result.push(tempSongsByX);

  return result;
});

const currentIndexSongByX = computed(() =>
  props.isActiveSongInSearch
    ? Math.floor(props.currentIndex / jacketByLines.value)
    : 0
);
</script>

<template>
  <div class="mx-5" :style="{ paddingTop: yPadding + 'px' }">
    <div class="flex mx-auto justify-around mb-4">
      <div v-for="(song, index) in songsByX[currentIndexSongByX]" :key="song">
        <SongView
          class="cursor-pointer max-w-48 w-48 p-3"
          :song-name="getSongName(song)"
          :game-name="getGameName(song)"
          :is-active="activeSong === song"
          @select-song="
            emit('selectSong', index + currentIndexSongByX * jacketByLines)
          "
        />
      </div>
    </div>
    <div v-if="currentIndexSongByX + 1 < songsByX.length">
      <div
        v-for="line in jacketLinesCount - 1"
        :key="line"
        class="flex mx-auto justify-around mb-4"
      >
        <div
          v-for="(song, index) in songsByX[currentIndexSongByX + line]"
          :key="song"
        >
          <SongView
            class="cursor-pointer max-w-48 w-48 p-3"
            :song-name="getSongName(song)"
            :game-name="getGameName(song)"
            :is-active="activeSong === song"
            @select-song="
              emit(
                'selectSong',
                index + (currentIndexSongByX + line) * jacketByLines
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

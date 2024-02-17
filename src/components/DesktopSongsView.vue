<script setup>
import { computed } from "vue";
import SongView from "./SongView.vue";
import Jacket from "./Jacket.vue";
import { getGameName, getSongName, getCoverLink } from "../helpers/parseSong";
import { useWindowResize } from "../composables/useWindowResize";

const props = defineProps(["songs", "currentIndex"]);
const emit = defineEmits(["selectSong"]);

const headerAndFooterSize = 200;
const { width, desktopHeight } = useWindowResize();

// One jacket = 264 width & 352 height
const jacketByLines = computed(() => Math.floor(width.value / 300));
// const jacketLinesCount = computed(() =>
//   Math.floor((desktopHeight.value - 200) / 300)
// );

const jacketLinesCount = 3;

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
  Math.floor(props.currentIndex / jacketByLines.value)
);

const isActive = computed(() => props.currentIndex % jacketByLines.value);
</script>

<template>
  <div class="mx-5">
    <div class="flex mx-auto justify-around mb-5">
      <div v-for="(song, index) in songsByX[currentIndexSongByX]" :key="song">
        <SongView
          class="cursor-pointer"
          :class="withSmallJackets && 'max-w-48'"
          :songName="getSongName(song)"
          :gameName="getGameName(song)"
          :isActive="isActive === index"
          @click="
            emit('selectSong', index + currentIndexSongByX * jacketByLines)
          "
        />
      </div>
    </div>
    <div v-if="currentIndexSongByX + 1 < songsByX.length">
      <div
        v-for="line in jacketLinesCount - 1"
        class="flex mx-auto justify-around"
      >
        <div
          v-for="(song, index) in songsByX[currentIndexSongByX + 1 + line]"
          :key="song"
        >
          <SongView
            class="cursor-pointer"
            :class="withSmallJackets && 'max-w-48'"
            :songName="getSongName(song)"
            :gameName="getGameName(song)"
            @click="
              emit(
                'selectSong',
                index + (currentIndexSongByX + 1) * jacketByLines
              )
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

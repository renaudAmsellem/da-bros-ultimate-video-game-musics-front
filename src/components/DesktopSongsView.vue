<script setup>
import { computed } from "vue";
import SongView from "./SongView.vue";
import Jacket from "./Jacket.vue";
import { getGameName, getSongName, getCoverLink } from "../helpers/parseSong";
import { useWindowResize } from "../composables/useWindowResize";

const props = defineProps(["songs", "currentIndex"]);
const emit = defineEmits(["selectSong"]);

const headerAndFooterSize = 200;
const { width, height } = useWindowResize();

const jacketByLines = computed(() => Math.floor(width.value / 300));
const jacketLinesCount = computed(() => Math.floor((height.value - 200) / 300));

const withSmallJackets = computed(() => (height.value - 200) % 300 < 50);

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
  <div>
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
          v-for="(song, index) in songsByX[currentIndexSongByX + 1]"
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

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

const smallJacketWidth = 220;
const jacketWidth = 300;
const smallJacketHeight = 300;
const jacketHeight = 400;

// One jacket = 264 width & 352 height
// 641 height = 2 jackets
const withSmallJackets = computed(
  () => desktopHeight.value % smallJacketHeight < 100
);
const jacketLinesCount = computed(() =>
  Math.floor(desktopHeight.value / smallJacketHeight)
);
const jacketByLines = computed(() =>
  withSmallJackets.value
    ? Math.floor(width.value / smallJacketWidth)
    : Math.floor(width.value / jacketWidth)
);
const xPadding = computed(
  () =>
    (desktopHeight.value -
      jacketLinesCount.value *
        (withSmallJackets.value ? smallJacketHeight : jacketHeight)) /
    2
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
  Math.floor(props.currentIndex / jacketByLines.value)
);

const isActive = computed(() => props.currentIndex % jacketByLines.value);
</script>

<template>
  <div class="mx-5" :style="{ paddingTop: xPadding + 'px' }">
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
        class="flex mx-auto justify-around mb-5"
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

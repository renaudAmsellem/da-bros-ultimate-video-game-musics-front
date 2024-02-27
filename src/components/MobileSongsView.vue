<script setup>
import { computed, watch } from "vue";
import SongView from "./SongView.vue";
import Jacket from "./Jacket.vue";
import { getGameName, getSongName, getCoverLink } from "../helpers/parseSong";
import { useWindowResize } from "../composables/useWindowResize";

const props = defineProps(["songs", "currentIndex"]);
const emit = defineEmits(["previous", "next"]);

const mobileList = computed(() => {
  const list = {
    previous: "",
    current: "",
    next: "",
  };

  if (props.currentIndex !== 0)
    list.previous = props.songs[props.currentIndex - 1];
  list.current = props.songs[props.currentIndex];

  if (props.currentIndex !== props.songs.length - 1)
    list.next = props.songs[props.currentIndex + 1];

  return list;
});

const { mobileHeight } = useWindowResize();
const yPadding = computed(() => {
  if (mobileHeight.value < 400) return 0;
  return (mobileHeight.value - 400) / 2;
});

watch(
  () => props.currentIndex,
  (newIndex) => {
    const preloadNextImage = new Image();
    preloadNextImage.src = getSongName(props.songs[newIndex + 2]);
  },
  { immediate: true }
);
</script>

<template>
  <div class="relative overflow-hidden" :style="{ marginTop: yPadding + 'px' }">
    <Jacket
      v-if="mobileList.previous"
      class="previous-song absolute top-0"
      :jacket="getCoverLink(getGameName(mobileList.previous))"
      @click="emit('previous')"
    />
    <SongView
      v-if="mobileList.current"
      class="current-song mx-auto"
      :song-name="getSongName(mobileList.current)"
      :game-name="getGameName(mobileList.current)"
    />
    <Jacket
      v-if="mobileList.next"
      class="next-song absolute top-0"
      :jacket="getCoverLink(getGameName(mobileList.next))"
      @click="emit('next')"
    />
    <img v-show="false" alt="" :src="getGameName(songs[currentIndex + 2])" />
  </div>
</template>

<style scoped>
.previous-song,
.current-song,
.next-song {
  max-width: min(50%, 264px);
}

.previous-song {
  right: min(85%, calc(50% + 132px + 22px));
}
.next-song {
  left: min(85%, calc(50% + 132px + 22px));
}
</style>

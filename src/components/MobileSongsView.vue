<script setup>
import { computed, ref, watch } from "vue";
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
const width = computed(() => {
  return mobileHeight.value * (264 / 352);
});
const yPadding = computed(() => {
  if (mobileHeight.value < 400) return 0;
  return (mobileHeight.value - 400) / 2;
});
</script>

<template>
  <div class="relative overflow-hidden" :style="{ marginTop: yPadding + 'px' }">
    <Jacket
      class="previous-song absolute top-0"
      v-if="mobileList.previous"
      :jacket="getCoverLink(getGameName(mobileList.previous))"
      @click="emit('previous')"
    />
    <SongView
      v-if="mobileList.current"
      class="current-song mx-auto p-0"
      :songName="getSongName(mobileList.current)"
      :gameName="getGameName(mobileList.current)"
    />
    <Jacket
      class="next-song absolute top-0"
      v-if="mobileList.next"
      :jacket="getCoverLink(getGameName(mobileList.next))"
      @click="emit('next')"
    />
  </div>
</template>

<style scoped>
.previous-song,
.current-song,
.next-song {
  max-width: min(60%, 264px);
}

.previous-song {
  right: min(85%, calc(50% + 132px + 22px));
}
.next-song {
  left: min(85%, calc(50% + 132px + 22px));
}
</style>

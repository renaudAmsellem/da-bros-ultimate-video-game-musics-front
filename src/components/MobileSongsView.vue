<script setup>
import { computed } from "vue";
import SongView from "./SongView.vue";
import Jacket from "./Jacket.vue";
import { getGameName, getSongName, getCoverLink } from "../helpers/parseSong";

const props = defineProps(["songs", "currentIndex"]);

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
</script>

<template>
  <div class="relative overflow-hidden">
    <Jacket
      class="previous-song absolute top-0"
      v-if="mobileList.previous"
      :jacket="getCoverLink(getGameName(mobileList.previous))"
    />
    <SongView
      v-if="mobileList.current"
      class="current-song mx-auto"
      :isActive="true"
      :songName="getSongName(mobileList.current)"
      :gameName="getGameName(mobileList.current)"
    />
    <Jacket
      class="next-song absolute top-0"
      v-if="mobileList.next"
      :jacket="getCoverLink(getGameName(mobileList.next))"
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

<script setup>
import { computed } from "vue";
import Jacket from "./Jacket.vue";
import { getCoverLink } from "../helpers/parseSong";

const props = defineProps(["songName", "gameName", "isActive"]);
const emit = defineEmits(["selectSong"]);

const jacket = computed(() => getCoverLink(props.gameName));
</script>

<template>
  <div
    role="button"
    tabindex="0"
    class="song-view rounded-xl"
    :class="isActive && 'song-view__is-active'"
    @click="emit('selectSong')"
    @keypress="emit('selectSong')"
  >
    <Jacket class="mb-2" :jacket="jacket" />
    <p
      v-if="songName"
      :class="isActive && 'font-bold'"
      class="text-center text-xl overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ songName }}
    </p>
  </div>
</template>

<style scoped>
.song-view__is-active {
  background-color: #c2f5e9c0;
}
</style>

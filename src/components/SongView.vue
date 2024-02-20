<script setup>
import { watch, computed } from "vue";
import Jacket from "./Jacket.vue";
import { getCoverLink } from "../helpers/parseSong";

const props = defineProps(["songName", "gameName", "isActive"]);

const jacket = computed(() => getCoverLink(props.gameName));
</script>

<template>
  <article
    class="song-view rounded-xl p-3"
    :class="isActive && 'song-view__is-active'"
  >
    <Jacket class="mb-2" :jacket="jacket" />
    <p
      v-if="songName"
      :class="isActive && 'font-bold'"
      class="text-center text-xl overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ songName }}
    </p>
  </article>
</template>

<style scoped>
.song-view__is-active {
  background-color: #c2f5e9c0;
}
</style>

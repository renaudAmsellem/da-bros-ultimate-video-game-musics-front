<script setup>
import { watch, computed } from "vue";
import Jacket from "./Jacket.vue";
import { getCoverLink } from "../helpers/parseSong";

const props = defineProps(["songName", "gameName", "isActive"]);

const jacket = computed(() => getCoverLink(props.gameName));
</script>

<template>
  <article class="song-view">
    <Jacket class="mb-2" :jacket="jacket" :zoomIn="isActive" />
    <p
      v-if="songName"
      :class="isActive && 'font-bold'"
      class="text-center text-xl overflow-hidden text-ellipsis whitespace-nowrap"
    >
      {{ songName }}
    </p>
  </article>
</template>

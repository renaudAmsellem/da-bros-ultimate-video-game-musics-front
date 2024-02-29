<script setup>
import { computed } from "vue";
import { getCoverLink } from "../helpers/parseSong";

const props = defineProps(["songName", "gameName"]);

const jacket = computed(() => getCoverLink(props.gameName));
</script>

<template>
  <div class="flex">
    <img
      class="rounded-xl mr-4"
      :src="jacket"
      :alt="`Jaquette de ${gameName} ${songName}`"
      width="57"
      height="76"
    />
    <div class="my-auto text-xl">
      <p class="font-bold overflow-hidden text-ellipsis whitespace-nowrap">
        {{ gameName }}
      </p>
      <p class="overflow-hidden text-ellipsis whitespace-nowrap">
        {{ songName }}
      </p>
    </div>
  </div>
</template>

<style scoped>
div {
  max-width: 80%;
}
img {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>

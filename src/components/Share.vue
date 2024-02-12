<script setup>
import { ref, watch } from "vue";

const localStorageKey = "hearts";

const props = defineProps(["songName"]);

const share = () => {};
</script>

<template>
  <a
    class="cursor-pointer shadow-xl rounded-full p-3 bg-white"
    target="_blank"
    :href="'/' + songName + '.webm'"
  >
    <img width="28" height="28" src="../assets/icons/share.png" />
  </a>
</template>

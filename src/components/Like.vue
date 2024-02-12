<script setup>
import { ref, watch } from "vue";

const localStorageKey = "hearts";

const props = defineProps(["songName"]);
const currentLikes = JSON.parse(localStorage.getItem(localStorageKey)) ?? {};

const liked = ref(false);

watch(
  () => props.songName,
  (newSongValue) => {
    liked.value = currentLikes[newSongValue] || false;
  },
  { immediate: true }
);

const like = () => {
  liked.value = !liked.value;
  currentLikes[props.songName] = !liked.value;
  localStorage.setItem(localStorageKey, JSON.stringify(currentLikes));
};
</script>

<template>
  <div class="cursor-pointer shadow-xl rounded-full p-3 bg-white" @click="like">
    <img v-if="liked" width="28" height="28" src="../assets/icons/liked.png" />
    <img v-else width="28" height="28" src="../assets/icons/like.png" />
  </div>
</template>

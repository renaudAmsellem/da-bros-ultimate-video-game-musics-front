<script setup>
import { ref, computed, watch } from "vue";
const props = defineProps(["songs"]);
const emit = defineEmits(["searching", "stop-searching"]);

const search = ref("");
const searchedSongs = computed(() => {
  if (!search.value) return props.songs;
  return props.songs.filter((song) =>
    song.toLowerCase().includes(search.value.toLowerCase())
  );
});

watch(search, () => {
  if (!search.value) emit("stop-searching");
  emit("searching", searchedSongs.value);
});
</script>
<template>
  <input
    v-model="search"
    class="absolute top-5 right-2"
    aria-label="Barre de recherche"
    type="text"
    placeholder="search"
  />
</template>

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
  <div>
    <div class="absolute top-5 right-2 flex">
      <div
        class="flex absolute inset-y-0 items-center pl-3 pointer-events-none"
      >
        <img
          src="../assets/icons/magnify.png"
          alt=""
          width="14"
          height="auto"
        />
      </div>
      <input
        v-model="search"
        class="rounded-xl border-2 pl-9 py-1 search-bar__input"
        aria-label="Barre de recherche"
        type="text"
        placeholder="Recherche"
      />
    </div>
  </div>
</template>

<style scoped>
.search-bar__input:focus {
  outline: none;
  border-color: #06a09b;
}
</style>

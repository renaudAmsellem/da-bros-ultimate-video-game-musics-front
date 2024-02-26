<script setup>
defineProps(["songName"]);
</script>

<template>
  <a
    class="cursor-pointer shadow-xl rounded-full p-3 bg-white"
    target="_blank"
    :href="'/' + songName + '.webm'"
  >
    <img
      width="28"
      height="28"
      alt="Ouvrir le lien de la chanson dans un nouvel onglet"
      src="../assets/icons/share.png"
    />
  </a>
</template>

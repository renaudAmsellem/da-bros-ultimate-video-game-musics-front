<script setup>
import { watch } from "vue";
import { getCoverLink } from "../helpers/parseSong";

const props = defineProps(["gameAndSongName", "gameName"]);
const emit = defineEmits([
  "play",
  "pause",
  "previous",
  "next",
  "togglePlayPause",
  "seekBackward",
  "seekForward",
]);

watch(
  () => props.gameAndSongName,
  () => {
    if (
      "mediaSession" in navigator &&
      props.gameAndSongName &&
      props.gameName
    ) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: props.gameAndSongName,
        artwork: [
          {
            src: `/covers/${getCoverLink(props.gameName)}.png`,
            sizes: "264x352",
            type: "image/png",
          },
        ],
      });

      navigator.mediaSession.setActionHandler("play", () => emit("play"));
      navigator.mediaSession.setActionHandler("pause", () => emit("pause"));
      // navigator.mediaSession.setActionHandler("seekbackward", () =>
      //   emit("seekBackward")
      // );
      // navigator.mediaSession.setActionHandler("seekforward", () =>
      //   emit("seekForward")
      // );
      navigator.mediaSession.setActionHandler("previoustrack", () =>
        emit("previous")
      );
      navigator.mediaSession.setActionHandler("nexttrack", () => emit("next"));
    }
  },
  { immediate: true }
);

document.body.onkeydown = function (e) {
  if (e.target.type === "text") return;
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    e.preventDefault();
    emit("togglePlayPause");
  }
};
</script>

<template><div /></template>

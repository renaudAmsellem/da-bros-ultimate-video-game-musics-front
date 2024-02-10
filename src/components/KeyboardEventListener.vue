<script setup>
import { watch } from "vue";

const props = defineProps(["songName", "gameName"]);
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
  () => props.songName,
  () => {
    if ("mediaSession" in navigator && props.songName && props.gameName) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: props.songName,
        artwork: [
          {
            src: `/covers/${props.gameName}.png`,
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
  if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
    e.preventDefault();
    emit("togglePlayPause");
  }
};
</script>

<template></template>

<script setup>
import { watch, computed } from "vue";
import { useSwiper } from "swiper/vue";

const props = defineProps(["currentIndex", "swiperIndex"]);

const swiper = useSwiper();

watch(
  () => props.currentIndex || props.swiperIndex,
  () => {
    if (props.currentIndex > props.swiperIndex) return swiper.value.slideNext();
    if (props.currentIndex < props.swiperIndex) return swiper.value.slidePrev();
  }
);
</script>

<template />

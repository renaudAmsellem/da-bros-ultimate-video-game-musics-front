<script setup>
import { computed, ref, watch } from "vue";
import SongView from "./SongView.vue";
import Jacket from "./Jacket.vue";
import SwiperControl from "./SwiperControl.vue";
import { getGameName, getSongName, getCoverLink } from "../helpers/parseSong";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Virtual, EffectCoverflow } from "swiper/modules";
import { useWindowResize } from "../composables/useWindowResize";
import "swiper/css";

const props = defineProps(["songs", "currentIndex"]);
const emit = defineEmits(["previous", "next"]);

const swiperIndex = ref(0);
const modules = [Virtual, EffectCoverflow];

const onSlideChange = ({ swipeDirection }) => {
  if (props.currentIndex === swiperIndex.value) return;
  if (swipeDirection === "prev") return emit("previous");
  emit("next");
};

const indexChange = ({ activeIndex }) => (swiperIndex.value = activeIndex);

const { mobileHeight } = useWindowResize();
const width = computed(() => {
  return mobileHeight.value * (264 / 352);
});
const xPadding = computed(() => {
  if (mobileHeight < 400) return 0;
  return (mobileHeight.value - 400) / 2;
});
</script>

<template>
  <div class="relative overflow-hidden">
    <Swiper
      ref="input"
      :modules="modules"
      :virtual="true"
      :effect="'coverflow'"
      :centeredSlides="true"
      :slidesPerView="2"
      :space-between="-xPadding"
      :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }"
      @slideChange="onSlideChange"
      @activeIndexChange="indexChange"
    >
      <SwiperControl :currentIndex="currentIndex" :swiperIndex="swiperIndex" />
      <SwiperSlide
        v-for="(item, index) in songs"
        :key="index"
        :virtualIndex="index"
        v-slot="{ isActive }"
      >
        <SongView
          class="current-song mx-auto"
          :isActive="isActive"
          :gameName="getGameName(item)"
          :songName="isActive ? getSongName(item) : ''"
          :style="{
            width: width,
            paddingTop: xPadding + 'px',
          }"
        />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

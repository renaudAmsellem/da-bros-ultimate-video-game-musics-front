<script setup>
import { computed } from "vue";
import Progress from "./Progress.vue";

const props = defineProps(["progress", "duration"]);
const emit = defineEmits(["seek"]);

const getSeconds = (time) => Math.floor(time) % 60;

const getMinutes = (time) => Math.floor(time / 60);

const getFormattedTime = (time) => {
  const seconds = getSeconds(time);
  const minutes = getMinutes(time);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

const formattedTime = computed(() => getFormattedTime(props.progress));

const formattedDuration = computed(() => getFormattedTime(props.duration));
</script>

<template>
  <div class="w-full m-auto">
    <div class="flex items-center">
      <span class="hidden md:block whitespace-nowrap mr-4"
        >{{ formattedTime }} / {{ formattedDuration }}</span
      >
      <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
      <Progress
        :progress="progress"
        :duration="duration"
        @seek="(data) => emit('seek', data)"
      />
    </div>
    <div class="flex justify-between md:hidden">
      <p>{{ formattedTime }}</p>
      <p>{{ formattedDuration }}</p>
    </div>
  </div>
</template>

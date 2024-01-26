<script setup>
    const props = defineProps(['isPaused', 'songName'])
    const emit = defineEmits(['play', 'pause', 'next', 'previous'])
</script>

<template>
    <div class="player">
        <p>{{props.songName}}</p>
        <ul class="list list--buttons">
            <li @click="emit('previous')"><img src="../assets/previousIcon.png" /></li>

            <li v-show="props.isPaused" @click="emit('play')"><img src="../assets/playIcon.png" /></li>
            <li v-show="!props.isPaused" @click="emit('pause')"><img src="../assets/pauseIcon.png" /></li>

            <li @click="emit('next')"><img src="../assets/nextIcon.png" /></li>
        </ul>
    </div>
</template>

<style scoped>
.player {
    border-radius: 8px;
}
.list--buttons {
    align-items: center;
    justify-content: center;
}

.list--buttons li:nth-of-type(n+1) {
    margin-left: 1.5rem;
}

</style>
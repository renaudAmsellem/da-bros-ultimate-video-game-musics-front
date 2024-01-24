<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['fileName'])
const currentNotes = JSON.parse(localStorage.getItem('notes')) ?? {}

const fullStarCount = ref(0)

const onHover = (index) => {
    fullStarCount.value = index
}

const currentNote = ref(0)
const setCurrentNote = (index) => currentNote.value = index

watch(currentNote, (newValue) => {
    if (currentNote === 0) return
    currentNotes[props.fileName] = newValue
    localStorage.setItem('notes', JSON.stringify(currentNotes))
})

watch(() => props.fileName, (newValue) => {
    fullStarCount.value = currentNotes[newValue] || 0
},  { immediate: true } )
</script>

<template>
    <div class="note" @mouseleave.native="fullStarCount = currentNote">
        <div v-for="index in 10" :key="index" @mouseover="onHover(index)" @click="setCurrentNote(index)">
            <img v-if="index > fullStarCount" src="../assets/emptyStar.png" />
            <img v-else src="../assets/star.png" />
        </div>
    </div>
</template>

<style>
.note {
    display: flex;
    margin: auto;
    &:hover {
        cursor: pointer;
    }

    img {
        height: 24px;
        width: 24px;
    }
}
</style>
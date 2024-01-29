<script setup>
const props = defineProps(['waitingList'])
const emit = defineEmits(['selectSong'])
</script>


<template>
<ul>
    <li v-for="(songName, index) in props.waitingList" @click="emit('selectSong', index)">
        <p>{{ songName }}</p>
    </li>
</ul>
</template>

<style scoped lang="scss">
ul {
    padding: 0
}

li {
    height: 64px;
    list-style: none;
    border: 1px solid black;
    margin: 0 2px;
    padding: 5px;
    &:hover {
        background-color: grey;
    }
}

p {
    text-align: left;
}
</style>
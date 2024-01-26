<script setup>
import {watch} from 'vue'

const props = defineProps(['songName'])
const emit = defineEmits(['play', 'pause', 'previous', 'next'])

watch(() => props.songName, () => {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: props.songName,
        });

        navigator.mediaSession.setActionHandler('play', () => emit('play'));
        navigator.mediaSession.setActionHandler('pause', () => emit('pause'));
        // Todo : comment tester ?
        // navigator.mediaSession.setActionHandler('seekbackward', () =>emit('next'));
        // navigator.mediaSession.setActionHandler('seekforward', function() { console.log('next') });
        navigator.mediaSession.setActionHandler('previoustrack', () => emit('previous'));
        navigator.mediaSession.setActionHandler('nexttrack', () => emit('next'));
    }
}, {immediate: true})
</script>
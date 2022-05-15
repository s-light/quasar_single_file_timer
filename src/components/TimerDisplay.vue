<template>
    <section class="flex flex-center">
        <q-circular-progress
            :value="thetime.elapsed_percentage"
            size="99vh"
            :thickness="1.0"
            :animation-speed="0"
            color="blue"
            track-color="dark"
            show-value
            font-size="20vh"
            style="overflow:hidden;"
            instant-feedback
        >
            <!--
            :animation-speed="thetime.update_interval/2"
                :color="color_active"
                :track-color="color_inactive"
                :thickness="0.1"
                center-color="grey-8"
            -->
            <!-- {{thetime.remaining}} -->
            {{remaining_formated}}
        </q-circular-progress>
    </section>
</template>

<script setup>
import { toRef, unref, ref, computed, onUnmounted , watch} from 'vue'
import { useQuasar, date } from 'quasar'
import bell_sound from 'assets/01__04__s-light__singing_bowl_-_single_strike_4.ogg'
import { useTimerTools } from './TimerFormat.js'


const props = defineProps({
    thetime: {
        type: Object,
        required: true
    },
})

const thetime = toRef(props, 'thetime')
const timer = unref(thetime).timer
const alarm = unref(thetime).alarm


const timerTools = useTimerTools(timer.format)
// console.log("useTimerTools:", useTimerTools)
// console.log("timerTools:", timerTools)

const $q = useQuasar()

const audio_bell = new Audio(bell_sound)
// console.log(`audio_bell ${audio_bell}`);


// alarm
const alarm_toggle_colors = () => {
    $q.dark.toggle()
}

const alarm_update = () => {
    // console.log("alarm_update")
    alarm_toggle_colors()
    alarm.remaining -= alarm.interval
    if (alarm.remaining <= 0) {
        alarm_stop()
        alarm.running = false
    }
}

const alarm_start = () => {
    // console.log("alarm_start")
    alarm_stop()
    audio_bell.play()
    alarm.color_orig = $q.dark.isActive
    alarm.remaining = alarm.duration
    alarm.timer_id = window.setInterval(alarm_update, alarm.interval)
}

const alarm_stop = () => {
    // console.log("alarm_stop")
    if (alarm.timer_id) {
        window.clearInterval(alarm.timer_id)
        alarm.timer_id = null
        $q.dark.set(alarm.color_orig)
    }
}

// https://vuejs.org/guide/essentials/watchers.html#deep-watchers
// watch(
//     alarm,
//     (newValue, oldValue) => {
//         console.log("watch: alarm", oldValue, "→", newValue);
//     },
// )
watch(
    () => alarm.running,
    (newValue, oldValue) => {
        console.log("watch: alarm.running", oldValue, "→", newValue);
        if(oldValue == false && newValue == true) {
            alarm_start()
        } else if (oldValue == true && newValue == false) {
            alarm_stop()
        }
    },
)



const remaining_formated = computed(() => {
    // we have to substract a hour
    // i do not remember why exactly - just that i stumbled accross this before..
    // we also add 1 second - this way we count down to 0...
    return timerTools.durationFormatted(thetime.value.remaining - (60*60*1000) + 1000)
})

// handle = requestAnimationFrame(update)
// update()
// onUnmounted(() => {
// cancelAnimationFrame(handle)
// })

</script>

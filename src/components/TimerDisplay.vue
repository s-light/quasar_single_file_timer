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
            <!--
                {{thetime.remaining}}
                {{remaining_formatted}}
            -->
            {{thetime.remaining_formatted}}
        </q-circular-progress>
    </section>
</template>

<script setup>
import { toRef, unref, ref, computed, onUnmounted , watch} from 'vue'
import { useQuasar, date } from 'quasar'
import bell_sound from 'assets/01__04__s-light__singing_bowl_-_single_strike_4.ogg'
import { useTimerTools } from './TimerFormat.js'
import { useTheTimeStore } from 'stores/thetime'

const $q = useQuasar()

const props = defineProps({
    // thetime: {
    //     type: Object,
    //     required: true
    // },
    duration: {
        type: Number,
        default: 5 * 1000
    },
    interval: {
        type: Number,
        default: 500
    },
})

const color_orig = ref($q.dark.isActive)
const remaining = ref(0)
const interval_id = ref(null)

// const thetime = toRef(props, 'thetime')
const thetime = useTheTimeStore()

const timerTools = useTimerTools(thetime.format)
// console.log("useTimerTools:", useTimerTools)
// console.log("timerTools:", timerTools)

const audio_bell = new Audio(bell_sound)
// console.log(`audio_bell ${audio_bell}`);


// alarm
const alarmToggleColors = () => {
    $q.dark.toggle()
}

const alarmUpdate = () => {
    // console.log("alarmUpdate")
    alarmToggleColors()
    remaining.value -= props.interval
    if (remaining.value <= 0) {
        alarm_stop()
        thetime.alarm_running = false
    }
}

const alarm_start = () => {
    // console.log("alarm_start")
    alarm_stop()
    audio_bell.play()
    color_orig.value = $q.dark.isActive
    remaining.value = props.duration
    interval_id.value = window.setInterval(alarmUpdate, props.interval)
}

const alarm_stop = () => {
    // console.log("alarm_stop")
    if (interval_id.value) {
        window.clearInterval(interval_id.value)
        interval_id.value = null
        $q.dark.set(color_orig.value)
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
    () => thetime.alarm_running,
    (newValue, oldValue) => {
        console.log("watch: alarm.running", oldValue, "→", newValue);
        if(oldValue == false && newValue == true) {
            alarm_start()
        } else if (oldValue == true && newValue == false) {
            alarm_stop()
        }
    },
)

onUnmounted(() => {
    alarm_stop()
})


// const remaining_formatted =  computed(() => {
//     // visual hack:
//     // if timer is running we add 1 second - this way we count down to 0...
//     let offset = 0
//     if (thetime.running) {
//         offset += 1000
//     }
//     return timerTools.convertDurationToTimeStr(thetime.remaining - offset)
// })

// handle = requestAnimationFrame(update)
// update()
// onUnmounted(() => {
// cancelAnimationFrame(handle)
// })


</script>

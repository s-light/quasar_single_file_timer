<template>
    <section class="flex flex-center">
        <!--
            :value="
                thetime.remaining < 0 ? thetime.elapsed_percentage * -1 : thetime.elapsed_percentage
                "
                :track-color="thetime.remaining < 0 ? 'red' : 'dark'"
                :thickness="thetime.remaining < 0 ? 0.05 : 0.1"
         -->
        <q-circular-progress
            :value="thetime.elapsed_percentage"
            size="99vh"
            :thickness="0.1"
            :animation-speed="0"
            :color="thetime.remaining < 0 ? 'lime' : 'blue'"
            :track-color="'dark'"
            show-value
            :font-size="thetime.fontSizeDisplay"
            style="overflow: hidden"
            instant-feedback
            class="shadowText"
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
            {{ thetime.remaining_formatted }}
            <!-- {{ thetime.remaining_formatted_number }}<br /> -->
        </q-circular-progress>
    </section>
</template>

<script setup>
import { toRef, unref, ref, computed, onUnmounted, watch } from "vue";
import { useQuasar, date } from "quasar";
import bell_sound from "assets/01__04__s-light__singing_bowl_-_single_strike_4.ogg";
import { useTimerTools } from "./TimerFormat.js";
import { useTheTimeStore } from "stores/thetime.js";

const $q = useQuasar();

const props = defineProps({
    // thetime: {
    //     type: Object,
    //     required: true
    // },
    duration: {
        type: Number,
        default: 5 * 1000,
    },
    interval: {
        type: Number,
        default: 500,
    },
});

const color_orig = ref($q.dark.isActive);
const remaining = ref(0);
const interval_id = ref(null);

const maincolor = ref("blue");
const trackcolor = ref("dark");

// const thetime = toRef(props, 'thetime')
const thetime = useTheTimeStore();

const timerTools = useTimerTools(thetime.format);
// console.log("useTimerTools:", useTimerTools)
// console.log("timerTools:", timerTools)

const audio_bell = new Audio(bell_sound);
// console.log(`audio_bell ${audio_bell}`);

// alarm
const alarmToggleColors = () => {
    $q.dark.toggle();
};

const alarmUpdate = () => {
    // console.log("alarmUpdate")
    alarmToggleColors();
    remaining.value -= props.interval;
    if (remaining.value <= 0) {
        alarm_stop();
        thetime.alarm_running = false;
        thetime.alarm_done = true;
    }
};

const alarm_start = () => {
    // console.log("alarm_start")
    alarm_stop();
    audio_bell.play();
    color_orig.value = $q.dark.isActive;
    remaining.value = props.duration;
    interval_id.value = window.setInterval(alarmUpdate, props.interval);
};

const alarm_stop = () => {
    // console.log("alarm_stop")
    if (interval_id.value) {
        window.clearInterval(interval_id.value);
        interval_id.value = null;
        $q.dark.set(color_orig.value);
    }
};

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
        console.log("watch: alarm_running", oldValue, "→", newValue);
        if (oldValue == false && newValue == true) {
            alarm_start();
        } else if (oldValue == true && newValue == false) {
            alarm_stop();
        }
    }
);
watch(
    () => thetime.alarm_done,
    (newValue, oldValue) => {
        console.log("watch: alarm_done", oldValue, "→", newValue);
        if (oldValue == false && newValue == true) {
            alarm_stop();
        }
    }
);

onUnmounted(() => {
    alarm_stop();
});

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

<style lang="css">
.body--light .shadowText {
    text-shadow: white 0 0 0.05em, white 0 0 0.01em, white 0 0 0.01em;
}

.body--dark .shadowText {
    text-shadow: black 0 0 0.05em, black 0 0 0.01em, black 0 0 0.01em;
}
</style>

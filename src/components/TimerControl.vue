<template>
    <section>
        <ul>
            <li
                v-for="item in duration_list"
                :key="item"
            >
                <q-btn
                    :label="item"
                    outlined
                    @click="timer_start(timerTools.convertTimeStrToDuration(item))"
                />
            </li>
        </ul>
        <section>
            <q-input
                v-model="timeNew"
                outlined
                type="time"
                step="1"
                pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
            />
            <q-btn label="start" outlined @click="timerStartWithTimeNew()"/>
            <q-btn label="add" outlined @click="duration_list.push(timeNew)"/>
        </section>
    </section>
</template>

<script setup>
import { ref, toRef, unref } from 'vue'
import { useTimerTools } from './TimerFormat.js'

const props = defineProps({
    thetime: {
        type: Object,
        required: true
    },
    // timeNew: ref("00:00:10"),
})

const timeNew = ref("00:00:10")

const thetime = toRef(props, 'thetime')
const timer = unref(thetime).timer
const alarm = unref(thetime).alarm
// const timer = props.thetime.timer
// console.log("thetime.value:", thetime.value)
// console.log("unref(thetime):", unref(thetime))
// const timer = thetime.timer
// console.log("timer:", timer)

const timerTools = useTimerTools(timer.format)

// timer actions
const timer_stop = () => {
    // console.log("stop!");
    if (timer.timer_id) {
        window.clearInterval(timer.timer_id)
    }
    timer.timer_id = null

    timer.now = timer.end + 1000
    timer.running = false
}

const timer_update = () => {
    timer.now = Date.now();
    // console.log(`elapsed:   ${timer.elapsed}`)
    // console.log(`remaining: ${timer.remaining}`)
    if (thetime.value.remaining <= timer.interval) {
        console.log("timer_stop");
        timer_stop()
        console.log("run alarm:");
        alarm.running = true;
    }
}

const timer_start = (duration_ms=null) => {
    // console.log("timer_start")
    timer_stop()
    alarm.running = false
    if (duration_ms) {
        timer.duration = duration_ms
    }
    // console.log(`duration_ms: ${duration_ms}`)
    // console.log(`timer.duration: ${timer.duration}`)
    timer.start = Date.now()
    timer.end = Date.now() + timer.duration
    timer.timer_id = window.setInterval(timer_update, timer.update_interval)
    timer.running = true;
}

const timerStartWithTimeNew = () => {
    console.log(`timeNew: ${timeNew.value}`)
    let duration = timerTools.convertTimeStrToDuration(timeNew.value)
    console.log(`duration: ${duration}`)
    timer_start(duration)
}







// ------------------------------------------
// list
let duration_list = ref([
    "00:00:02",
    "00:00:05",
    "00:01:00",
    "00:05:00",
    "00:10:00",
    "00:15:00",
    "00:30:00",
])







</script>

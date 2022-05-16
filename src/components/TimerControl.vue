<template>
    <section>
        <section>
            <h5>
                timer
            </h5>
        </section>
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
        </section>
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
        <section>
            <h5>
                timetravel
            </h5>
            <q-btn label="-1min" outlined @click="thetime.timetravel(-1)"/>
            <q-btn label="+1min" outlined @click="thetime.timetravel(+1)"/>
        </section>
    </section>
</template>

<script setup>
import { ref, toRef, unref, onUnmounted } from 'vue'
import { useTimerTools } from './TimerFormat.js'
import { useTheTimeStore } from 'stores/thetime'

const props = defineProps({
    // thetime: {
    //     type: Object,
    //     required: true,
    // },
    // timeNew: ref("00:00:10"),
    // format: {
    //     type: String,
    //     default: 'HH:mm:ss',
    // },
    // interval: {
    //     type: Number,
    //     default: 500,
    // },
})

const timeNew = ref("00:00:10")

// const thetime = toRef(props, 'thetime')
const thetime = useTheTimeStore()

const timerTools = useTimerTools(thetime.format)

// timer actions
const timer_stop = () => {
    // console.log("stop!");
    if (thetime.timer_id) {
        window.clearInterval(thetime.timer_id)
    }
    thetime.timer_id = null
    // console.log(`timer_stop thetime.end: ${thetime.end}`);
    // console.log(`timer_stop thetime.now: ${thetime.now}`);
    thetime.now = thetime.end + 1000
    // console.log(`timer_stop thetime.now: ${thetime.now}`);
    // console.log(`timer_stop thetime.remaining: ${thetime.remaining}`);
    thetime.running = false
}

const timer_update = () => {
    thetime.now = Date.now();
    // console.log(`remaining: ${thetime.remaining}   elapsed: ${thetime.elapsed}`)
    // console.log(`elapsed:   ${thetime.elapsed}`)
    // console.log(`remaining: ${thetime.remaining}`)
    if (thetime.remaining <= thetime.interval) {
        // console.log("timer_stop");
        timer_stop()
        // console.log("run alarm:");
        thetime.alarm_running = true;
    }
}

const timer_start = (duration_ms=null) => {
    // console.log("timer_start")
    timer_stop()
    thetime.alarm_running = false
    if (duration_ms) {
        thetime.duration = duration_ms
    }
    // console.log(`duration_ms: ${duration_ms}`)
    // console.log(`thetime.duration: ${thetime.duration}`)
    thetime.start = Date.now()
    // console.log(`thetime.start:       ${thetime.start}`)
    // console.log(`thetime.end: ${thetime.end}`)
    timer_update()
    thetime.running = true;
    thetime.timer_id = window.setInterval(timer_update, thetime.interval)
}

const timerStartWithTimeNew = () => {
    // console.log(`timeNew: ${timeNew.value}`)
    let duration = timerTools.convertTimeStrToDuration(timeNew.value)
    // console.log(`duration: ${duration}`)
    timer_start(duration)
}

onUnmounted(() => {
    timer_stop()
})


// ------------------------------------------
// list
let duration_list = ref([
    "00:01:00",
    "00:05:00",
    "00:10:00",
    "00:15:00",
    "00:30:00",
])

</script>

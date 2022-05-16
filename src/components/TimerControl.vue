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
            <TimeInput
                v-model="thetime.duration"
                outlined
                @keyup.enter="timer_start()"
                @keyup="timer_update()"
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
import { ref, toRef, unref, computed, onUnmounted } from 'vue'
import { useTimerTools } from './TimerFormat.js'
import { useTheTimeStore } from 'stores/thetime'
import TimeInput from 'components/TimeInput'

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
    if (thetime.running) {
        if (thetime.remaining <= thetime.interval) {
            // console.log("timer_stop");
            timer_stop()
            // console.log("run alarm:");
            thetime.alarm_running = true
        }
    } else {
        thetime.start = thetime.now
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

const remaining_formated = computed(() => {
    // we have to substract a hour
    // i do not remember why exactly - just that i stumbled accross this before..
    // we also add 1 second - this way we count down to 0...
    // const remaining_mod = thetime.remaining - (60*60*1000) + 1000
    // const remaining_formated =  timerTools.durationFormatted(remaining_mod)
    // console.log(`remaining ${thetime.remaining} → ${remaining_mod} → ${remaining_formated}`);
    // return remaining_formated
    let offset = (60*60*1000)
    if (thetime.running) {
        offset += 1000
    }
    return timerTools.durationFormatted(thetime.remaining - offset)
})

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

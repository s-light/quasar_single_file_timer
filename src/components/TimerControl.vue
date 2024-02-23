<template>
    <section>
        <section>
            <h5>timer</h5>
            <h6>
                {{ thetime.remaining_formatted }}
            </h6>
        </section>
        <section>
            <ul>
                <li v-for="item in thetime.duration_list" :key="item">
                    <q-btn
                        :label="item"
                        outlined
                        @click="thetime.timer_start(timerTools.convertTimeStrToDuration(item))"
                    />
                </li>
            </ul>
        </section>
        <section>
            <TimeInput
                v-model="thetime.duration"
                outlined
                @keyup.enter="thetime.timer_start()"
                @keyup="thetime.timer_update()"
            />
            <q-btn label="start" outlined @click="thetime.timer_start()" />
            <q-btn label="add" outlined @click="listAddEntry()" />
        </section>
        <section>
            <h5>timetravel</h5>
            <q-btn label="-1min" outlined @click="thetime.timetravel(-1)" />
            <q-btn label="+1min" outlined @click="thetime.timetravel(+1)" />
        </section>
    </section>
</template>

<script setup>
import { ref, toRef, unref, computed, onUnmounted } from "vue";
import { useTimerTools } from "./TimerFormat.js";
import { useTheTimeStore } from "stores/thetime.js";
import TimeInput from "components/TimeInput.vue";

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
});

// const thetime = toRef(props, 'thetime')
const thetime = useTheTimeStore();

const timerTools = useTimerTools(thetime.format);

const remaining_formated = computed(() => {
    // visual hack:
    // if timer is running we add 1 second - this way we count down to 0...
    let offset = 0;
    if (thetime.running) {
        offset += 1000;
    }
    return timerTools.convertDurationToTimeStr(thetime.remaining - offset);
});

// onUnmounted(() => {
//     timer_stop()
// })

const listAddEntry = () => {
    thetime.duration_list.push(timerTools.convertDurationToTimeStr(thetime.duration));
};
</script>

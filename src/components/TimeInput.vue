<template>
    <q-input
        :model-value="durationAsTime"
        @update:model-value="emitTimeAsDuration($event)"
        type="time"
        :step="step"
        :pattern="pattern"
    />
</template>

<script setup>
import { ref, toRef, unref, computed, watch, onUnmounted } from "vue";
import { useTimerTools } from "./TimerFormat.js";
import { useTheTimeStore } from "stores/thetime.js";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    modelValue: Number,
    format: {
        type: String,
        default: "HH:mm:ss",
    },
});

const pattern = ref("[0-9]{2}:[0-9]{2}:[0-9]{2}");
const step = ref(1);

const thetime = useTheTimeStore();
const timerTools = useTimerTools(thetime.format);

const durationAsTime = computed(() => {
    return timerTools.convertDurationToTimeStr(props.modelValue);
});

const emitTimeAsDuration = (timeString) => {
    emit("update:modelValue", timerTools.convertTimeStrToDuration(timeString));
};

watch(
    () => props.format,
    (newValue, oldValue) => {
        // check for seconds
        if (newValue.includes(":ss")) {
            // show seconds
            pattern = "[0-9]{2}:[0-9]{2}:[0-9]{2}";
            step = 1;
        } else {
            pattern = "[0-9]{2}:[0-9]{2}";
            step = 60;
        }
    }
);
</script>

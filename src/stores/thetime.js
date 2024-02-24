import { defineStore } from "pinia";
import { useTimerTools } from "../components/TimerFormat.js";

export const useTheTimeStore = defineStore("thetime", {
    state: () => ({
        start: Date.now(),
        running: false,
        timer_id: null,
        duration: 10 * 1000,
        interval: 50,
        format: "HH:mm:ss",
        formatDisplay: "mm:ss",
        // update helper...
        now: Date.now(),
        alarm_visual: true,
        alarm_running: false,
        duration_list: ["00:01:00", "00:02:00", "00:05:00", "00:10:00", "00:15:00", "00:30:00"],
    }),

    getters: {
        // https://pinia.vuejs.org/core-concepts/getters.html
        end: (state) => state.start + state.duration,
        remaining: (state) => {
            let remaining = state.duration;
            if (state.running) {
                remaining = state.end - state.now;
            }
            return remaining;
        },
        remaining_formatted_number: (state) => {
            // visual hack:
            // if timer is running we add 1 second - this way we count down to 0...
            let offset = 0;
            if (state.running && state.remaining >= 0) {
                offset -= 1000;
            }
            return state.remaining - offset;
        },
        remaining_formatted: (state) => {
            // visual hack:
            // if timer is running we add 1 second - this way we count down to 0...
            const timerTools = useTimerTools(state.formatDisplay);
            return timerTools.convertDurationToTimeStr(state.remaining_formatted_number);
        },
        elapsed: (state) => state.now - state.start,
        // 100% = duration
        //   x  = elapsed
        // we use the modulor operator to get the elapsed value to a range from 0 .. duration
        // this way it starts at 0 after finishing..
        elapsed_percentage: (state) => (100 * (state.elapsed % state.duration)) / state.duration,
        fontSizeDisplay: (state) => (state.formatDisplay.length > 5 ? "25vh" : "30vh"),
    },

    actions: {
        timetravel(minutes) {
            this.duration += minutes * 1000 * 60;
        },
        timer_stop() {
            // console.log("stop!");
            if (this.timer_id) {
                window.clearInterval(this.timer_id);
            }
            this.timer_id = null;
            // console.log(`timer_stop this.end: ${this.end}`);
            // console.log(`timer_stop this.now: ${this.now}`);
            this.now = this.end + 1000;
            // console.log(`timer_stop this.now: ${this.now}`);
            // console.log(`timer_stop this.remaining: ${this.remaining}`);
            this.running = false;
            this.alarm_running = false;
            this.alarm_done = true;
        },
        timer_update() {
            this.now = Date.now();
            // console.log(`remaining: ${this.remaining}   elapsed: ${this.elapsed}`)
            // console.log(`elapsed:   ${this.elapsed}`)
            // console.log(`remaining: ${this.remaining}`)
            if (this.running) {
                // if (this.remaining <= this.interval) {
                //     // console.log("timer_stop");
                //     this.timer_stop();
                //     // console.log("run alarm:");
                //     this.alarm_running = true;
                // }
                if (!this.alarm_done && this.alarm_visual) {
                    if (this.remaining <= this.interval) {
                        // console.log("timer_stop");
                        // this.timer_stop();
                        // console.log("run alarm:");
                        this.alarm_running = true;
                    }
                }
            } else {
                this.start = this.now;
            }
        },
        timer_start(duration_ms = null) {
            // console.log("timer_start")
            this.timer_stop();
            this.alarm_running = false;
            this.alarm_done = false;
            if (duration_ms) {
                this.duration = duration_ms;
            }
            // console.log(`duration_ms: ${duration_ms}`)
            // console.log(`this.duration: ${this.duration}`)
            this.start = Date.now();
            // console.log(`this.start:       ${this.start}`)
            // console.log(`this.end: ${this.end}`)
            this.timer_update();
            this.running = true;
            this.timer_id = window.setInterval(this.timer_update, this.interval);
        },
    },
});

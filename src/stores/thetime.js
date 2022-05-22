import { defineStore } from 'pinia';

export const useTheTimeStore = defineStore('thetime', {
    state: () => ({
        start: Date.now(),
        running: false,
        timer_id: null,
        duration: 10 * 1000,
        interval: 50,
        format: 'HH:mm:ss',
        // update helper...
        now: Date.now(),
        // alarm..
        alarm_running: false,
        duration_list: [
            "00:01:00",
            "00:02:00",
            "00:05:00",
            "00:10:00",
            "00:15:00",
            "00:30:00",
        ],
    }),

    getters: {
        // https://pinia.vuejs.org/core-concepts/getters.html
        end: (state) => state.start + state.duration,
        remaining: (state) => {
            let remaining = state.duration
            if (state.running) {
                remaining = state.end - state.now
            }
            return remaining
        },
        elapsed: (state) => state.now - state.start,
        // 100% = duration
        //   x  = elapsed
        elapsed_percentage: (state) => 100 * state.elapsed / state.duration,
    },

    actions: {
        timetravel(minutes) {
            this.duration += minutes * 1000 * 60
        },
        timer_stop() {
            // console.log("stop!");
            if (this.timer_id) {
                window.clearInterval(this.timer_id)
            }
            this.timer_id = null
            // console.log(`timer_stop this.end: ${this.end}`);
            // console.log(`timer_stop this.now: ${this.now}`);
            this.now = this.end + 1000
            // console.log(`timer_stop this.now: ${this.now}`);
            // console.log(`timer_stop this.remaining: ${this.remaining}`);
            this.running = false
        },
        timer_update() {
            this.now = Date.now();
            // console.log(`remaining: ${this.remaining}   elapsed: ${this.elapsed}`)
            // console.log(`elapsed:   ${this.elapsed}`)
            // console.log(`remaining: ${this.remaining}`)
            if (this.running) {
                if (this.remaining <= this.interval) {
                    // console.log("timer_stop");
                    this.timer_stop()
                    // console.log("run alarm:");
                    this.alarm_running = true
                }
            } else {
                this.start = this.now
            }
        },
        timer_start(duration_ms=null) {
            // console.log("timer_start")
            this.timer_stop()
            this.alarm_running = false
            if (duration_ms) {
                this.duration = duration_ms
            }
            // console.log(`duration_ms: ${duration_ms}`)
            // console.log(`this.duration: ${this.duration}`)
            this.start = Date.now()
            // console.log(`this.start:       ${this.start}`)
            // console.log(`this.end: ${this.end}`)
            this.timer_update()
            this.running = true;
            this.timer_id = window.setInterval(this.timer_update, this.interval)
        },
    }
})

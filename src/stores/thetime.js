import { defineStore } from 'pinia';

export const useTheTimeStore = defineStore('thetime', {
    state: () => ({
        duration: 10 * 1000,
        start: Date.now(),
        end: Date.now() + 10 * 1000,
        update_interval: 50,
        running: false,
        timer_id: null,
        // update helper...
        now: Date.now(),
        // alarm
        alarm_running: false,
        alarm_timer_id: null,
        alarm_duration: 5 * 1000,
        alarm_interval: 500,
    }),

    getters: {
        // https://pinia.vuejs.org/core-concepts/getters.html
        remaining: (state) => state.end - state.now,
        elapsed: (state) => state.now - state.start,
        /**
         * Returns the elapsed value in percentage.
         *
         * @returns {number}
         */
        elapsed_percentage (state) {
            // 100% = duration
            //   x  = elapsed
            // return 100 * this.elapsed() / state.duration
            // return 100 * (state.now - state.start) / state.duration
            // console.group("elapsed_percentage");
            // console.log(`state.now:      ${state.now}`);
            // console.log(`state.start:    ${state.start}`);
            // console.log(`state.duration: ${state.duration}`);
            const elapsed = state.now - state.start
            // console.log(`elapsed:     ${elapsed}`);
            let result = 100 * elapsed / state.duration
            // console.log(`result: ${result}`);
            console.groupEnd();
            return result
        },
    },

    actions: {
        // start_countdown (duration_ms=null) {
        //     if (duration_ms) {
        //         this.duration = duration_ms
        //     }
        //     this.start = Date.now()
        //     this.end = Date.now() + this.duration
        //     this.timer_id = window.setInterval(this.update, 0.1)
        //     this.running = true;
        // },
        // update () {
        //     this.now = Date.now();
        //     if (remaining <= 0) {
        //         window.clearInterval(this.timer_id)
        //         this.running = false
        //     }
        // },
        // stop () {
        //     this.running = false;
        // },
        // alarm
        // alarm_toggle_colors: () => {
        //     $q.dark.toggle()
        // },
        // alarm_update: () => {
        //     // console.log("alarm_update")
        //     alarm_toggle_colors()
        //     this.alarm_running -= this.alarm_interval
        //     if (this.alarm_running <= 0) {
        //         alarm_stop()
        //     }
        // },
        // alarm_start: () => {
        //     // console.log("alarm_start")
        //     this.alarm_color_orig = $q.dark.isActive
        //     this.alarm_running = this.alarm_duration
        //     this.alarm_timer_id = window.setInterval(alarm_update, this.alarm_interval)
        // },
        // alarm_stop: () => {
        //     // console.log("alarm_stop")
        //     window.clearInterval(this.alarm_timer_id)
        //     $q.dark.set(this.alarm_color_orig)
        //     this.alarm_running = false
        // },
    }
})

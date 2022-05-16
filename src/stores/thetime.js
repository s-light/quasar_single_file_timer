import { defineStore } from 'pinia';

export const useTheTimeStore = defineStore('thetime', {
    state: () => ({
        start: Date.now(),
        running: false,
        timer_id: null,
        duration: 10 * 1000,
        interval: 50,
        // update helper...
        now: Date.now(),
        // alarm..
        alarm_running: false,
    }),

    getters: {
        // https://pinia.vuejs.org/core-concepts/getters.html
        end: (state) => state.start + state.duration,
        remaining: (state) => state.end - state.now,
        elapsed: (state) => state.now - state.start,
        // 100% = duration
        //   x  = elapsed
        elapsed_percentage: (state) => 100 * state.elapsed / state.duration,
    },

    actions: {
        timetravel(minutes) {
            this.duration += minutes * 1000 * 60
        },
    }
})

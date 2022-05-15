import { defineStore } from 'pinia';

export const useTheTimeStore = defineStore('thetime', {
    state: () => ({
        timer: {
            format:'HH:mm:ss',
            start: Date.now(),
            end: Date.now() + 10 * 1000,
            running: false,
            timer_id: null,
            duration: 10 * 1000,
            interval: 50,
            // update helper...
            now: Date.now(),
        },
        alarm: {
            running: false,
            remaining: 0,
            timer_id: null,
            duration: 5 * 1000,
            interval: 500,
        },
    }),

    getters: {
        // https://pinia.vuejs.org/core-concepts/getters.html
        remaining: (state) => state.timer.end - state.timer.now,
        elapsed: (state) => state.timer.now - state.timer.start,
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
            const elapsed = state.timer.now - state.timer.start
            // console.log(`elapsed:     ${elapsed}`);
            let result = 100 * elapsed / state.timer.duration
            // console.log(`result: ${result}`);
            // console.groupEnd();
            return result
        },
    },

    actions: {
    }
})

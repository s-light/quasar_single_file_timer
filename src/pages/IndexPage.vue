<template>
    <q-page class="flex flex-center content-stretch">
        <section  class="col-auto self-end qma-sm q-pt-xl">
            <q-input
                v-model="time_new"
                outlined
                type="time"
                step="1"
                pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
            />
            <q-btn label="start" outlined @click="countdown_start_with_time_new()"/>
            <ul>
                <li
                    v-for="item in duration_list"
                    :key="item"
                >
                    <q-btn
                        :label="item"
                        outlined
                        @click="countdown_start(convert_time_str_to_duration(item))"
                    />
                </li>
            </ul>
        </section>
        <section class="col flex flex-center">
            <q-circular-progress
                :value="thetime.elapsed_percentage"
                size="99vh"
                :thickness="1.0"
                :animation-speed="0"
                color="primary"
                track-color="secondary"
                show-value
                font-size="20vh"
                style="overflow:hidden;"
                instant-feedback
            >
                <!--
                :animation-speed="thetime.update_interval/2"
                    :color="color_active"
                    :track-color="color_inactive"
                    :thickness="0.1"
                    center-color="grey-8"
                -->
                <!-- {{thetime.remaining}} -->
                {{remaining_formated}}
            </q-circular-progress>
        </section>
    </q-page>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar, date } from 'quasar'
import { useTheTimeStore } from 'stores/thetime'
import bell_sound from 'assets/01__04__s-light__singing_bowl_-_single_strike_4.ogg'

export default defineComponent({
    name: 'IndexPage',
    setup () {
        const $q = useQuasar()

        const audio_bell = new Audio(bell_sound)
        // console.log(`audio_bell ${audio_bell}`);

        const thetime = useTheTimeStore()

        // countdown actions
        const countdown_stop = () => {
            // console.log("stop!");
            if (thetime.timer_id) {
                window.clearInterval(thetime.timer_id)
            }
            thetime.timer_id = null

            thetime.now = thetime.end + 1000
            thetime.running = false
        }

        const countdown_update = () => {
            thetime.now = Date.now();
            // console.log(`elapsed:   ${thetime.elapsed}`)
            // console.log(`remaining: ${thetime.remaining}`)
            if (thetime.remaining <= thetime.update_interval) {
                countdown_stop()
                alarm_start()
                // thetime.alarm_start()
            }
        }

        const countdown_start = (duration_ms=null) => {
            // console.log("countdown_start")
            countdown_stop()
            alarm_stop()
            if (duration_ms) {
                thetime.duration = duration_ms
            }
            // console.log(`duration_ms: ${duration_ms}`)
            // console.log(`thetime.duration: ${thetime.duration}`)
            thetime.start = Date.now()
            thetime.end = Date.now() + thetime.duration
            thetime.timer_id = window.setInterval(countdown_update, thetime.update_interval)
            thetime.running = true;
        }

        const time_new = ref("00:00:10");

        const convert_date_to_millis = (duration_date) => {
            let result = 0;
            // result += duration_date.getYear()    * 1000 * 60 * 60 * 24 * 12 * ?????
            // result += duration_date.getMonth()   * 1000 * 60 * 60 * 24 * 12
            // result += duration_date.getDate()    * 1000 * 60 * 60 * 24
            result += duration_date.getHours()   * 1000 * 60 * 60
            result += duration_date.getMinutes() * 1000 * 60
            result += duration_date.getSeconds() * 1000
            result += duration_date.getMilliseconds()
            return result
        }
        const convert_time_str_to_duration = (time_str) => {
            // console.group("convert_time_str_to_duration")
            // console.log(`time_str: ${time_str}`)
            let duration =  convert_date_to_millis(
                date.extractDate(time_str, 'HH:mm:ss')
            )
            // console.log(`duration: ${duration}`)
            // console.groupEnd()
            return duration
        }

        const countdown_start_with_time_new = () => {
            console.log(`time_new: ${time_new.value}`)
            let duration = convert_time_str_to_duration(time_new.value)
            console.log(`duration: ${duration}`)
            countdown_start(duration)
        }

        const time_formated = (duration) => {
            return date.formatDate(duration, 'HH:mm:ss')
            // return date.formatDate(thetime.remaining - (60*60*1000), 'HH:mm:ss.S')
        }

        const remaining_formated = computed(() => {
            // we have to substract a hour
            // i do not remember why exactly - just that i stumbled accross this before..
            // we also add 1 second - this way we count down to 0...
            return time_formated(thetime.remaining - (60*60*1000) + 1000)
        })



        // alarm
        const alarm_toggle_colors = () => {
            $q.dark.toggle()
        }

        const alarm_update = () => {
            // console.log("alarm_update")
            alarm_toggle_colors()
            thetime.alarm_running -= thetime.alarm_interval
            if (thetime.alarm_running <= 0) {
                alarm_stop()
            }
        }

        const alarm_start = () => {
            // console.log("alarm_start")
            alarm_stop()
            audio_bell.play()
            thetime.alarm_color_orig = $q.dark.isActive
            thetime.alarm_running = thetime.alarm_duration
            thetime.alarm_timer_id = window.setInterval(alarm_update, thetime.alarm_interval)
        }

        const alarm_stop = () => {
            // console.log("alarm_stop")
            if (thetime.alarm_timer_id) {
                window.clearInterval(thetime.alarm_timer_id)
                thetime.alarm_timer_id = null
                $q.dark.set(thetime.alarm_color_orig)
            }
            thetime.alarm_running = false
        }



        // ------------------------------------------
        // list
        let duration_list = ref([
            "00:00:05",
            "00:01:00",
            "00:05:00",
            "00:10:00",
            "00:15:00",
            "00:30:00",
        ])










        // ------------------------------------------
        // experiments

        // https://quasar.dev/quasar-plugins/addressbar-color
        // $q.addressbarColor.set('#a2e3fa')

        // dark mode
        // get status
        // console.log($q.dark.isActive) // true, false
        // get configured status
        // console.log($q.dark.mode) // "auto", true, false
        // set status
        $q.dark.set(true) // or false or "auto"
        // toggle
        // $q.dark.toggle()
        // $q.notify('Message')







        return {
            thetime,
            time_new,
            countdown_start,
            countdown_start_with_time_new,
            time_formated,
            convert_time_str_to_duration,
            remaining_formated,
            duration_list,
            // color_active: "primary",
            // color_inactive: "secondary",
        }
    },
})
</script>

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

        </section>
        <section class="col flex flex-center">
            <q-circular-progress
                :value="thetime.elapsed_percentage"
                size="99vh"
                :thickness="1.0"
                :animation-speed="thetime.update_interval/2"
                color="primary"
                track-color="secondary"
                show-value
                font-size="20vh"
                style="overflow:hidden;"
                instant-feedback
            >
                <!--
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

export default defineComponent({
    name: 'IndexPage',
    setup () {
        const $q = useQuasar()

        const thetime = useTheTimeStore()

        // countdown actions
        const countdown_stop = () => {
            // console.log("stop!");
            clearInterval(thetime.timer_id)

            thetime.now = thetime.end
            thetime.running = false
        }

        const countdown_update = () => {
            thetime.now = Date.now();
            // console.log(`elapsed:   ${thetime.elapsed}`)
            // console.log(`remaining: ${thetime.remaining}`)
            if (thetime.remaining <= thetime.update_interval) {
                countdown_stop()
                alarm_start()
            }
        }

        const countdown_start = (duration_ms=null) => {
            if (duration_ms) {
                thetime.duration = duration_ms
            }
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
        const countdown_start_with_time_new = () => {
            console.log(`time_new: ${time_new.value}`)
            let duration = convert_date_to_millis(
                date.extractDate(time_new.value, 'HH:mm:ss')
            )
            console.log(`duration: ${duration}`)
            countdown_start(duration)
        }

        const remaining_formated = computed(() => {
            // we have to substract a hour
            // i do not remember why exactly - just that i stumbled accross this before..
            return date.formatDate(thetime.remaining - (60*60*1000), 'HH:mm:ss.S')
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
            thetime.alarm_color_orig = $q.dark.isActive
            thetime.alarm_running = thetime.alarm_duration
            thetime.alarm_timer_id = window.setInterval(alarm_update, thetime.alarm_interval)
        }

        const alarm_stop = () => {
            // console.log("alarm_stop")
            window.clearInterval(thetime.alarm_timer_id)
            $q.dark.set(thetime.alarm_color_orig)
            thetime.alarm_running = false
        }


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
            remaining_formated,
            countdown_start,
            countdown_start_with_time_new,
            // color_active: "primary",
            // color_inactive: "secondary",
        }
    },
})
</script>

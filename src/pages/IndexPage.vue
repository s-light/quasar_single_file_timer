<template>
    <q-page class="flex flex-center">
        Countdown
        <q-circular-progress
            :value="value"
            size="8 0vh"
            :thickness="1"
            color="orange"
            track-color="grey-3"
            center-color="grey-8"

            show-value
            font-size="20vh"
        >
            <h1>{{time_remaining}}</h1>
            {{ value }}%
        </q-circular-progress>
    </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
    name: 'IndexPage',
    setup () {
        const $q = useQuasar()

        // https://quasar.dev/quasar-plugins/addressbar-color
        $q.addressbarColor.set('#a2e3fa')

        // dark mode
        // get status
          console.log($q.dark.isActive) // true, false

          // get configured status
          console.log($q.dark.mode) // "auto", true, false

          // set status
          $q.dark.set(true) // or false or "auto"

          // toggle
          // $q.dark.toggle()
          $q.notify('Message')

        return {
            value: 71,
        }
    }
})
</script>

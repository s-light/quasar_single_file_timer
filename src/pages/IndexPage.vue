<template>
    <q-page class="flex flex-center content-stretch">
        <timer-control
            class="col-auto self-end qma-sm q-pt-xl"
            :thetime="thetime"
        />
        <timer-display
            class="col"
            :thetime="thetime"
        />
    </q-page>
</template>

<script setup>
// import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { useTheTimeStore } from 'stores/thetime'

import TimerControl from 'components/TimerControl'
import TimerDisplay from 'components/TimerDisplay'

const thetime = useTheTimeStore()


// ------------------------------------------
// experiments
const $q = useQuasar()

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

</script>

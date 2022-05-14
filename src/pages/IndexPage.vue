<template>
    <q-page class="flex flex-center">
        Countdown
        <q-circular-progress
            :value="value"
            size="90vh"
            :thickness="1"
            color="orange"
            track-color="grey-3"
            center-color="grey-8"
            class="q-ma-md"
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

export default defineComponent({
    name: 'IndexPage',
    setup () {
        return {
            value: 71,
        }
    }
})
</script>

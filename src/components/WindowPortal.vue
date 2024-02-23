<template>
    <div v-if="open" ref="root">
        <slot />
    </div>
</template>

<script setup>
// based on
// https://stackoverflow.com/questions/49657462/open-a-vuejs-component-on-a-new-window

import {
    ref, toRef, unref,
    computed, watch, watchEffect,
    onMounted, onBeforeUnmount
} from 'vue'

const emit = defineEmits([
    'close',
])
const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    }
})

const root = ref(null)
let windowRef = null

// watch(
//     () => props.open,
//     (newOpen, oldOpen) => {
//         if(newOpen) {
//             this.openPortal();
//         } else {
//             this.closePortal();
//         }
//     }
// )


const openPortal = () => {
    console.log("openPortal", windowRef);
    if(windowRef == null) {
        windowRef = window.open("", "", "width=400,height=500,left=200,top=200");
        console.log("windowRef", windowRef);
        windowRef.addEventListener('beforeunload', closePortal);
        // magic!
        windowRef.document.body.appendChild(root.value);
    }
}

const closePortal = () => {
    console.log("closePortal", windowRef);
    if(windowRef) {
        console.log("closePortal");
        windowRef.close();
        windowRef = null;
        emit('close');
    }
}

const pagehideEventHandler = (event) => {
    console.log("pagehide");
    if (windowRef) {
        closePortal();
    }
}


watchEffect(() => {
    if(props.open) {
        openPortal();
    } else {
        closePortal();
    }
})

onMounted(() => {
    console.log("props.open", props.open);
    if(props.open) {
        openPortal();
    }
    // window.addEventListener("beforeunload", (event) => {
    //     // this.closePortal();
    //     https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type
    //     var perfEntries = performance.getEntriesByType("navigation")
    // })
    addEventListener('pagehide', pagehideEventHandler)
})

onBeforeUnmount(() => {
    console.log("beforeUnmount");
    if (windowRef) {
        closePortal();
    }
    removeEventListener('pagehide', pagehideEventHandler)
})
</script>

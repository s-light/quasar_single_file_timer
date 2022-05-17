<template>
    <div v-if="open">
        <slot />
    </div>
</template>

<script>
// based on
// https://stackoverflow.com/questions/49657462/open-a-vuejs-component-on-a-new-window
export default {
    name: 'WindowPortal',
    props: {
        open: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            windowRef: null,
        }
    },
    watch: {
        open(newOpen) {
            if(newOpen) {
                this.openPortal();
            } else {
                this.closePortal();
            }
        }
    },
    methods: {
        openPortal() {
            this.windowRef = window.open("", "", "width=400,height=500,left=200,top=200");
            this.windowRef.addEventListener('beforeunload', this.closePortal);
            // magic!
            this.windowRef.document.body.appendChild(this.$el);
        },
        closePortal() {
            if(this.windowRef) {
                console.log("closePortal");
                this.windowRef.close();
                this.windowRef = null;
                this.$emit('close');
            }
        },
        pagehideEvent(event) {
            console.log("pagehide");
            if (this.windowRef) {
                this.closePortal();
            }
        }
    },
    mounted() {
        if(this.open) {
            this.openPortal();
        }
        // window.addEventListener("beforeunload", (event) => {
        //     // this.closePortal();
        //     https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming/type
        //     var perfEntries = performance.getEntriesByType("navigation")
        // })
        addEventListener('pagehide', this.pagehideEvent)
    },
    beforeUnmount() {
        console.log("beforeUnmount");
        if (this.windowRef) {
            this.closePortal();
        }
        removeEventListener('pagehide', this.pagehideEvent)
    },
}
</script>

<template>
    <div ref="root" class="window-portal-container">
        <div v-show="open" class="window-portal"  ref="slotchild">
            <slot />
        </div>
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
        },
        windowName: {
            type: String,
            default: "",
        },
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
            console.group("openPortal");
            if(this.windowRef == null || this.windowRef.closed) {
                console.log("create new window");
                console.log("this.$refs", this.$refs);
                this.windowRef = window.open(
                    // url
                    "",
                    // name
                    this.windowName,
                    // options
                    "popup,width=300,height=700,left=200,top=200"
                );
                this.windowRef.addEventListener('beforeunload', this.closePortal);
                // magic!
                console.log("attach 'slotchild' to new window");
                this.windowRef.document.body.appendChild(this.$refs.slotchild);
                this.copyStyles()
            } else {
                this.windowRef.focus();
            }
            console.groupEnd()
        },
        closePortal() {
            console.group("closePortal");
            if(this.windowRef != null && this.windowRef.closed == false) {
                console.log("reattach 'slotchild' to main window");
                this.$refs.root.appendChild(this.$refs.slotchild);
                console.log("closing..");
                this.windowRef.close();
                this.windowRef = null;
                this.$emit('close');
            } else {
                console.log("no window availabe for closing.");
            }
            console.groupEnd();
        },
        pagehideEvent(event) {
            console.log("pagehide");
            this.closePortal();
        },
        copyStyles() {
            console.log("copyStyles...");
            // prepare styleSheets
            // for (const sheet of document.styleSheets) {
            const origSheets = document.styleSheets
            let rulesTotal = 0
            const portalSheets = this.windowRef.document.styleSheets
            for (let i = 0; i < origSheets.length; i++) {
                const origSheet = origSheets[i];
                // create new empty sheet...
                const styleEl = document.createElement('style')
                styleEl.type = 'text/css'
                this.windowRef.document.head.appendChild(styleEl)
                // copy styles over..
                // const portalSheet = portalSheets[i];
                const portalSheet = styleEl.sheet;
                // console.log("origSheet", origSheet);
                // console.log("portalSheet", portalSheet);
                for (const rule of origSheet.rules) {
                    // console.log("rule", rule);
                    portalSheet.insertRule(rule.cssText)
                    rulesTotal++
                }
                // console.log("portalSheet", portalSheet);
            }
            console.log(
                `copied ${portalSheets.length} sheets with total of ${rulesTotal} rules`
            )
            // copy styles from body
            for (const item of document.body.classList) {
                this.windowRef.document.body.classList.add(item)
            }
            // copy styles from body
            // for (const item of document.body.classList) {
            //     this.windowRef.document.body.classList.add(item)
            // }
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
        this.closePortal();
        removeEventListener('pagehide', this.pagehideEvent)
    },
}
</script>

<style media="screen">
.window-portal-container {
    display: none;
}

.window-portal {
    width: 100%;
    height: 100%;
}
</style>

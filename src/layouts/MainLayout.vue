<template>
    <q-layout view="lHh Lpr lFf">
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
            class="fixed-top q-ma-sm"
            style="z-index: 10000"
        >
        </q-btn>
        <!--
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        overlay
        -->
        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
            elevated
            persistent
        >
            <q-list class="q-pt-xl">
                <EssentialNavigation/>

                <q-item>
                    <q-item-section>
                        <timer-control
                        />
                        <!--
                        :thetime="thetime"
                        -->
                        <window-portal
                            :open="windowPortalOpen"
                            @close="windowPortalOpen=false"
                            style="font-size:1.5em;"
                            class="q-dark q-pt-xl"
                        >
                            <timer-control/>
                        </window-portal>
                        <q-toggle
                            v-model="windowPortalOpen"
                            label="control window"
                        />
                    </q-item-section>
                </q-item>

                <q-item-label
                    header
                    class="fixed-bottom"
                >
                    {{ appinfo.productName }} v{{ appinfo.version }}
                    <br>
                    Quasar v{{ $q.version }}
                </q-item-label>
            </q-list>
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import packageInfo from '../../package.json'
// we do not import the package.json as this could be a security concern.
import appinfo from '../../appinfo.json'

import EssentialNavigation from 'components/EssentialNavigation.vue'

// import WindowPortal from 'components/WindowPortal'
import WindowPortal from 'components/WindowPortal_OptionsAPI'

// import { useTheTimeStore } from 'stores/thetime'
import TimerControl from 'components/TimerControl'

export default defineComponent({
    name: 'MainLayout',
    components: {
        EssentialNavigation,
        TimerControl,
        WindowPortal,
    },
    setup () {
        // const thetime = useTheTimeStore()
        const leftDrawerOpen = ref(false)
        console.log(`leftDrawerOpen: ${leftDrawerOpen.value}`);

        const windowPortalOpen = ref(false)

        return {
            // essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
                console.log(`leftDrawerOpen: ${leftDrawerOpen.value}`);
            },
            // miniState: ref(true),
            // thetime,
            appinfo,
            windowPortalOpen,
        }
    },
    // data () {
    //     return {
    //     }
    // },
})
</script>

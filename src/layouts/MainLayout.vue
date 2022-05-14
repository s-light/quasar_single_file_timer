<template>
    <q-layout view="lHh Lpr lFf">
        <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
            class="fixed-top"
            style="z-index: 10000"
        />
        <!-- <q-header elevated>
            <q-toolbar>
                <q-btn
                    flat
                    dense
                    round
                    icon="menu"
                    aria-label="Menu"
                    @click="toggleLeftDrawer"
                />

                <q-toolbar-title>
                    GoalDetectionMini
                </q-toolbar-title>

                <div>Quasar v{{ $q.version }}</div>
            </q-toolbar>
        </q-header> -->

        <q-drawer
            v-model="leftDrawerOpen"
            show-if-above
            bordered
        >
            <q-list>
                <q-item-label header class="q-mt-lg">
                    {{ appinfo.productName }}
                </q-item-label>
                <EssentialNavigation/>
                <q-item-label
                    class="absolute-bottom"
                >
                    Quasar v{{ $q.version }}
                    App v{{ appinfo.version }}
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

export default defineComponent({
    name: 'MainLayout',

    components: {
        EssentialNavigation
    },
    setup () {
        const leftDrawerOpen = ref(false)

        return {
            // essentialLinks: linksList,
            leftDrawerOpen,
            toggleLeftDrawer () {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }
        }
    },
    data () {
        return {
            appinfo: appinfo
        }
    },
})
</script>

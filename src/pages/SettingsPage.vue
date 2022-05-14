<template>
    <q-page
        class="flex column"
        style="align-items: center;"
    >
        <section>
            <h4>{{ appinfo.productName }}</h4>
        </section>
    </q-page>
</template>

<style lang="stylus">
</style>

<script>
// import packageInfo from '../../package.json'
// we do not import the package.json as this could be a security concern.
import appinfo from '../../appinfo.json'

export default {
    name: 'SettingsPage',
    data () {
        return {
            appinfo: appinfo
        }
    }
}
</script>

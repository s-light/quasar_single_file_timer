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

export default {
    name: 'SettingsPage',
    data () {
        return {
            appinfo: process.env.appinfo,
        }
    }
}
</script>

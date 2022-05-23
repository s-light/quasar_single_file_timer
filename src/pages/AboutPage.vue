<template>
    <q-page
        class="flex column"
        style="align-items: center;"
    >
        <section>
            tests:
            <!-- {{process.env.mytest}}
            {{process.env.VUE_APP_VERSION}}
            {{process.env}} -->
        </section>
        <section>
            <h4>{{ appinfo.productName }}</h4>
            <p>
                version: v{{ appinfo.version }}
            </p>
            <p>
                {{ appinfo.description }}<br>
                find the project repository at <br>
                <a
                    target="_blank"
                    :href="appinfo.projectUrl"
                >
                    {{ appinfo.projectUrl }}
                </a>
            </p>
            <p>
                a live preview version is hosted at<br>
                <a
                    target="_blank"
                    :href="appinfo.previewUrl"
                >
                    {{ appinfo.previewUrl }}
                </a>
            </p>
        </section>
        <!-- <section>
            <h4>How it Works</h4>
        </section> -->
    </q-page>
</template>

<style lang="stylus">
</style>

<script>

export default {
    name: 'AboutPage',
    data () {
        // https://quasar.dev/quasar-cli-webpack/handling-process-env#caveats
        // console.log(process.env.TEST)
        return {
            appinfo: process.env.appinfo,
        }
    }
}
</script>

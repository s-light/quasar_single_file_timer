/* eslint-env node */

/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 */

const packageInfo = require("./package.json");

const { configure } = require("quasar/wrappers");

const { viteSingleFile } = require("vite-plugin-singlefile")

module.exports = configure(function (ctx) {
    return {
        eslint: {
            // fix: true,
            // include: [],
            // exclude: [],
            // rawOptions: {},
            warnings: true,
            errors: true,
        },

        // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
        // preFetch: true,

        // app boot file (/src/boot)
        // --> boot files are part of "main.js"
        // https://v2.quasar.dev/quasar-cli-vite/boot-files
        boot: ["addressbar-color"],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#css
        css: ["app.scss"],

        // https://github.com/quasarframework/quasar/tree/dev/extras
        extras: [
            // 'ionicons-v4',
            // 'mdi-v7',
            // 'fontawesome-v6',
            // 'eva-icons',
            // 'themify',
            // 'line-awesome',
            // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

            "roboto-font", // optional, you are not bound to it
            "material-icons", // optional, you are not bound to it
        ],

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#build
        build: {
            target: {
                browser: ["es2019", "edge88", "firefox78", "chrome87", "safari13.1"],
                node: "node20",
            },

            vueRouterMode: "hash", // available values: 'hash', 'history'
            // vueRouterBase,
            // vueDevtools,
            // vueOptionsAPI: false,

            // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup

            // publicPath: '/',
            // analyze: true,
            env: {
                //https://forum.quasar-framework.org/topic/6853/auto-generate-a-build-number-in-spa/15?_=1653270667151
                // https://quasar.dev/quasar-cli-webpack/handling-process-env#caveats
                appinfo: {
                    name: packageInfo.name,
                    version: packageInfo.version,
                    productName: packageInfo.productName,
                    description: packageInfo.description,
                    projectUrl: packageInfo.projectUrl,
                    previewUrl: packageInfo.previewUrl,
                },
            },
            // rawDefine: {}
            // ignorePublicFolder: true,
            minify: false,
            // polyfillModulePreload: true,
            // distDir

            // extendViteConf (viteConf) {},
            // viteVuePluginOptions: {},

            vitePlugins: [
                //   [ 'package-name', { ..options.. } ]
                [viteSingleFile()],
            ],
        },

        // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#devServer
        devServer: {
            https: true,
            port: 8080,
            open: false, // opens browser window automatically
        },

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#framework
        framework: {
            config: {
                notify: {
                    // https://quasar.dev/quasar-plugins/notify
                },
            },

            // iconSet: 'material-icons', // Quasar icon set
            // lang: 'en-US', // Quasar language pack

            // For special cases outside of where the auto-import strategy can have an impact
            // (like functional components as one of the examples),
            // you can manually specify Quasar components/directives to be available everywhere:
            //
            // components: [],
            // directives: [],

            // Quasar plugins
            plugins: [
                "AddressbarColor",
                "AppFullscreen",
                "LocalStorage",
                "SessionStorage",
                "Notify",
            ],
        },

        // animations: 'all', // --- includes all animations
        // https://v2.quasar.dev/options/animations
        animations: [],

        // https://v2.quasar.dev/quasar-cli-vite/quasar-config-js#property-sourcefiles
        // sourceFiles: {
        //   rootComponent: 'src/App.vue',
        //   router: 'src/router/index',
        //   store: 'src/store/index',
        //   registerServiceWorker: 'src-pwa/register-service-worker',
        //   serviceWorker: 'src-pwa/custom-service-worker',
        //   pwaManifestFile: 'src-pwa/manifest.json',
        //   electronMain: 'src-electron/electron-main',
        //   electronPreload: 'src-electron/electron-preload'
        // },

        // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
        pwa: {
            workboxMode: "generateSW", // or 'injectManifest'
            injectPwaMetaTags: true,
            swFilename: "sw.js",
            manifestFilename: "manifest.json",
            useCredentialsForManifestTag: false,
            // useFilenameHashes: true,
            // extendGenerateSWOptions (cfg) {}
            // extendInjectManifestOptions (cfg) {},
            // extendManifestJson (json) {}
            // extendPWACustomSWConf (esbuildConf) {}
        },
    };
});

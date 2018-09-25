const webpack = require("webpack");

module.exports = {
    env: {
        apiCall: "http://localhost:8080"
    },
    router: {
        middleware: "check-auth"
    },
    /*
    ** Headers of the page
    */
    head: {
        title: "sample-project",
        meta: [
            { charset: "utf-8" },
            { name: "viewport", content: "width=device-width, initial-scale=1" },
            { hid: "description", name: "description", content: "Nuxt.js project" }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
    },
    modules: [["@nuxtjs/axios"]],
    axios: {
        baseURL: "http://localhost:8080"
    },
    /*
    ** Customize the progress bar color
    */
    loading: { color: "#3B8070" },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** Run ESLint on save
        */
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });
            }
        },
        vendor: ["jquery", "bootstrap"],
        plugins: [
            // set shortcuts as global for bootstrap
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            })
        ]
    },
    mode: "spa",
    // include bootstrap css
    css: ["bootstrap/dist/css/bootstrap.css"],
    plugins: ["~plugins/bootstrap.js", "~/plugins/vue-fillter.js"]
};

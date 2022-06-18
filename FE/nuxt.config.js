import dotenv from "dotenv";
dotenv.config();

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "PhongTroVinh",
    htmlAttrs: {
      lang: "en",
    },
    env: {
      apiUrl: process.env.API_URL || "http://localhost:3008/api",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        integrity:
          "sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
      },
    ],
  },

  //  Server
  server: {
    port: "3003",
    // host: '0.0.0.0',
    timing: false,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "ant-design-vue/dist/antd.css",
    // CSS file in the project
    // '@/assets/css/styles.css',
    // SCSS file in the project
    "@/assets/scss/styles.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/antd-ui",
    { src: "./plugins/vue-notification.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/style-resources"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  styleResources: {
    scss: ["~assets/scss/_mixins.scss", "~assets/scss/_variables.scss"],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
  },
};

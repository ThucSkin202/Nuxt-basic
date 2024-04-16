export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    'nuxt-icon',
    ['@pinia/nuxt', {
      autoImports: ['defineStore']
    }]
  ],
  imports: {
    dirs: ['./store']
  },


  // runtimeConfig: {
  //   MONGO_URI: process.env.MONGO_URI,
  // },
  // nitro: {
  //   plugins: ["@/server/db/index.ts"],
  // },



  app: {
    head: {
      title: "Nuxt dojo",
      meta: [{ name: "title", content: "Nuxt 3" }],
      link: [
        {
          rel: "stylesheet",
          href: "http://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    },
  },
});

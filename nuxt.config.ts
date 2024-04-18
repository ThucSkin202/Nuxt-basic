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


  app: {
    head: {
      title: "Nuxt basic",
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

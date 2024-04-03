// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["nuxt-icon"],
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

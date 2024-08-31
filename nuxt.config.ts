// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  devServer: {
    port: 3001,
  },
  tailwindcss: {
    config: {
      content: ["./src/**/*.vue"],
    },
  },
});

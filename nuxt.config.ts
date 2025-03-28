// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Markwhen",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap&display=swap",
          rel: "stylesheet",
        },
      ],
      script: [
        {
          defer: true,
          src: "https://static.cloudflareinsights.com/beacon.min.js",
          "data-cf-beacon": '{"token": "1422b56abdfb49a88de13b0e2edc2805"}',
        },
        {
          defer: true,
          src: "https://embed.remark.ing/static/embed.js",
        },
      ],
    },
  },
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

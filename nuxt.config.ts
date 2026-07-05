export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: true,
  css: ['~/assets/css/global.css'],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&display=swap' },
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-8XEKRPCS27', async: true },
        { innerHTML: "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-8XEKRPCS27');" },
      ],
    },
  },
  runtimeConfig: {
    korylaApiKey: '',            // NUXT_KORYLA_API_KEY
    korylaApiUrl: '',            // NUXT_KORYLA_API_URL
    korylaSDKExperimentId: '',   // NUXT_KORYLA_S_D_K_EXPERIMENT_ID — experiment for /demo-sdk
  },
})

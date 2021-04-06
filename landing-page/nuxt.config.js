export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Adopte un vaccin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Adopteunvaccin.fr est une initiative permettant au personnel de santé de lister les patients volontaires et disponibles pour se faire vacciner'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { 
      src: 'vue-select/dist/vue-select.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/gmap-vue' },
    { src: '~/plugins/vue-select' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/axios'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-svg-loader',
  ],
  purgeCSS: {
     // whitelist: ['hidden'],
    // whitelistPatterns: [/md:w-[1-6]/]
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^vue2-google-maps($|\/)/, /^vue-select($|\/)/],
    extend(config, ctx) {

      loaders: {
        file: {
          esModule: false
        }
      }
    }
  },
  env: {
    apiUrl: process.env.API_URL,
    gmapsKey: process.env.GMAPS_KEY
  }
}

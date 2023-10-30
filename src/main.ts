import { createApp } from 'vue'
//Pinia
import pinia from '@/pinia-provider'

//recaptcha
import { VueReCaptcha } from 'vue-recaptcha-v3'

//I18n from ./i18n.ts
import i18n from '@/i18n'

//axios
import '@/axios'

//vue toastify
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'

//google Oauth
import vue3GoogleLogin from 'vue3-google-login'

const vuetify = createVuetify({
  components
})

import App from './App.vue'
import router from './router'

import { themeStore } from '@/pinia-provider'


const app = createApp(App)
VueReCaptcha.install(app, {
  siteKey: import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY,
  loaderOptions: {
    useRecaptchaNet: true,
    autoHideBadge: true
  }
})
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_APP_GOOGLE_OAUTH_CLIENT_ID,
})
app.use(pinia)
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: themeStore.isLight ? 'light' : 'dark'
} as ToastContainerOptions)
app.use(i18n)
app.use(vuetify)
app.use(router)

app.mount('#app')

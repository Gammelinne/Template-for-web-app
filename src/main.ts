import { createApp } from 'vue'
//Pinia
import pinia from '@/pinia-provider'

//I18n from ./i18n.ts
import i18n from '@/i18n'

//axios
import '@/axios'

//vue toastify
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css';

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import '@mdi/font/css/materialdesignicons.css'
const vuetify = createVuetify({
  components
})

import App from './App.vue'
import router from './router'

import { themeStore } from '@/pinia-provider'

const app = createApp(App)
app.use(pinia)
app.use(Vue3Toastify, {
  autoClose: 3000,
  theme: themeStore.isLight ? 'light' : 'dark'
} as ToastContainerOptions)
app.use(i18n)
app.use(vuetify)
app.use(router)

app.mount('#app')

import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
  })

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(i18n)
app.use(vuetify)
app.use(createPinia())
app.use(router)

app.mount('#app')

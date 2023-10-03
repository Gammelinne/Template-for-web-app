import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

//I18n from ./i18n.ts
import i18n from './i18n';

//Vuetify
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

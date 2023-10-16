import { createApp } from 'vue'

//Pinia
import piniaProvider from './pinia-provider';

//I18n from ./i18n.ts
import i18n from './i18n'

//Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

import App from './App.vue'
import router from './router'

const app = createApp(App)
piniaProvider(app)
app.use(i18n)
app.use(vuetify)
app.use(router)

app.mount('#app')

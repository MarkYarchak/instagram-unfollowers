import 'vuetify/styles'
import './assets/main.css'

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router'

import App from './App.vue'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app
  .use(router)
  .use(vuetify)

app.mount('#app')

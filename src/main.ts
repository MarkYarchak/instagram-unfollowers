import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import vuetify from '@/plugins/vuetify'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app
  .use(pinia)
  .use(router)
  .use(vuetify)

app.mount('#app')

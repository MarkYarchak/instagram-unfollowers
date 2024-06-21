import './assets/main.css'

import { createApp } from 'vue'
import router from './router'
import vuetify from '@/plugins/vuetify';
import { initAnalytics } from '@/plugins/analytics';

import App from './App.vue'

initAnalytics()

const app = createApp(App)

app
  .use(router)
  .use(vuetify)

app.mount('#app')

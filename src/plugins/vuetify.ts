import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { useThemeStorage } from '@/composables/application-theme';

const themeStorage = useThemeStorage();

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: themeStorage.get(),
  }
})

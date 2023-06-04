import '@/assets/styles/main.scss'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import VuePapaParse from 'vue-papa-parse'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

const app = createApp(App)

app.use(vuetify)
app.use(VuePapaParse)
app.use(createPinia())

app.mount('#app')

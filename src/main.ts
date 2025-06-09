import './assets/css/main.scss'

import { createApp } from 'vue'
import Router from '@/shared/router'
import App from './App.vue'

const app = createApp(App)

app.use(Router)

export const appExport = app.mount('#app')

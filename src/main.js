import { createApp } from 'vue'
import App from '@/App.vue'
import '@/config/vee-validate/rules/rules.js'
import '@/index.css'

import router from '@/router'
import store from '@/store'

const app = createApp(App)

app.use(router).use(store).mount('#app')

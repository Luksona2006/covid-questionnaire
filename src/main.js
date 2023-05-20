import { createApp } from 'vue'
import App from '@/App.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheContainer from '@/components/TheContainer.vue'
import TheImageContainer from '@/components/TheImageContainer.vue'
import NavigationButtons from '@/components/form/NavigationButtons.vue'

import '@/config/vee-validate/rules/rules.js'
import '@/index.css'

import router from '@/router'
import store from '@/store'

const app = createApp(App)

app.component('the-header', TheHeader)
app.component('the-container', TheContainer)
app.component('the-image-container', TheImageContainer)
app.component('navigation-buttons', NavigationButtons)

app.use(router).use(store).mount('#app')

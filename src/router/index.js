import { createWebHistory, createRouter } from 'vue-router'
import Begin from '../pages/Begin.vue'
import FirstQuestionarie from '../pages/FirstQuestionarie.vue'
const routes = [
  {
    path: '/',
    name: 'begin',
    component: Begin
  },
  {
    path: '/first-questionaire',
    name: 'first-questionaire',
    component: FirstQuestionarie
  },
  {
    path: '/second-questionaire',
    name: 'second-questionaire',
    component: Begin // For test purposes
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

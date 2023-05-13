import { createWebHistory, createRouter } from 'vue-router'
import Begin from '../pages/Begin.vue'
import FirstQuestionarie from '../pages/FirstQuestionaire.vue'
import SecondQuestionaire from '../pages/SecondQuestionaire.vue'
import ThirdQuestionaire from '../pages/ThirdQuestionaire.vue'
import FourthQuestionaire from '../pages/FourthQuestionaire.vue'

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
    component: SecondQuestionaire
  },
  {
    path: '/third-questionaire',
    name: 'third-questionaire',
    component: ThirdQuestionaire
  },
  {
    path: '/fourth-questionaire',
    name: 'fourth-questionaire',
    component: FourthQuestionaire
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

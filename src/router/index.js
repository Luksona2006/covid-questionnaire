import { createWebHistory, createRouter } from 'vue-router'
import BeginPage from '@/pages/BeginPage.vue'
import FirstQuestionnarie from '@/pages/FirstQuestionnaire.vue'
import SecondQuestionnaire from '@/pages/SecondQuestionnaire.vue'
import ThirdQuestionnaire from '@/pages/ThirdQuestionnaire.vue'
import FourthQuestionnaire from '@/pages/FourthQuestionnaire.vue'
import ThanksPage from '@/pages/ThanksPage.vue'

const routes = [
  {
    path: '/',
    name: 'begin',
    component: BeginPage
  },
  {
    path: '/first-questionaire',
    name: 'first-questionaire',
    component: FirstQuestionnarie
  },
  {
    path: '/second-questionaire',
    name: 'second-questionaire',
    component: SecondQuestionnaire
  },
  {
    path: '/third-questionaire',
    name: 'third-questionaire',
    component: ThirdQuestionnaire
  },
  {
    path: '/fourth-questionaire',
    name: 'fourth-questionaire',
    component: FourthQuestionnaire
  },
  {
    path: '/thanks',
    name: 'thanks',
    component: ThanksPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: '',
      surname: '',
      email: '',
      had_covid: '',
      had_antibody_test: '',
      test_date: '',
      covid_date: '',
      number: '',
      had_vaccine: '',
      vaccination_stage: '',
      non_formal_meetings: '',
      number_of_days_from_office: '',
      what_about_meetings_in_live: '',
      tell_us_your_opinion_about_us: ''
    }
  },
  mutations: {
    changeValue(state, payload) {
      state[payload.stateKey] = payload.value
    }
  }
})

export default store

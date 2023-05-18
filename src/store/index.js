import { createStore } from 'vuex'

const localStorageData = JSON.parse(localStorage.getItem('data'))

const store = createStore({
  state() {
    return {
      first_name: localStorageData?.['first_name'] ?? '',
      last_name: localStorageData?.['last_name'] ?? '',
      email: localStorageData?.['email'] ?? '',
      had_covid: localStorageData?.['had_covid'] ?? '',
      had_antibody_test:
        localStorageData && localStorageData['had_antibody_test'] !== ''
          ? localStorageData['had_antibody_test'] === 'true'
          : '',
      covid_sickness_date: localStorageData?.['covid_sickness_date'] ?? '',
      test_date: localStorageData?.['test_date'] ?? '',
      number:
        localStorageData && localStorageData['number'] !== '' ? +localStorageData['number'] : '',
      had_vaccine:
        localStorageData && localStorageData['had_vaccine'] !== ''
          ? localStorageData['had_vaccine'] === 'true'
          : '',
      vaccination_stage: localStorageData?.['vaccination_stage'] ?? '',
      i_am_waiting: localStorageData?.['i_am_waiting'] ?? '',
      non_formal_meetings: localStorageData?.['non_formal_meetings'] ?? '',
      number_of_days_from_office: +localStorageData?.['number_of_days_from_office'] ?? '',
      what_about_meetings_in_live: localStorageData?.['what_about_meetings_in_live'] ?? '',
      tell_us_your_opinion_about_us: localStorageData?.['tell_us_your_opinion_about_us'] ?? ''
    }
  },
  mutations: {
    changeValue(state, payload) {
      const localStorageData = JSON.parse(localStorage.getItem('data'))
      localStorageData[payload.stateKey] = payload.value
      localStorage.setItem('data', JSON.stringify(localStorageData))

      state[payload.stateKey] = localStorageData[payload.stateKey]
      if (
        localStorageData[payload.stateKey] === 'true' ||
        localStorageData[payload.stateKey] === 'false'
      ) {
        state[payload.stateKey] = localStorageData[payload.stateKey] === 'true'
      }
      if (/^\d+$/.test(localStorageData[payload.stateKey]))
        state[payload.stateKey] = +localStorageData[payload.stateKey]
    }
  }
})

export default store

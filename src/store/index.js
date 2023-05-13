import { createStore } from 'vuex'

const localStorageData = JSON.parse(localStorage.getItem('data'))

const store = createStore({
  state() {
    return {
      first_name: localStorageData ? localStorageData['first_name'] : '',
      last_name: localStorageData ? localStorageData['last_name'] : '',
      email: localStorageData ? localStorageData['email'] : '',
      had_covid: localStorageData ? localStorageData['had_covid'] : '',
      had_antibody_test:
        localStorageData['had_covid'] !== 'no' && localStorageData['had_covid'] !== ''
          ? localStorageData['had_antibody_test'] === 'true'
          : '',
      test_date: localStorageData ? localStorageData['test_date'] : '',
      covid_date: localStorageData ? localStorageData['covid_date'] : '',
      number: localStorageData ? localStorageData['number'] : '',
      had_vaccine: localStorageData
        ? localStorageData['had_vaccine'] === 'true' && localStorageData['had_vaccine'] !== ''
        : '',
      vaccination_stage: localStorageData ? localStorageData['vaccination_stage'] : '',
      non_formal_meetings: localStorageData ? localStorageData['non_formal_meetings'] : '',
      number_of_days_from_office: localStorageData
        ? +localStorageData['number_of_days_from_office']
        : '',
      what_about_meetings_in_live: localStorageData
        ? localStorageData['what_about_meetings_in_live']
        : '',
      tell_us_your_opinion_about_us: localStorageData
        ? localStorageData['tell_us_your_opinion_about_us']
        : ''
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

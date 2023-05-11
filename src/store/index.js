import { createStore } from 'vuex'

const store = createStore({
  state() {
    return {
      name: '',
      surname: '',
      email: ''
    }
  },
  mutations: {
    changeValue(state, payload) {
      state[payload.stateKey] = payload.value
    }
  }
})

export default store

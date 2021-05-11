const state = {
  name: '',
}

const getters = {
  getName(state) {
    return state.name
  },
}

const mutations = {
  setName(state, payload) {
    state.name = payload
  },
  clearState(state) {
    state.name = ''
  },
}

const actions = {
  logoutUser({ commit }) {
    commit('clearState')
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}

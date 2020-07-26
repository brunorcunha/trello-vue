const state = {
  theme: 'light'
}

const getters = {
  theme: state => state.theme
}

const mutations = {
  setTheme: (state, theme) => { state.theme = theme },
  init: (state, store) => { state = Object.assign(state, store) }
}

const actions = {
  setTheme ({ commit }, theme) {
    commit('setTheme', theme)
  },
  init ({ commit }) {
    const LSStore = localStorage.getItem('store')
    if (LSStore) commit('init', JSON.parse(LSStore))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

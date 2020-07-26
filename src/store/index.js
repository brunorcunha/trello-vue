import Vue from 'vue'
import Vuex from 'vuex'

import configs from './modules/configs'
import todos from './modules/todos'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    configs,
    todos
  }
})

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state.configs))
})

export default store

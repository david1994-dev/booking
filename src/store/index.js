import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
// import * as getters from './getters'
// import modules from './modules'
import mutations from './mutations'

Vue.use(Vuex)

const state = {
  showMessage: true,
  messageTime: null,
  message: {
    type: 'error',
    message: ''
  },
  preloadData: {}
}

export default new Vuex.Store({
  state,
  actions,
  // getters,
  mutations,
  // modules,
  strict: process.env.NODE_ENV !== 'production'
})

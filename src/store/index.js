import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexLoader } from 'vuex-loading'
import * as actions from './actions'
// import * as getters from './getters'
import modules from './modules'
import mutations from './mutations'
import store from 'store2'

const VuexLoading = createVuexLoader({
  // The Vuex module name, 'loading' by default.
  moduleName: 'loading'
})

Vue.use(Vuex)
Vue.use(VuexLoading)

const state = {
  showMessage: true,
  messageTime: null,
  message: {
    type: 'error',
    message: ''
  },
  preloadData: store('preloadData') || {},
  yourLocation: store('yourLocation') || {
    address: 'Hà Nội',
    lat: null,
    lng: null
  }
}

export default new Vuex.Store({
  plugins: [VuexLoading.Store],
  state,
  actions,
  // getters,
  mutations,
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

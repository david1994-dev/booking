import * as types from '../mutation-types'
import { http, setToken } from '../../utils/http'
import moment from 'moment'
import store from 'store2'

const state = {
  accessToken: null,
  user: {}
}

const getters = {
  isLogged: state => state.user.id,
  accessToken: state => state.accessToken,
  auth: state => state.user
}

const actions = {
  setAccessToken ({ commit, dispatch }, token) {
    commit(types.ACCESS_TOKEN, token)
    dispatch('authenticate')
  },

  login ({ commit, dispatch }) {
    if (store('auth::access_token')) {
      commit(types.ACCESS_TOKEN, store('auth::access_token'))
      dispatch('authenticate')
    }
  },

  authenticate ({ commit }) {
    http.get('me').then(({ data }) => {
      commit(types.AUTHENTICATE, data)
    }).catch(() => {
      commit(types.LOGOUT)
      window.location.reload()
    })
  },

  logout ({ commit }) {
    commit(types.LOGOUT)
  }
}

const mutations = {
  [types.ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken
    setToken(accessToken)
  },

  [types.AUTHENTICATE] (state, data) {
    state.user = data
    store.set('auth::access_token', state.accessToken)
    store.set('auth::user', {
      user: data,
      last_fetched: moment()
    })
  },

  [types.LOGOUT] (state) {
    state.accessToken = null
    state.user = {}
    store.remove('auth::access_token')
    store.remove('auth::user')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

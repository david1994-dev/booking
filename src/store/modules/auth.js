import * as types from '../mutation-types'
import { http, setToken, setStore } from '../../utils/http'
import moment from 'moment'
import store from 'store2'
import { head } from 'lodash'

const state = {
  accessToken: null,
  user: {}
}

const getters = {
  isLogged: state => state.user.id,
  accessToken: state => state.accessToken,
  auth: state => state.user,
  role: state => state.role
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

  authenticate ({ commit, state }) {
    const url = state.role === 'sales' ? 'sales/me' : 'coworking/me'
    http.get(url).then(({ data }) => {
      commit(types.AUTHENTICATE, data)
    }).catch(() => {
      commit(types.LOGOUT)
      window.location.reload()
    })
  },

  logout ({ commit }) {
    commit(types.LOGOUT)
  },

  setRole ({ commit }, role) {
    commit(types.SET_ROLE, role)
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

    if ((state.role === 'sales') && (data.merchant)) {
      const store = head(data.merchant.stores)
      if (store) {
        setStore(store.id)
      }
    }
  },

  [types.LOGOUT] (state) {
    state.accessToken = null
    state.user = {}
    store.remove('auth::access_token')
    store.remove('auth::user')
  },

  [types.SET_ROLE] (state, role) {
    state.role = role
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

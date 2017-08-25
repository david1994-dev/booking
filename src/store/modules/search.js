import * as types from '../mutation-types'
import { flatten } from 'lodash'

const state = {
  keyword: '',
  area: {},
  service: {}
}

const getters = {
  keyword: state => state.keyword,
  selectedArea: state => state.area,
  selectedService: state => state.service
}

const actions = {
  setKeyword ({ commit }, keyword) {
    commit(types.SET_KEYWORD, keyword)
  },

  setSelectedService ({ commit }, service) {
    commit(types.SET_SELECTED_SERVICE, service)
  },

  setSelectedArea ({ commit }, area) {
    commit(types.SET_SELECTED_AREA, area)
  },

  findAndSetService ({ commit, rootState }, id) {
    if (rootState.preloadData.categories && rootState.preloadData.categories.length) {
      const categories = flatten(rootState.preloadData.categories.map(category => category.children))
      const record = categories.find(r => r.id === parseInt(id))
      if (record) {
        commit(types.SET_SELECTED_SERVICE, record)
      }
    }
  },

  findAndSetArea ({ commit, rootState }, id) {
    if (rootState.preloadData.locations && rootState.preloadData.locations.length) {
      const areas = flatten(rootState.preloadData.locations.map(city => city.areas))
      const record = areas.find(r => r.id === parseInt(id))
      if (record) {
        commit(types.SET_SELECTED_AREA, record)
      }
    }
  },

  clearSearchQuery ({ commit }) {
    commit(types.SET_KEYWORD, '')
    commit(types.SET_SELECTED_SERVICE, {})
    commit(types.SET_SELECTED_AREA, {})
  }
}

const mutations = {
  [types.SET_KEYWORD] (state, keyword) {
    state.keyword = keyword || ''
    state.service = {}
  },

  [types.SET_SELECTED_SERVICE] (state, service) {
    state.keyword = service.name || ''
    state.service = service
  },

  [types.SET_SELECTED_AREA] (state, area) {
    state.area = area
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

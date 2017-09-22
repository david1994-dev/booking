import * as types from '../mutation-types'
import { flatten } from 'lodash'

const state = {
  keyword: '',
  location: '',
  position: {
    latitude: '',
    longitude: ''
  },
  area: {},
  city: {},
  service: {}
}

const getters = {
  keyword: state => state.keyword,
  location: state => state.location,
  position: state => state.position,
  selectedArea: state => state.area,
  selectedCity: state => state.city,
  selectedService: state => state.service
}

const actions = {
  setKeyword ({ commit }, keyword) {
    commit(types.SET_KEYWORD, keyword)
  },

  setLocation ({ commit }, location) {
    commit(types.SET_SELECTED_CITY, {})
    commit(types.SET_SELECTED_AREA, {})
    commit(types.SET_LOCATION, location)
  },

  setPosition ({ commit }, location) {
    commit(types.SET_POSITION, location)
  },

  setSelectedService ({ commit }, service) {
    commit(types.SET_SELECTED_SERVICE, service)
  },

  setSelectedCity ({ commit }, city) {
    commit(types.SET_SELECTED_AREA, {})
    commit(types.SET_SELECTED_CITY, city)
  },

  setSelectedArea ({ commit }, area) {
    commit(types.SET_SELECTED_CITY, {})
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

  findAndSetCity ({ commit, rootState }, id) {
    if (rootState.preloadData.locations && rootState.preloadData.locations.length) {
      const record = rootState.preloadData.locations.find(r => r.id === parseInt(id))
      if (record) {
        commit(types.SET_SELECTED_CITY, record)
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
    commit(types.SET_LOCATION, '')
    commit(types.SET_POSITION, { lat: '', lng: '' })
    commit(types.SET_SELECTED_SERVICE, {})
    commit(types.SET_SELECTED_CITY, {})
    commit(types.SET_SELECTED_AREA, {})
  }
}

const mutations = {
  [types.SET_KEYWORD] (state, keyword) {
    state.keyword = keyword || ''
    state.service = {}
  },

  [types.SET_LOCATION] (state, location) {
    state.location = location || ''
  },

  [types.SET_POSITION] (state, { lat, lng }) {
    state.position = {
      latitude: lat,
      longitude: lng
    }
  },

  [types.SET_SELECTED_SERVICE] (state, service) {
    state.keyword = service.name || ''
    state.service = service
  },

  [types.SET_SELECTED_CITY] (state, city) {
    state.city = city
    state.location = city.name || ''
    state.position = {
      latitude: '',
      longitude: ''
    }
  },

  [types.SET_SELECTED_AREA] (state, area) {
    state.area = area
    state.location = area.name || ''
    state.position = {
      latitude: '',
      longitude: ''
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

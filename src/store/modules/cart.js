import * as types from '../mutation-types'

const state = {
  services: [],
  stylist: {},
  date: null
}

const getters = {
  cartServices: state => state.services,
  cartStylist: state => state.stylist,
  bookingDate: state => state.date
}

const actions = {
  addServiceToCart ({ commit }, service) {
    commit(types.ADD_SERVICE_TO_CART, service)
  },

  removeServiceFromCart ({ commit }, service) {
    commit(types.REMOVE_SERVICE_FROM_CART, service)
  },

  setStylist ({ commit }, stylist) {
    commit(types.SET_STYLIST_TO_CART, stylist)
  },

  removeStylist ({ commit }) {
    commit(types.REMOVE_STYLIST_FROM_CART)
  },

  setBookingDate ({ commit }, date) {
    commit(types.SET_BOOKING_DATE, date)
  },

  clearCart ({ commit }) {
    commit(types.CLEAR_CART)
  }
}

const mutations = {
  [types.ADD_SERVICE_TO_CART] (state, service) {
    const record = state.services.find(s => s.id === service.id)
    if (!record) {
      state.services.push(service)
    }
  },

  [types.REMOVE_SERVICE_FROM_CART] (state, service) {
    const record = state.services.find(s => s.id === service.id)
    if (record) {
      state.services.splice(state.services.indexOf(record), 1)
    }
  },

  [types.SET_STYLIST_TO_CART] (state, stylist) {
    state.stylist = stylist
  },

  [types.REMOVE_STYLIST_FROM_CART] (state) {
    state.stylist = {}
  },

  [types.SET_BOOKING_DATE] (state, date) {
    state.date = date
  },

  [types.CLEAR_CART] (state) {
    state.services = []
    state.stylist = {}
    state.date = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

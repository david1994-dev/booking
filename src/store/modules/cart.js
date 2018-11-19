import * as types from '../mutation-types'
import store from 'store2'

const state = {
  salon: {},
  services: [],
  stylist: {},
  date: null,
  promoCode: {
    type: '',
    value: 0
  },
  verifyStyle: null
}

const getters = {
  cartSalon: state => state.salon,
  cartServices: state => state.services,
  cartStylist: state => state.stylist,
  bookingDate: state => state.date,
  promoCode: state => state.promoCode,
  verifyStyle: state => state.verifyStyle
}

const actions = {
  addServiceToCart ({ commit }, service) {
    commit(types.ADD_SERVICE_TO_CART, service)
  },

  removeServiceFromCart ({ commit }, service) {
    commit(types.REMOVE_SERVICE_FROM_CART, service)
  },

  setSalon ({ commit }, salon) {
    commit(types.SET_SALON_TO_CART, salon)
  },

  setStylist ({ commit }, stylist) {
    commit(types.SET_STYLIST_TO_CART, stylist)
  },

  setBookingDate ({ commit }, date) {
    commit(types.SET_BOOKING_DATE, date)
  },

  applyPromoCode ({ commit }, promoCode) {
    commit(types.APPLY_PROMO_CODE, promoCode)
  },

  removePromoCode ({ commit }) {
    commit(types.REMOVE_PROMO_CODE)
  },

  clearCart ({ commit }) {
    commit(types.CLEAR_CART, true)
  },

  emptyCart ({ commit }) {
    commit(types.CLEAR_CART, false)
  },

  setVerifyStyle ({ commit }, style) {
    commit(types.SET_VERIFY_STYLE, style)
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

  [types.SET_SALON_TO_CART] (state, salon) {
    state.salon = salon
  },

  [types.SET_STYLIST_TO_CART] (state, stylist) {
    state.stylist = stylist
  },

  [types.SET_BOOKING_DATE] (state, date) {
    state.date = date
  },

  [types.APPLY_PROMO_CODE] (state, promoCode) {
    state.promoCode = promoCode
  },

  [types.REMOVE_PROMO_CODE] (state) {
    state.promoCode = {
      type: '',
      value: 0
    }
  },

  [types.CLEAR_CART] (state, clearSalon) {
    if (clearSalon) {
      state.salon = {}
    }
    state.services = []
    state.stylist = {}
    state.date = null
    state.promoCode = {
      type: '',
      value: 0
    }
    state.verifyStyle = null

    store.remove('cart')
  },

  [types.SET_VERIFY_STYLE] (state, style) {
    state.verifyStyle = style
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

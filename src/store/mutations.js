import * as types from './mutation-types'

export default {
  [types.SHOW_MESSAGE] (state, bool) {
    state.showMessage = bool
  },

  [types.SET_MESSAGE] (state, message) {
    if (!state.showMessage) {
      return
    }

    state.messageTime = Date.now()
    state.message = message
  },

  [types.SET_PRELOAD_DATA] (state, data) {
    state.preloadData = data
  }
}

import * as types from './mutation-types'

export const showMessage = ({ commit }, bool) => {
  commit(types.SHOW_MESSAGE, bool)
}

export const setError = ({ commit }, data) => {
  const type = 'error'
  let message = data.message

  if (data.errors && data.errors.length) {
    message = data.errors.map(({ message }) => message).join('<br/>')
  }

  commit(types.SET_MESSAGE, { type, message })
}

export const setMessage = ({ commit }, { type, message }) => {
  commit(types.SET_MESSAGE, { type, message })
}

export const setPreloadData = ({ commit }, data) => {
  commit(types.SET_PRELOAD_DATA, data)
}

export const setYourLocation = ({ commit }, data) => {
  commit(types.SET_YOUR_LOCATION, data)
}

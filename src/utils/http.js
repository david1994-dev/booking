import axios from 'axios'
import interceptors from './interceptors'
import { apiUrl } from '../config'

export const http = axios.create({
  baseURL: apiUrl,
  headers: { 'X-Request-Source': 'web' }
})

export function setToken (token) {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

export function setLocale (locale) {
  http.defaults.headers.common['Content-Language'] = locale
}

export default function install (Vue, { store, router }) {
  interceptors(http, store, router)
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  Object.defineProperty(Vue.prototype, '$http', {
    get () {
      return http
    }
  })
}

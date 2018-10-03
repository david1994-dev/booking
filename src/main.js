// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { default as http, setLocale } from './utils/http'
import eventbus from './utils/eventbus'
import * as filters from './utils/filters'
import { sync } from 'vuex-router-sync'
import BootstrapVue from 'bootstrap-vue'
import Scrollactive from 'vue-scrollactive'
import * as VueGoogleMaps from 'vue2-google-maps'
import VuePhotoSwipe from './utils/photoswipe'
import { VueMasonryPlugin } from 'vue-masonry'
import VeeValidate, { Validator } from 'vee-validate'
import moment from 'moment-timezone'
import { googleMapKey } from './config'
import storage from 'store2'
import VueI18n from 'vue-i18n'

// const en = () => import(/* webpackChunkName: "lang-bundle" */ 'vee-validate/dist/locale/en')
// const vi = () => import(/* webpackChunkName: "lang-bundle" */ 'vee-validate/dist/locale/vi')
import en from 'vee-validate/dist/locale/en'
import vi from 'vee-validate/dist/locale/vi'

let lang = storage.get('locale', 'vi')

var urlParam = new URLSearchParams(window.location.search)
if (urlParam.get('lang') && (urlParam.get('lang') === 'vi' || urlParam.get('lang') === 'en')) {
  lang = urlParam.get('lang')
  storage.set('locale', lang)
}

setLocale(lang)

Vue.config.productionTip = false

sync(store, router)
moment.tz.setDefault('Asia/Ho_Chi_Minh')
moment.locale(lang)
// Validator.addLocale(vi)
// Validator.addLocale(en)
Validator.localize('vi', vi)
Validator.localize('en', en)

Vue.prototype.moment = moment
Vue.use(VeeValidate, {
  locale: lang
})
Vue.use(VueI18n)
Vue.use(BootstrapVue)
Vue.use(Scrollactive)
Vue.use(http, { store, router })
Vue.use(eventbus)
Vue.use(VuePhotoSwipe)
Vue.use(VueMasonryPlugin)
Vue.use(VueGoogleMaps, {
  load: {
    key: googleMapKey,
    libraries: 'places'
  }
})

Object.keys(filters).map((method) => {
  Vue.filter(method, filters[method])
})

const messages = {
  en: require(/* webpackChunkName: "lang-bundle" */ './i18n/en.json'),
  vi: require(/* webpackChunkName: "lang-bundle" */ './i18n/vi.json')
}

const i18n = new VueI18n({
  locale: lang,
  fallbackLocale: 'vi',
  messages
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

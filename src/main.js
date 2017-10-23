// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './utils/http'
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

// eslint-disable-line
import en from 'vee-validate/dist/locale/en'
import vi from 'vee-validate/dist/locale/vi'

moment.tz.setDefault('Asia/Ho_Chi_Minh')

const lang = storage.get('locale', 'vi')
//

if (lang === 'vi') {
  Validator.addLocale(vi)
  Vue.use(VeeValidate, {
    locale: 'vi'
  })
  moment.locale('vi')
} else {
  Validator.addLocale(en)
  Vue.use(VeeValidate, {
    locale: 'en'
  })
  moment.locale('en')
}

Vue.config.productionTip = false

sync(store, router)

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
  fallbackLocale: lang,
  messages
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

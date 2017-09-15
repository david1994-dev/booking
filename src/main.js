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
import VuePreview from 'vue-preview'
import VeeValidate, { Validator } from 'vee-validate'
import { VueMasonryPlugin } from 'vue-masonry'
import vi from 'vee-validate/dist/locale/vi'
import moment from 'moment-timezone'
import { googleMapKey } from './config'
Validator.addLocale(vi)
moment.tz.setDefault('Asia/Ho_Chi_Minh')

Vue.config.productionTip = false

sync(store, router)

Vue.use(BootstrapVue)
Vue.use(Scrollactive)
Vue.use(http, { store, router })
Vue.use(eventbus)
Vue.use(VuePreview)
Vue.use(VeeValidate, {
  locale: 'vi'
})
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

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

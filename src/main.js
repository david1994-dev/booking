// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import http from './utils/http'
import { sync } from 'vuex-router-sync'
import BootstrapVue from 'bootstrap-vue'
import Scrollactive from 'vue-scrollactive'

Vue.config.productionTip = false

sync(store, router)

Vue.use(BootstrapVue)
Vue.use(Scrollactive)
Vue.use(http, { store, router })

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

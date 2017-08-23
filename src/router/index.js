import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
// import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Search from '@/components/Search'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '*',
      // component: NotFoundComponent
      redirect: { name: 'home' }
    }
  ]
})

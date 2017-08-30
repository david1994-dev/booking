import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
// import Hello from '@/components/Hello'
// const Hello = () => import(/* webpackChunkName: "search-bundle" */ '@/components/Hello')
import Home from '@/components/Home'
import Search from '@/components/Search'
import Services from '@/components/Services'
import Stylists from '@/components/Stylists'
import Salon from '@/components/Salon'

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
      path: '/services',
      name: 'services',
      component: Services
    },
    {
      path: '/stylists',
      name: 'stylists',
      component: Stylists
    },
    {
      path: '/salon/:id',
      name: 'salon',
      component: Salon
    },
    {
      path: '*',
      // component: NotFoundComponent
      redirect: { name: 'home' }
    }
  ]
})

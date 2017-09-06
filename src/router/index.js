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
import Review from '@/components/Review'
const Showcase = () => import(/* webpackChunkName: "explore-bundle" */ '@/components/Showcase')
const Explore = () => import(/* webpackChunkName: "explore-bundle" */ '@/components/Explore')
const Blogs = () => import(/* webpackChunkName: "blog-bundle" */ '@/components/Blogs')
const Blog = () => import(/* webpackChunkName: "blog-bundle" */ '@/components/Blog')
import Contact from '@/components/Contact'

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
      path: '/explore',
      name: 'explore',
      component: Explore
    },
    {
      path: '/blogs',
      name: 'blogs',
      component: Blogs
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/blog/:id',
      name: 'blog',
      component: Blog
    },
    {
      path: '/salon/:id',
      name: 'salon',
      component: Salon
    },
    {
      path: '/review/:id',
      name: 'review',
      component: Review
    },
    {
      path: '/showcase/:id',
      name: 'showcase',
      component: Showcase
    },
    {
      path: '*',
      // component: NotFoundComponent
      redirect: { name: 'home' }
    }
  ]
})

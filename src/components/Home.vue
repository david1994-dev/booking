<template>
<div>
  <div class="wrapper-header">
    <header class="main-header">
      <div class="top-header">
        <div class="menu-top-inner">
          <router-link class="active" :to="{ name: 'home' }" >Đặt lịch làm đẹp</router-link>
          <a :href="getNewsUrl()">Tin tức làm đẹp</a>
        </div>
      </div>
      <div class="inner">
        <router-link class="logo" :to="{ name: 'home' }"><img src="../assets/images/logo-blue.png" /></router-link>
        <div class="menu">
        <div class="icon"><i class="bz-menu"></i></div>
        <div class="overlay"></div>
        <div class="inner-menu">
          <div class="close-menu"><i class="bz-close"></i></div>
            <div class="content-menu">
              <div class="menu-top-mobile">
                <router-link class="active" :to="{ name: 'home' }" >Đặt lịch làm đẹp</router-link>
                <a :href="getNewsUrl()">Tin tức làm đẹp</a>
              </div>
              <ul>
                <li v-for="category in categories"><a class="pointer">{{ category.name }}</a>
                  <ul v-if="category.children.length">
                    <li v-for="service in category.children"
                      :key="service.id"
                      v-if="service.salons_count">
                      <router-link :to="{ name:'search', query: { q: service.name, category_id: service.id  } }">{{ service.name }}</router-link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <right-header />
      </div>
    </header>
    <div class="slogan-search">
      <div class="slogan">
        <div class="clock-icon">
          <span class="line"></span>
        </div>
        <h2 class="text">{{ $t('home.search_bar.exploring_and_booking') }}</h2>
      </div>
      <search-new />
    </div>
    
  </div>
  <div class="tp-container landing-page">
    <div class="guide-discovery">
      <guide />
      <feature-tags />
      <promotion />
      <service />
      <top-salon />
      <location />
    </div>
    <div class="savetime">
      <figure>
        <a><img src="../assets/images/image-savetime.png"></a>
      </figure>
      <div class="info">
        <h3 class="name">{{ $t('home.explore.booking_to_enjoy') }}</h3>
        <p class="des">{{ $t('home.explore.booking_to_enjoy_detail') }}</p><a class="register-now" @click="$root.$emit('bv::show::modal', 'modal-choice-account')">{{ $t('home.explore.register_now') }}</a>
      </div>
    </div>
    <blogs />
  </div>
  <page-footer />
  <register-modal />
</div>
</template>

<script>
const Search = () => import(/* webpackChunkName: "search-bundle" */ './partials/Search')
const SearchNew = () => import(/* webpackChunkName: "search-bundle" */ './partials/SearchNew')
const PageFooter = () => import(/* webpackChunkName: "homepage-bundle" */ './layout/Footer')
const Service = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Service')
const Promotion = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Promotion')
const FeatureTags = () => import(/* webpackChunkName: "homepage-bundle" */ './home/FeatureTags')
const Guide = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Guide')
const TopSalon = () => import(/* webpackChunkName: "homepage-bundle" */ './home/TopSalon')
const Location = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Location')
const Blogs = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Blogs')
import RightHeader from './partials/RightHeader'
import RegisterModal from './partials/RegisterModal'

import { mapState } from 'vuex'
import $ from 'jquery'
import { newsUrl } from './../config'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Beauty booking',
    bodyAttrs: {
      class: null
    }
  },
  components: {
    PageFooter,
    Search,
    SearchNew,
    FeatureTags,
    Promotion,
    Guide,
    TopSalon,
    Service,
    Location,
    Blogs,
    RegisterModal,
    RightHeader
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('clearSearchQuery')
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('clearSearchQuery').then(() => next())
  },
  computed: mapState({
    categories: state => state.preloadData.categories || []
  }),
  mounted () {
    this.$nextTick(() => this.menuMobile())
  },
  methods: {
    getNewsUrl () {
      return newsUrl
    },
    menuMobile () {
      $('.main-header .menu li').each((index, item) => {
        var _this = $(item)
        var count = _this.find('ul').length
        if (count) {
          _this.addClass('bullet')
          $('<i class="bullet-icon bz-down-2"></i>').insertAfter(_this.children('a'))
        }
      })
      $('.main-header .menu .icon, .main-header .menu .overlay, .main-header .menu .close-menu').click(() => {
        $('.main-header .menu').toggleClass('active-menu')
      })

      $('.main-header .menu .bullet-icon').each((index, item) => {
        $(item).click(() => {
          if ($('.main-header .menu.active-menu').length) {
            var parent = $(item).parent()

            if (parent.hasClass('active-down')) {
              $(item).siblings('ul').stop(true, true).slideUp()
            } else {
              $(item).siblings('ul').stop(true, true).slideDown()
            }
            parent.toggleClass('active-down')
          }
        })
      })
    }
  }
}
</script>

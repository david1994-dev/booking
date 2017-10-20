<template>
<div>
  <div class="wrapper-header">
    <header class="header">
      <div class="inner">
        <router-link class="logo" :to="{ name: 'home' }"><img src="../assets/images/logo_beta.png" /></router-link>
        <!-- <ul class="account">
          <li class="register"><a href="">Đăng ký</a></li>
          <li class="login"><a href="">Đăng nhập</a></li>
        </ul> -->
        <right-header />
      </div>
    </header>
    <div class="slogan">
      <div class="clock-icon">
        <span class="line"></span>
      </div>
      <h2 class="text">{{ $t('home.search_bar.exploring_and_booking') }}</h2>
    </div>
    <search />
  </div>
  <div class="tp-container landing-page">
    <explore />
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
const PageFooter = () => import(/* webpackChunkName: "homepage-bundle" */ './layout/Footer')
const Explore = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Explore')
const Blogs = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Blogs')
import RightHeader from './partials/RightHeader'
import RegisterModal from './partials/RegisterModal'

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
    Explore,
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
  }
}
</script>

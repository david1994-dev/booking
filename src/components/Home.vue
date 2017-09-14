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
        <div class="account" @click="$root.$emit('show::modal', 'modal-choice-account')">Đăng ký</div>
      </div>
    </header>
    <div class="slogan">
      <div class="clock-icon">
        <span class="line"></span>
      </div>
      <h2 class="text">Khám phá và đặt lịch làm đẹp 24/7</h2>
    </div>
    <search />
  </div>
  <div class="tp-container landing-page">
    <explore />
    <div class="savetime">
      <figure>
        <a href="#"><img src="../assets/images/image-savetime.png"></a>
      </figure>
      <div class="info">
        <h3 class="name">Booking để tận hưởng tiện ích</h3>
        <p class="des">Bzone là nơi bạn có thể kết nối với các salon làm đẹp bất cứ lúc nào. Chúng tôi cam kết sẽ luôn mang lại cho bạn những dịch vụ chuyên nghiệp nhất.</p><a class="register-now" @click="$root.$emit('show::modal', 'modal-choice-account')">Đăng ký ngay</a>
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
    RegisterModal
  }
}
</script>

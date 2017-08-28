<template>
<div>
  <div class="wrapper-header">
    <header class="header">
      <div class="inner">
        <router-link class="logo" :to="{ name: 'home' }"><img src="../assets/images/logo.png" /></router-link>
        <!-- <ul class="account">
          <li class="register"><a href="">Đăng ký</a></li>
          <li class="login"><a href="">Đăng nhập</a></li>
        </ul> -->
        <div class="account">Đăng ký</div>
      </div>
    </header>
    <div class="slogan">
      <div class="clock-icon">
        <span class="line"></span>
      </div>
      <h2 class="text">Tích kiệm thời gian, đặt lịch chăm sóc bản thân ngay tại đây</h2>
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
        <h3 class="name">Tiết kiệm thời gian, đặt lịch chăm sóc bản thân ngay tại đây</h3>
        <p class="des">Để cùng xây dựng một cộng đồng chất lượng & khách quan, bảo vệ quyền lợi cho nha</p><a class="register-now" href="#">Đăng ký ngay</a>
      </div>
    </div>
    <blogs />
  </div>
  <page-footer />
</div>
</template>

<script>
const Search = () => import(/* webpackChunkName: "search-bundle" */ './partials/Search')
const PageFooter = () => import(/* webpackChunkName: "homepage-bundle" */ './layout/Footer')
const Explore = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Explore')
const Blogs = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Blogs')

export default {
  name: 'Home',
  metaInfo: {
    title: 'Beauty booking'
  },
  components: {
    PageFooter,
    Search,
    Explore,
    Blogs
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('clearSearchQuery')
    })
  }
}
</script>

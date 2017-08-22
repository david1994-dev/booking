<template>
<div>
  <div class="wrapper-header">
    <page-header />
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
const PageHeader = () => import(/* webpackChunkName: "homepage-bundle" */ './layout/HomeHeader')
const PageFooter = () => import(/* webpackChunkName: "homepage-bundle" */ './layout/Footer')
const Search = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Search')
const Explore = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Explore')
const Blogs = () => import(/* webpackChunkName: "homepage-bundle" */ './home/Blogs')

export default {
  name: 'Home',
  components: {
    PageHeader,
    PageFooter,
    Search,
    Explore,
    Blogs
  }
}
</script>

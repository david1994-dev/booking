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
        <p class="des">Để cùng xây dựng một cộng đồng chất lượng & khách quan, bảo vệ quyền lợi cho nha</p><a class="register-now" @click="registerModal = true">Đăng ký ngay</a>
      </div>
    </div>
    <blogs />
  </div>
  <page-footer />
  <b-modal v-model="registerModal"
    id="modal-choice-account"
    :hideHeader="true"
    :hideFooter="true">
    <i class="bz-close tp-modal-close" @click="registerModal = false"></i>
      <div class="modal-body-inner">
        <div v-show="!salonRegister">
          <div class="salon">
            <div class="des">Đăng ký với tư cách chủ salon?</div>
            <div class="tp-btn" @click="salonRegister = true">Đăng ký chủ salon</div>
          </div>
          <div class="user">
            <div class="des">Đăng ký với tư cách khách hàng?</div>
            <p>Bạn hoàn toàn không cần đăng ký tài khoản mã vẫn có thể được lịch làm đẹp!</p>
            <router-link class="tp-btn" :to="{ name: 'explore' }">Tìm lịch làm đẹp</router-link>
          </div>
        </div>
        <div v-show="salonRegister">
          <div class="tp-title-form">Đăng ký chủ Salon</div>
          <div class="tp-des-form">60 giây để đăng ký một công cụ quản lý Salon chuyên nghiệp</div>
          <input class="tp-text-form" type="type" placeholder="Tên salon" />
          <input class="tp-text-form" type="type" placeholder="Đại chỉ salon" />
          <input class="tp-text-form" type="type" placeholder="Người đại diện" />
          <input class="tp-text-form" type="type" placeholder="Số điện thoại" />
          <input class="tp-text-form" type="password" placeholder="Mật khẩu" />
          <input class="tp-text-form" type="password" placeholder="Nhập lại mật khẩu" />
          <input class="tp-btn" type="submit" value="Đăng ký" data-toggle="modal" data-target="#modal-success-salon">
        </div>
      </div>
  </b-modal>
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
    title: 'Beauty booking',
    bodyAttrs: {
      class: null
    }
  },
  components: {
    PageFooter,
    Search,
    Explore,
    Blogs
  },
  data () {
    return {
      registerModal: false,
      salonRegister: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('clearSearchQuery')
    })
  },
  watch: {
    registerModal (value) {
      if (!value) {
        setTimeout(() => {
          this.salonRegister = false
        }, 800)
      }
    }
  },
  methods: {
    explore () {
      this.registerModal = false
      this.$router.push({ name: 'explore' })
    }
  }
}
</script>

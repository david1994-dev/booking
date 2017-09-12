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
        <div class="account" @click="registerModal = true">Đăng ký</div>
      </div>
    </header>
    <div class="slogan">
      <div class="clock-icon">
        <span class="line"></span>
      </div>
      <h2 class="text">Tiết kiệm thời gian, đặt lịch làm đẹp 24/7</h2>
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
            <p>Bạn hoàn toàn không cần đăng ký tài khoản mà vẫn có thể đặt lịch làm đẹp!</p>
            <router-link class="tp-btn" :to="{ name: 'explore' }">Tìm lịch làm đẹp</router-link>
          </div>
        </div>
        <form novalidate
          v-show="salonRegister"
          @submit.prevent="submit">
          <div class="tp-title-form">Đăng ký chủ Salon</div>
          <div class="tp-des-form">60 giây để đăng ký một công cụ quản lý Salon chuyên nghiệp</div>
          <input class="tp-text-form form-control"
            type="text"
            name="name"
            placeholder="Tên salon"
            v-validate="'required'"
            data-vv-as="Tên salon"
            :class="{ 'is-invalid': errors.has('name') }" />
          <div class="invalid-feedback">{{ errors.first('name') }}</div>
          <input class="tp-text-form form-control"
            type="text"
            name="address"
            v-validate="'required'"
            data-vv-as="Địa chỉ salon"
            placeholder="Địa chỉ salon"
            :class="{ 'is-invalid': errors.has('address') }" />
          <div class="invalid-feedback">{{ errors.first('address') }}</div>
          <input class="tp-text-form form-control"
            type="text"
            name="owner"
            v-validate="'required'"
            data-vv-as="Người đại diện"
            placeholder="Người đại diện"
            :class="{ 'is-invalid': errors.has('owner') }" />
          <div class="invalid-feedback">{{ errors.first('owner') }}</div>
          <input class="tp-text-form form-control"
            type="text"
            name="phone"
            v-validate="'required'"
            data-vv-as="Số điện thoại"
            placeholder="Số điện thoại"
            :class="{ 'is-invalid': errors.has('phone') }" />
          <div class="invalid-feedback">{{ errors.first('phone') }}</div>
          <input class="tp-text-form form-control"
            type="password"
            name="password"
            v-validate="'required|confirmed:password_confirmation'"
            data-vv-as="Mật khẩu"
            placeholder="Mật khẩu"
            :class="{ 'is-invalid': errors.has('password') }" />
          <div class="invalid-feedback">{{ errors.first('password') }}</div>
          <input class="tp-text-form form-control"
            type="password"
            name="password_confirmation"
            v-validate="'required'"
            data-vv-as="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            :class="{ 'is-invalid': errors.has('password_confirmation') }" />
          <div class="invalid-feedback">{{ errors.first('password_confirmation') }}</div>
          <input class="tp-btn" type="submit" value="Đăng ký">
        </form>
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
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log('ok')
        }
      })
    }
  }
}
</script>

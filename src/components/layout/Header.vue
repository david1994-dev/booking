<template>
<header class="sub-header" :class="{ 'show-searchform': showSearchForm }">
  <div class="sub-container">
    <router-link class="logo" :to="{ name: 'home' }"><img src="../../assets/images/logo_beta.png" /></router-link>
    <div class="fx-full"></div>
    <div class="search">
      <i class="bz-search search-icon" :class="{ active: keyword }" @click="showSearchForm = !showSearchForm"></i>
      <search wrapper-class="search-inner" />
    </div>
    <!-- <ul class="account">
      <li class="register"><a href="">Đăng ký</a></li>
      <li class="login"><a href="">Đăng nhập</a></li>
    </ul> -->
    <right-header />
  </div>
  <register-modal />
</header>
</template>

<script>
import { mapGetters } from 'vuex'
const Search = () => import(/* webpackChunkName: "search-bundle" */ '../partials/Search')
import RightHeader from '../partials/RightHeader'
import RegisterModal from '../partials/RegisterModal'

export default {
  name: 'Header',
  components: {
    Search,
    RegisterModal,
    RightHeader
  },
  computed: mapGetters(['keyword']),
  mounted () {
    this.$bus.$on('searchSubmitted', () => {
      this.showSearchForm = false
    })
  },
  data () {
    return {
      showSearchForm: false
    }
  }
}
</script>

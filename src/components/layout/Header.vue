<template>
<header class="sub-header">
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
  watch: {
    showSearchForm (value) {
      if (value) {
        document.documentElement.classList.add('show-searchform')
      } else {
        document.documentElement.classList.remove('show-searchform')
      }
    }
  },
  data () {
    return {
      showSearchForm: false
    }
  }
}
</script>

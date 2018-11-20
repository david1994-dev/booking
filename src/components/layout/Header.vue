<template>
<header class="sub-header">
  <div class="menu-top">
    <div class="menu-top-inner">
      <div class="menu-list" :class="{'show-list': showList}" @click="showList = !showList">
        <div class="selected" >Đặt lịch làm đẹp</div>
        <ul>
          <li class="active"><a href="#">Đặt lịch làm đẹp</a></li>
          <li><a :href="getNewsUrl()">Tin tức</a></li>
          <li><a href="#">Khóa học</a></li>
          <li><a href="#">Mua sắm</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="sub-container">
    <router-link class="logo" :to="{ name: 'home' }"><img src="../../assets/images/logo.png" /></router-link>
    <div class="fx-full"></div>
    <div class="search">
      <i class="bz-search search-icon" :class="{ active: keyword }" @click="showSearchForm = !showSearchForm"></i>
      <search-new wrapper-class="search-inner" input-class="search-input active" top-header="true" />
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
const SearchNew = () => import(/* webpackChunkName: "search-bundle" */ '../partials/SearchNew')
import RightHeader from '../partials/RightHeader'
import RegisterModal from '../partials/RegisterModal'
import { newsUrl } from './../../config'

export default {
  name: 'Header',
  components: {
    Search,
    SearchNew,
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
      showSearchForm: false,
      showList: false
    }
  },
  methods: {
    getNewsUrl () {
      return newsUrl
    }
  }
}
</script>

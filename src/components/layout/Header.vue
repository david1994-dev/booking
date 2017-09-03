<template>
<header class="sub-header">
  <div class="sub-container">
    <router-link class="logo" :to="{ name: 'home' }"><img src="../../assets/images/logo.png" /></router-link>
    <div class="search">
      <i class="bz-search search-icon" @click="showSearchForm"></i>
      <search wrapper-class="search-inner" />
    </div>
    <!-- <ul class="account">
      <li class="register"><a href="">Đăng ký</a></li>
      <li class="login"><a href="">Đăng nhập</a></li>
    </ul> -->
    <div class="account">Đăng ký</div>
  </div>
</header>
</template>

<script>
const Search = () => import(/* webpackChunkName: "search-bundle" */ '../partials/Search')

export default {
  name: 'Header',
  components: { Search },
  methods: {
    showSearchForm () {
      document.documentElement.classList.toggle('show-searchform')
    }
  }
}
</script>

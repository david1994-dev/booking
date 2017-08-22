<template>
<header class="header">
  <div class="inner">
    <router-link class="logo" :to="{ name: 'home' }"><img src="../../assets/images/logo.png" /></router-link>
    <ul class="account">
      <li class="register"><a href="">Đăng ký</a></li>
      <li class="login"><a href="">Đăng nhập</a></li>
    </ul>
  </div>
</header>
</template>

<script>
export default {
  name: 'HomepageHeader'
}
</script>

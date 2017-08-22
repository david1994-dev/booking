<template>
<header class="sub-header">
  <div class="sub-container">
    <router-link class="logo" :to="{ name: 'home' }"><img src="../../assets/images/logo.png" /></router-link>
    <div class="search">
      <i class="bz-search search-icon"></i>
      <div class="search-inner">
        <div class="wrap-input key-type">
          <div class="input">
            <i class="bz-search"></i>
            <input type="search" placeholder="Dịch vụ, Stylist, Salon..." />
          </div>

          <div class="tp-search-result">
            <ul>
              <li>
                <a href="#">Dịch vụ</a>
                <ul>
                  <li>
                    <a href="#">Cắt tóc nam</a>
                    <ul>
                      <li><a href="#">Cắt tóc nam</a></li>
                      <li><a href="#">Cắt tóc nam</a></li>
                      <li><a href="#">Cắt tóc nam</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Cắt tóc nam</a>
                    <ul>
                      <li><a href="#">Cắt tóc nam</a></li>
                      <li><a href="#">Cắt tóc nam</a></li>
                      <li><a href="#">Cắt tóc nam</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Cắt tóc nam</a>
                    <ul>
                      <li><a href="#">Cắt tóc nam</a></li>
                      <li><a href="#">Cắt tóc nam</a></li>
                      <li><a href="#">Cắt tóc nam</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#">Stylist</a>
                <ul>
                  <li><a href="#">Cắt tóc nam</a></li>
                  <li><a href="#">Cắt tóc nam</a></li>
                  <li><a href="#">Cắt tóc nam</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Salon</a>
                <ul>
                  <li><a href="#">Cắt tóc nam</a></li>
                  <li><a href="#">Cắt tóc nam</a></li>
                  <li><a href="#">Cắt tóc nam</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div class="wrap-input location">
          <div class="input">
            <i class="bz-location"></i>
            <input type="text" placeholder="Thành phố bạn ở" />
          </div>
          <div class="tp-search-result not-sub">
            <ul>
              <li> <a href="#">Vị trí hiện tại</a> </li>
              <li>
                <a href="#">Hà Nội</a>
                <ul>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Hồ Chí Minh</a>
                <ul>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                </ul>
              </li>
              <li>
                <a href="#">Đà Nẵng</a>
                <ul>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                  <li><a href="#">Q. Hai Bà Trưng</a></li>
                  <li><a href="#">Q. Thanh Xuân</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <input class="btn-search" type="submit" value="Tìm kiếm" />
      </div>
    </div>
    <ul class="account">
      <li class="register"><a href="">Đăng ký</a></li>
      <li class="login"><a href="">Đăng nhập</a></li>
    </ul>
  </div>
</header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

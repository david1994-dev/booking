<template>
<div>
  <page-header />
  <div class="static-page">
    <div class="tp-container">
      <div class="content-page">
        <h1 class="main-title">Hợp tác cùng BZONE</h1>
        <h4>Các salon/stylist được gì khi hợp tác cùng BZONE</h4>
        <br>
        <div class="content-text">
          <p class="sub-heading">Hỗ trợ xây dựng trang profile dành riêng cho salon và stylist</p>
          <p>BZONE sẽ hỗ trợ xây dựng trang giới thiệu thông tin đầy đủ về Salon/Stylists trên <router-link :to="{ path: '/' }">bzone.vn</router-link></p>

          <p class="sub-heading">Tăng nhận diện thương hiệu của salon/stylist<p>
          <p>BZONE sẽ hỗ trợ các salon xuất hiện trên các vị trí Top, chuyên mục &quot;Khám phá Salon&quot;, gợi ý địa điểm nhằm tăng độ nhận diện đến khách hàng.</p>

          <p  class="sub-heading">Hỗ trợ PR</p>
          <p>BZONE sẽ hỗ trợ các bài viết PR cho các salon và trực tiếp đăng lên các mục trên website BZONE (khám phá Salon, Blog) và các kênh mạng xã hội (Facebook, Instagram,...).</p>
          <p>BZONE sẽ hỗ trợ Salon/Spa trong việc xây dựng ý tưởng, đối tác thực hiện Media (video clip, photoshoot) theo nhu cầu quảng bá của Salon/Spa.</p>
          <p>BZONE cũng sẽ hỗ trợ quảng cáo, xây dựng gói ưu đãi, hợp tác nhằm mục tiêu giúp Salon/Spa tiếp cận khách hàng mới thông qua sự kiện hoặc tại gian hàng Online của BZONE trên trang web SHOPEE Việt Nam.</p>

          <p class="sub-heading">Liên kết với khách hàng</p>
          <p>BZONE hỗ trợ gửi email và notification tới khách hàng BZONE về thông tin, hình ảnh, các chương trình khuyến mãi của Salon/Spa.</p>
        </div>
      </div>
    </div>
  </div>
  <page-footer />
</div>
</template>

<script>
import PageHeader from '../layout/Header'
import PageFooter from '../layout/Footer'

export default {
  name: 'Partner',
  components: {
    PageHeader,
    PageFooter
  },
  metaInfo: {
    title: 'Hợp tác với chúng tôi'
  }
}
</script>

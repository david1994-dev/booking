<template>
  <footer class="footer">
    <div class="tp-container">
      <div class="savetime-footer">
        <h3>Tích kiệm thời gian, đặt lịch chăm sóc bản thân ngay tại đây</h3>
        <p>là điểm đến trực tuyến cho các chuyên gia chăm sóc sắc đẹp và khách hàng. Chuyên gia có thể giới thiệu công việc của họ, kết nối với khách hàng mới và hiện tại và xây dựng doanh nghiệp của họ. Khách hàng có thể khám phá các dịch vụ và nhà cung cấp dịch vụ mới, đặt hẹn trực tuyến và lấy cảm hứng.</p>
        <div class="full"></div>
        <div class="copyright">©Abby 2017</div>
      </div>
      <div class="instagram">
        <ul>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
          <li><a href="#"><img src="../../assets/news/images/image-instagram.jpg" /></a></li>
        </ul>
      </div>
      <div class="links">
        <div class="title">Link</div>
        <ul class="list-link">
          <li><a href="#">Về chúng tôi</a></li>
          <li><a href="#">Hỗ trợ</a></li>
          <li><a href="#">Ảnh</a></li>
          <li><a href="#">Đối tác</a></li>
          <li><a href="#">Liên hệ</a></li>
        </ul>
        <div class="full"></div>
        <ul class="social">
          <li><a href="#"><i class="bz-facebook"></i></a></li>
          <li><a href="#"><i class="bz-instagram"></i></a></li>
        </ul>
      </div>
      <div class="copyright bottom">©Abby 2017</div>
    </div>
  </footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FooterNews',
  computed: mapState({
    instagram: state => state.preloadData.instagram || []
  })
}
</script>

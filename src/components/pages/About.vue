<template>
<div>
  <page-header />
  <div class="static-page">
    <div class="tp-container">
      <div class="content-page">
        <h1 class="main-title">Về chúng tôi</h1>
        <div class="content-text">
          <p>Mọi người thường hỏi, điều gì khiến chúng tôi ấp ủ dự định và quyết tâm theo đuổi dự án Bzone? Câu trả lời rất đơn giản, chúng tôi muốn bạn ĐẸP một cách đơn giản nhất. Thị trường làm đẹp tại Việt Nam đang phát triển hơn bao giờ hết, tuy nhiên, điều này đồng nghĩa với việc người dùng sẽ gặp nhiều khó khăn để chọn lựa một dịch vụ thực sự &quot;tốt&quot; cho riêng mình.</p>
          <p>Bzone ra đời để giúp bạn thoát khỏi nỗi lo đó và mang đến những sự lựa chọn làm đẹp chất lượng hơn. Chúng tôi được tạo nên với sứ mệnh truyền cảm hứng đến mỗi người để thể hiện vẻ đẹp bản thân theo nhiều cách. Chúng tôi mong muốn giúp đỡ cộng đồng ĐẸP bằng việc kết nối mọi cá nhân, tổ chức trong lĩnh vực làm đẹp để cùng sẻ chia và trải nghiệm.</p>
          <p>Bzone là công cụ dành cho chuyên gia và công chúng thông qua nền tảng website và ứng dụng điện thoại. Chúng tôi giúp bạn tìm kiếm và đặt lịch hẹn tới các dịch vụ chăm sóc và làm đẹp, hair salon, spa và các stylist chuyên nghiệp.</p>
          <p>Bzone đặc biệt chú ý đến chất lượng của các cửa hàng và thương hiệu cùng hợp tác, vì vậy bạn có thể hoàn toàn an tâm về những địa chỉ được gợi ý với chất lượng hoàn hảo cùng mức giá hợp lý nhất.</p>
          <p>Không đơn thuần là một trang booking, Bzone mong muốn trở thành người bạn chân thành, giúp cho việc chăm sóc bản thân của bạn trở nên dễ dàng hơn, có thể dành nhiều thời gian hơn để cảm nhận niềm vui trong cuộc sống.</p>
          <p class="sub-heading">BZONE - <em>Cộng đồng dành cho những trái tim Đẹp.</em></p>
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
  name: 'About',
  components: {
    PageHeader,
    PageFooter
  },
  metaInfo: {
    title: 'Về chúng tôi'
  }
}
</script>

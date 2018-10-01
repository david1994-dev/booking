<template>
<div>
  <page-header />
  <div class="static-page">
    <div class="tp-container">
      <div class="content-page">
        <div class="contact-page">
          <div class="address-info">
            <div class="adress">
              Mọi góp ý của bạn đều có ích với cộng đồng làm đẹp và giúp chúng tôi xây dựng sản phẩm và phục vụ bạn tốt hơn. Vui lòng để nội dung thông tin tại đây.
            </div>
            <div class="info">
              <div class="item">
                <div class="icon"><i class="bz-phone"></i></div>
                <div class="name-value">
                  <div class="name">Hotline</div>
                  <div class="value">(024) 6297 9933</div>
                </div>
              </div>
              <div class="item">
                <div class="icon"><i class="bz-fax"></i></div>
                <div class="name-value">
                  <div class="name">Fax</div>
                  <div class="value">(024) 6297 9933</div>
                </div>
              </div>
              <div class="item">
                <div class="icon"><i class="bz-global"></i></div>
                <div class="name-value">
                  <div class="name">Web</div>
                  <div class="value">www.bzone.vn</div>
                </div>
              </div>
              <div class="item">
                <div class="icon"><i class="bz-email"></i></div>
                <div class="name-value">
                  <div class="name">E-Mail</div>
                  <div class="value">contact@bzone.vn</div>
                </div>
              </div>
            </div>
          </div>

          <div class="wrap-form">
            <div class="title-form">Thông tin liên hệ</div>
            <form @submit.prevent="submit">
              <div class="name-email">
                <input class="txt-field" type="text" name="name" v-model="name" placeholder="Họ & tên" />
                <input class="txt-field" type="email" name="email" v-model="email"  placeholder="Email" />
              </div>
              <input class="txt-field" type="text" name="subject" v-model="subject"  placeholder="Tiêu đề" />
              <textarea rows="7" placeholder="Nội dung" name="content" v-model="content"  class="txt-field tae-field"></textarea>
              <input class="tp-btn btn-submit" type="submit" value="Gửi" />
            </form>
          </div>
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
  name: 'Contact',
  components: {
    PageHeader,
    PageFooter
  },
  metaInfo: {
    title: 'Liên hệ'
  },
  data () {
    return {
      name: '',
      email: '',
      subject: '',
      content: ''
    }
  },
  methods: {
    submit () {

    }
  }
}
</script>

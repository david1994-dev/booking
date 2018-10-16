<template>
  <div>
    <page-header/>
    <div class="static-page">
      <div class="tp-container">
        <div class="content-page">
          <div class="contact-page">
            <div class="address-info">
              <div class="adress">
                Mọi góp ý của bạn đều có ích với cộng đồng làm đẹp và giúp chúng tôi xây dựng sản phẩm
                và phục vụ bạn tốt hơn. Vui lòng để nội dung thông tin tại đây.
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
              <form novalidate @submit.prevent="submit">
                <div class="name-email">
                  <div class="form-row">
                  <input v-validate="'required|min:3'"
                         v-model="name"
                         :data-vv-as="$t('auth.salon_name')"
                         :class="{ 'is-invalid': errors.has('name') }"
                         class="txt-field form-control" type="text" name="name"
                         placeholder="Họ & tên" required/>
                  </div>
                  <input
                    v-validate="'required|email'"
                    class="txt-field form-control"
                    type="email" name="email"
                    v-model="email"
                    :data-vv-as="$t('auth.phone_number')"
                    :class="{ 'is-invalid': errors.has('email') }"
                    placeholder="Email"/>
                </div>
                <input v-validate="'required|min:3'"
                       :class="{ 'is-invalid': errors.has('subject') }"
                       class="txt-field form-control" type="text" name="subject" v-model="subject" placeholder="Tiêu đề"/>
                <textarea rows="7" v-validate="'required|min:3'"
                          :class="{ 'is-invalid': errors.has('content') }"
                          placeholder="Nội dung" name="content" v-model="content"
                          class="txt-field tae-field form-control"></textarea>
                <input class="tp-btn btn-submit" type="submit" value="Gửi" :disabled="$isLoading('send contacts')" />
                <br/>
                <div v-if="alert">
                  <div class="alert alert-primary" v-if="success" role="alert">
                    Gửi thông tin liên hệ thành công !
                  </div>
                  <div class="alert alert-danger" v-if="!success" role="alert">
                    Đã xảy ra lỗi vui lòng thử lại sau !
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <page-footer/>
  </div>
</template>

<script>
  import PageHeader from '../layout/Header'
  import PageFooter from '../layout/Footer'
  // import axios from 'axios'

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
        alert: false,
        success: true,
        name: '',
        email: '',
        subject: '',
        content: ''
      }
    },
    methods: {
      resetState () {
        this.name = ''
        this.email = ''
        this.subject = ''
        this.content = ''
      },
      submit () {
        if (!this.isDisabled) {
          this.$validator.validateAll().then((result) => {
            if (result) {
              this.isDisabled = false
              let data = {
                name: this.name,
                email: this.email,
                subject: this.subject,
                content: this.content
              }

              this.$startLoading('send contacts')
              this.$http.post('contacts', data).then(() => {
                this.$endLoading('send contacts')
                this.success = true
                this.alert = true
                this.resetState()

                this.$ga.page({
                  page: '/contact/success',
                  title: 'Contact send success',
                  location: window.location.href
                })
              }).catch(({ response }) => {
                this.$endLoading('send contacts')
                if (response.data.errors) {
                  this.updateValidationMessage(response.data.errors)
                }
                this.success = false
                this.alert = true
              })
            } else {
              alert('Vui lòng nhập đầy đủ thông tin')
            }
          })
        }
      }
    }
  }
</script>

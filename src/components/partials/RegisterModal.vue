<template>
<b-modal id="modal-choice-account"
  ref="registerModal"
  :hideHeader="true"
  :hideFooter="true">
  <i class="bz-close tp-modal-close" @click="hide"></i>
    <div class="modal-body-inner">
      <div v-show="!salonRegister">
        <div class="salon">
          <div class="des">Đăng ký với tư cách chủ salon?</div>
          <div class="tp-btn" @click="salonRegister = true">Đăng ký chủ salon</div>
        </div>
        <div class="user">
          <div class="des">Đăng ký với tư cách khách hàng?</div>
          <p>Bạn hoàn toàn không cần đăng ký tài khoản mà vẫn có thể được lịch làm đẹp!</p>
          <router-link class="tp-btn" :to="{ name: 'explore' }">Tìm lịch làm đẹp</router-link>
        </div>
      </div>
      <div v-show="salonRegister">
        <div v-if="success">
          <div class="tp-title-form">Thank you!</div>
          <div class="tp-des-form">Cảm ơn bạn đã đăng ký. Vui lòng chờ đại diện của Bzone sẽ liên hệ & giúp bạn xác nhận thông tin trong vòng 24h làm việc sắp tới.</div>
        </div>
        <form novalidate v-else @submit.prevent="submit">
          <div class="tp-title-form">Đăng ký chủ Salon</div>
          <div class="tp-des-form">60 giây để đăng ký một công cụ quản lý Salon chuyên nghiệp</div>
          <input class="tp-text-form form-control"
            type="text"
            name="name"
            placeholder="Tên salon"
            v-model="name"
            v-validate="'required'"
            data-vv-as="Tên salon"
            :class="{ 'is-invalid': errors.has('name') }" />
          <div class="text-left invalid-feedback">{{ errors.first('name') }}</div>
          <input class="tp-text-form form-control"
            type="text"
            name="address"
            v-validate="'required'"
            v-model="address"
            data-vv-as="Địa chỉ salon"
            placeholder="Địa chỉ salon"
            :class="{ 'is-invalid': errors.has('address') }" />
          <div class="text-left invalid-feedback">{{ errors.first('address') }}</div>
          <input class="tp-text-form form-control"
            type="text"
            name="phone"
            v-validate="'required'"
            v-model="phone"
            data-vv-as="Số điện thoại"
            placeholder="Số điện thoại"
            :class="{ 'is-invalid': errors.has('phone') }" />
          <div class="text-left invalid-feedback">{{ errors.first('phone') }}</div>
          <input class="tp-btn" type="submit" :disabled="$isLoading('creating salon')" value="Đăng ký">
        </form>
      </div>
    </div>
</b-modal>
</template>

<script>
import { forEach } from 'lodash'

export default {
  name: 'RegisterModal',
  data () {
    return {
      salonRegister: false,
      success: false,
      name: '',
      address: '',
      phone: ''
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hidden', ({ vueTarget }) => {
      if (vueTarget.id === 'modal-choice-account') {
        this.salonRegister = false
        this.success = false
      }
    })
  },
  methods: {
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const postData = {
            name: this.name,
            address: this.address,
            hotline: this.phone
          }
          this.$startLoading('creating salon')
          this.$http.post('salons', postData).then(() => {
            this.$endLoading('creating salon')
            this.success = true
            this.resetState()
          }).catch(({ response }) => {
            if (response.data.errors) {
              this.updateValidationMessage(response.data.errors)
            }
            this.success = false
            this.$endLoading('creating salon')
          })
        }
      })
    },
    resetState () {
      this.name = ''
      this.address = ''
      this.phone = ''
      // this.salonRegister = false
    },
    hide () {
      this.$refs.registerModal.hide()
    },
    updateValidationMessage (errors) {
      forEach(errors, (messages, field) => {
        if (field === 'hotline') {
          this.errors.add('phone', messages.join('\n'))
        } else {
          this.errors.add(field, messages.join('\n'))
        }
      })
    }
  }
}
</script>

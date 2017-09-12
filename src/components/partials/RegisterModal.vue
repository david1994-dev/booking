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
          <p>Bạn hoàn toàn không cần đăng ký tài khoản mã vẫn có thể được lịch làm đẹp!</p>
          <router-link class="tp-btn" :to="{ name: 'explore' }">Tìm lịch làm đẹp</router-link>
        </div>
      </div>
      <form novalidate
        v-show="salonRegister"
        @submit.prevent="submit">
        <div class="tp-title-form">Đăng ký chủ Salon</div>
        <div class="tp-des-form">60 giây để đăng ký một công cụ quản lý Salon chuyên nghiệp</div>
        <input class="tp-text-form form-control"
          type="text"
          name="name"
          placeholder="Tên salon"
          v-validate="'required'"
          data-vv-as="Tên salon"
          :class="{ 'is-invalid': errors.has('name') }" />
        <div class="invalid-feedback">{{ errors.first('name') }}</div>
        <input class="tp-text-form form-control"
          type="text"
          name="address"
          v-validate="'required'"
          data-vv-as="Địa chỉ salon"
          placeholder="Địa chỉ salon"
          :class="{ 'is-invalid': errors.has('address') }" />
        <div class="invalid-feedback">{{ errors.first('address') }}</div>
        <input class="tp-text-form form-control"
          type="text"
          name="owner"
          v-validate="'required'"
          data-vv-as="Người đại diện"
          placeholder="Người đại diện"
          :class="{ 'is-invalid': errors.has('owner') }" />
        <div class="invalid-feedback">{{ errors.first('owner') }}</div>
        <input class="tp-text-form form-control"
          type="text"
          name="phone"
          v-validate="'required'"
          data-vv-as="Số điện thoại"
          placeholder="Số điện thoại"
          :class="{ 'is-invalid': errors.has('phone') }" />
        <div class="invalid-feedback">{{ errors.first('phone') }}</div>
        <input class="tp-btn" type="submit" value="Đăng ký">
      </form>
    </div>
</b-modal>
</template>

<script>
export default {
  name: 'RegisterModal',
  data () {
    return {
      salonRegister: false
    }
  },
  mounted () {
    this.$root.$on('hidden::modal', modal => {
      if (modal === 'modal-choice-account') {
        setTimeout(() => {
          this.salonRegister = false
        }, 800)
      }
    })
  },
  methods: {
    submit () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          console.log('ok')
        }
      })
    },
    hide () {
      this.$refs.registerModal.hide()
    }
  }
}
</script>

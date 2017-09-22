<template>
<div class="modal-body-inner">
  <form novalidate
    autocomplete="off"
    v-if="step == 'init'"
    @submit.prevent="createBooking">
    <div class="tp-title-form">Vui lòng nhập số điện thoại</div>
    <div class="tp-des-form">Hệ thống sẽ gửi mã xác nhận tới số điện thoại này của bạn</div>
    <input class="tp-text-form form-control" type="text"
      v-model="phone"
      name="phone"
      v-validate="'required'"
      data-vv-as="Số điện thoại"
      placeholder="Số điện thoại"
      :class="{ 'is-invalid': errors.has('phone') }" />
    <div class="invalid-feedback">{{ errors.first('phone') }}</div>
    <input class="tp-btn" type="submit" value="Xác nhận đặt lịch">
  </form>

  <form novalidate
    autocomplete="off"
    @submit.prevent="createOrUpdateAccount"
    v-if="step == 'registration'">
    <div class="tp-title-form">Đặt lịch lần đầu?</div>
    <div class="tp-des-form">Hệ thống cần biết thêm thông tin của bạn để phục vụ tốt hơn</div>
    <input class="tp-text-form form-control" type="text"
      v-model="phone"
      name="phone"
      v-validate="'required'"
      data-vv-as="Số điện thoại"
      placeholder="Số điện thoại"
      :readonly="user"
      :class="{ 'is-invalid': errors.has('phone') }" />
    <div class="invalid-feedback">{{ errors.first('phone') }}</div>
    <input class="tp-text-form form-control" type="text"
      v-model="name"
      v-validate="'required'"
      name="name"
      data-vv-as="Họ tên"
      placeholder="Họ tên"
      :class="{ 'is-invalid': errors.has('name') }" />
    <div class="invalid-feedback">{{ errors.first('name') }}</div>
    <input class="tp-text-form form-control" type="email"
      v-model="email"
      v-validate="'required|email'"
      data-vv-as="Email"
      name="email"
      placeholder="Email"
      :class="{ 'is-invalid': errors.has('email') }" />
    <div class="invalid-feedback">{{ errors.first('email') }}</div>
    <input class="tp-btn" type="submit" value="Xác nhận">
  </form>

  <form novalidate
    autocomplete="off"
    v-if="step == 'verification' && phone"
    @submit.prevent="verifyThenCreateBooking">
    <div class="tp-title-form">Nhập Code để xác nhận SĐT</div>
    <div class="tp-des-form">Hệ thống vừa gửi một mã xác nhận tới <span class="phone-number">{{ phone }}</span> vui lòng xác nhận vào ô bên dưới</div>
    <input class="tp-text-form form-control" type="text"
      v-model="code"
      v-validate="'required'"
      data-vv-as="Code"
      name="code"
      placeholder="Nhập code"
      :class="{ 'is-invalid': errors.has('code') }" />
    <div class="invalid-feedback">{{ errors.first('code') }}</div>
    <input class="tp-btn" type="submit" value="Xác nhận">
    <div class="tp-send-form"><a href="#">Gửi lại mã xác nhận</a></div>
  </form>

  <div v-if="step == 'success'" class="tp-modal-success">
    <div class="name-success">Đăng ký thành công!</div>
    <div class="des-success">Cảm ơn bạn đã sử dụng dịch vụ của Bzone. Vui lòng kiểm tra email & SMS và tới trước lịch hẹn 5 phút</div>
    <div class="name-mobile">Quản lý dễ hơn với ứng dụng mobile</div>
    <div class="des-mobile">(Dự kiến ra mắt tháng 10.2017)</div>
    <div class="img-mobile"><a style="pointer-events: none;" href="#"><img width="150" src="../../assets/images/app-store.png" /></a></div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { reduce } from 'lodash'

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default {
  name: 'BookingModal',
  computed: mapGetters(['cartSalon', 'cartServices', 'cartStylist', 'bookingDate']),
  data () {
    return {
      user: 0,
      step: 'init',
      phone: '',
      email: '',
      name: '',
      code: '',
      token: ''
    }
  },
  mounted () {
    this.$root.$on('hidden::modal', modal => {
      if (modal === 'modal-booking') {
        this.step = 'init'
        this.resetState()
      }
    })
  },
  methods: {
    createBooking () {
      if (!this.phone) {
        return
      }

      const slots = reduce(this.cartServices, (result, { id }) => {
        result.push({
          service: id,
          stylist: this.cartStylist.id
        })
        return result
      }, [])
      const data = {
        user: this.phone,
        slots: JSON.stringify(slots),
        time: this.bookingDate.format(DATE_FORMAT)
      }
      this.$startLoading('booking')
      this.$http.post(`salons/${this.cartSalon.id}/book`, data, { headers: { 'X-Implicit-Booking': 1 } }).then(({ data, status, headers }) => {
        this.$endLoading('booking')
        if (status === 202) {
          this.token = headers['x-verification-token'] || ''
          this.email = data.email
          this.name = data.name
          this.user = data.id
          this.step = 'registration'
        } else {
          this.resetState()
          this.$store.dispatch('emptyCart')
          this.step = 'success'
        }
      }).catch(({ response }) => {
        console.log(this.$errors)
        this.$endLoading('booking')
        if (response.status === 404) {
          this.step = 'registration'
        }
      })
    },
    verifyThenCreateBooking () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$http.post('users/verify', { token: this.token, code: this.code }).then(() => {
            this.createBooking()
          })
        }
      })
    },
    createOrUpdateAccount () {
      if (this.user) {
        this.updateAccount()
      } else {
        this.createAccount()
      }
    },
    createAccount () {
      // if (!this.phone || !this.email || !this.name) {
      //   return
      // }

      this.$validator.validateAll().then((result) => {
        if (result) {
          const data = {
            name: this.name,
            email: this.email,
            phone_number: this.phone,
            country_code: 'VN'
          }
          this.$http.post('users', data).then(({ headers }) => {
            this.token = headers['x-verification-token'] || ''
            this.step = 'verification'
          })
        }
      })
    },
    updateAccount () {
      if (!this.user || !this.token) {
        return
      }

      this.$validator.validateAll().then((result) => {
        if (result) {
          const data = {
            name: this.name,
            email: this.email,
            phone_number: this.phone,
            country_code: 'VN'
          }
          this.$http.put(`users/${this.user}`, data, { headers: { 'X-Verification-Token': this.token } }).then(() => {
            this.step = 'verification'
          })
        }
      })
    },
    resetState () {
      this.user = 0
      this.phone = ''
      this.email = ''
      this.name = ''
      this.code = ''
      this.token = ''
    }
  }
}
</script>

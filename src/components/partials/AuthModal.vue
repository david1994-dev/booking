<template>
<div class="modal-body-inner">
  <div v-show="step == 'init'">
    <div class="tp-title-form">Vui lòng nhập số điện thoại</div>
    <div class="tp-des-form">Hệ thống sẽ gửi mã xác nhận tới số điện thoại này của bạn</div>
    <input class="tp-text-form" type="text"
      v-model="phone"
      name="phone"
      v-validate="'required'"
      placeholder="Số điện thoại" />
    <input class="tp-btn" type="submit" value="Xác nhận đặt lịch" @click="createBooking">
  </div>
  <div v-show="step == 'registration'">
    <div class="tp-title-form">Đặt lịch lần đầu?</div>
    <div class="tp-des-form">Hệ thống cần biết thêm thông tin của bạn để phục vụ tốt hơn</div>
    <input class="tp-text-form" type="text"
      v-model="phone"
      name="phone"
      v-validate="'required'"
      placeholder="Số điện thoại" />
    <input class="tp-text-form" type="text"
      v-model="name"
      v-validate="'required'"
      name="name"
      placeholder="Họ tên" />
    <input class="tp-text-form" type="email"
      v-model="email"
      v-validate="'required|email'"
      name="email"
      placeholder="Email" />
    <input class="tp-btn" type="submit" value="Xác nhận" @click="createAccount">
  </div>
  <div v-show="step == 'verification' && phone">
    <div class="tp-title-form">Nhập Code để xác nhận SĐT</div>
    <div class="tp-des-form">Hệ thống vừa gửi một mã xác nhận tới <span class="phone-number">{{ phone }}</span> vui lòng xác nhận vào ô bên dưới</div>
    <input class="tp-text-form" type="text"
      v-model="code"
      v-validate="'required'"
      name="code"
      placeholder="Nhập code" />
    <input class="tp-btn" type="submit" value="Xác nhận" @click="verifyThenCreateBooking">
    <div class="tp-send-form"><a href="#">Gửi lại mã xác nhận</a></div>
  </div>
  <div v-show="step == 'success'" class="tp-modal-success">
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
  name: 'AuthModal',
  computed: mapGetters(['cartSalon', 'cartServices', 'cartStylist', 'bookingDate']),
  data () {
    return {
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
          stylist: this.cartStylist.id,
          date: this.bookingDate.format(DATE_FORMAT)
        })
        return result
      }, [])
      const data = {
        user: this.phone,
        slots: JSON.stringify(slots)
      }
      this.$startLoading('booking')
      this.$http.post(`salons/${this.cartSalon.id}/book`, data, { headers: { 'X-Implicit-Booking': 1 } }).then(({ data }) => {
        this.$endLoading('booking')
        this.resetState()
        this.$store.dispatch('emptyCart')
        this.step = 'success'
      }).catch(({ response }) => {
        this.$endLoading('booking')
        if (response.status === 404) {
          this.step = 'registration'
        }
        if (response.status === 403) {
          this.token = response.headers['x-verification-token'] || ''
          this.step = 'verification'
        }
      })
    },
    verifyThenCreateBooking () {
      this.$http.post('users/verify', { token: this.token, code: this.code }).then(() => {
        this.createBooking()
      })
    },
    createAccount () {
      if (!this.phone || !this.email || !this.name) {
        return
      }
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
    },
    resetState () {
      this.phone = ''
      this.email = ''
      this.name = ''
      this.code = ''
      this.token = ''
    }
  }
}
</script>

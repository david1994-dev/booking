<template>
<div class="modal-body-inner">
  <form novalidate
    autocomplete="off"
    v-if="step == 'init'"
    @submit.prevent="createBooking">
    <div class="tp-title-form">{{ $t('salon.enter_the_phone_number') }}</div>
    <div class="tp-des-form">{{ $t('salon.sent_verified_code_to_phone') }}</div>
    <input class="tp-text-form form-control" type="text"
      v-model="username"
      name="username"
      v-validate="'required'"
      :data-vv-as="$t('salon.validate_phone_number')"
      :placeholder="$t('salon.phone_number')"
      :class="{ 'is-invalid': errors.has('phone') }" />
    <div class="invalid-feedback">{{ errors.first('phone') }}</div>
    <input class="tp-btn" type="submit" :value="$t('salon.make_an_appointment')">
  </form>

  <form novalidate
    autocomplete="off"
    @submit.prevent="createOrUpdateAccount"
    v-if="step == 'registration'">
    <div class="tp-title-form">{{ $t('salon.first_time_booking') }}</div>
    <div class="tp-des-form">{{ $t('salon.need_more_information') }}</div>
    <input class="tp-text-form form-control" type="text"
      v-model="phone"
      name="phone"
      v-validate="required == 'phone' ? 'required' : '' "
      :data-vv-as="$t('salon.phone_number')"
      :placeholder="$t('salon.phone_number')"
      :readonly="required == 'phone'"
      :class="{ 'is-invalid': errors.has('phone') }" />
    <div class="invalid-feedback">{{ errors.first('phone') }}</div>
    <input class="tp-text-form form-control" type="text"
      v-model="name"
      v-validate="'required|min:3'"
      name="name"
      :data-vv-as="$t('salon.name')"
      :placeholder="$t('salon.name')"
      :class="{ 'is-invalid': errors.has('name') }" />
    <div class="invalid-feedback">{{ errors.first('name') }}</div>
    <input class="tp-text-form form-control" type="email"
      v-model="email"
      v-validate="required == 'email' ? 'required|email' : '' "
      data-vv-as="Email"
      name="email"
      placeholder="Email"
      :readonly="required == 'email'"
      :class="{ 'is-invalid': errors.has('email') }" />
    <div class="invalid-feedback">{{ errors.first('email') }}</div>
    <input class="tp-btn" type="submit" :value="$t('salon.submit')">
  </form>

  <form novalidate
    autocomplete="off"
    v-if="step == 'verification' && (phone || email)"
    @submit.prevent="verifyThenCreateBooking">
    <div class="tp-title-form">{{ $t('auth.enter_verified_code') }}</div>
    <div class="tp-des-form">{{ $t('auth.we_sent_verified') }}: <strong>{{  username }}</strong>. {{ $t('auth.enter_the_verified_code') }}
    </div>
    <input class="tp-text-form form-control" type="text"
      v-model="code"
      v-validate="'required'"
      data-vv-as="Code"
      name="code"
      ::placeholder="$t('auth.enter_code')"
      :class="{ 'is-invalid': errors.has('code') }" />
    <div class="invalid-feedback">{{ errors.first('code') }}</div>
    <input class="tp-btn" type="submit" :value="$t('salon.submit')">
    <div class="tp-send-form">
      <div><a href="#" @click.prevent="resendVerificationCode">{{ $t('auth.resend') }}</a></div>
      <div><a @click.prevent="step = 'init'" class="pointer">{{ $t('auth.back') }}</a></div>
    </div>
  </form>

  <div v-if="step == 'success'" class="tp-modal-success">
    <div class="name-success">{{ $t('auth.success') }}</div>
    <div class="des-success">{{ $t('auth.thank_and_wait') }}</div>
    <div class="name-mobile">{{ $t('auth.easily_manageable_on_app') }}</div>
    <div class="des-mobile">({{ $t('auth.app_comming_soon') }})</div>
    <div class="img-mobile"><a style="pointer-events: none;" href="#"><img width="150" src="../../assets/images/app-store.png" /></a></div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { forEach, reduce } from 'lodash'
import { mixpanelProjectToken } from '@/config'
import mixpanel from 'mixpanel-browser'

const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'

export default {
  name: 'BookingModal',
  computed: mapGetters(['cartSalon', 'cartServices', 'cartStylist', 'bookingDate', 'promoCode']),
  data () {
    return {
      user: 0,
      step: 'init',
      phone: '',
      email: '',
      name: '',
      code: '',
      token: '',
      username: '',
      required: ''
    }
  },
  mounted () {
    this.$root.$on('bv::modal::hidden', ({ vueTarget }) => {
      if (vueTarget.id === 'modal-booking') {
        this.step = 'init'
        this.resetState()
      }
    })
  },
  methods: {
    createBooking () {
      mixpanel.init(mixpanelProjectToken)
      mixpanel.track(
        'Click vào xác nhận đặt lịch'
      )
      if (!this.username) {
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
        username: this.username,
        slots: JSON.stringify(slots),
        time: this.bookingDate.format(DATE_FORMAT)
      }
      if (this.promoCode.id) {
        data.promo = this.promoCode.id
      }
      this.$startLoading('booking')
      this.$http.post(`salons/${this.cartSalon.id}/book`, data, { headers: { 'X-Implicit-Booking': 1 } }).then(({ data, status, headers }) => {
        this.$endLoading('booking')
        if (status === 202) {
          if (/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(this.username)) {
            this.email = this.username
            this.required = 'email'
          } else {
            this.phone = this.username
            this.required = 'phone'
          }
          this.token = headers['x-verification-token'] || ''
          this.email = data.email
          this.name = data.name
          this.user = data.id
          this.step = 'registration'
        } else {
          this.resetState()
          this.$store.dispatch('emptyCart')
          this.step = 'success'
          this.$bus.$emit('booking::completed')
          mixpanel.init(mixpanelProjectToken)
          mixpanel.track('Pop-up thành công của SDT cũ')
        }
      }).catch(({ response }) => {
        this.$endLoading('booking')
        if (response.data.errors) {
          this.updateValidationMessage(response.data.errors)
        }
        if (response.status === 404) {
          if (/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm.test(this.username)) {
            this.email = this.username
            this.required = 'email'
          } else {
            this.phone = this.username
            this.required = 'phone'
          }
          this.step = 'registration'
        }
      })
    },
    verifyThenCreateBooking () {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.$http.post('users/verify', { code: this.code }, { headers: { 'X-Verification-Token': this.token } }).then(() => {
            this.createBooking()
            mixpanel.init(mixpanelProjectToken)
            mixpanel.track(
              'Pop-up thành công của SDT mới'
            )
          }).catch(({ response }) => {
            if (response.data.errors) {
              this.updateValidationMessage(response.data.errors)
            }
            if (response.status === 404) {
              this.errors.add('code', 'Mã xác nhận không hợp lệ.')
            }
          })
        }
      })
    },
    createOrUpdateAccount () {
      mixpanel.init(mixpanelProjectToken)
      mixpanel.track(
        'SDT mới click vào xác nhận'
      )
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
          }).catch(({ response }) => {
            if (response.data.errors) {
              this.updateValidationMessage(response.data.errors)
            }
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
          this.$http.put(`users/${this.user}`, data, { headers: { 'X-Verification-Token': this.token } }).then(({ headers }) => {
            this.token = headers['x-verification-token'] || ''
            this.step = 'verification'
          }).catch(({ response }) => {
            if (response.data.errors) {
              this.updateValidationMessage(response.data.errors)
            }
          })
        }
      })
    },
    resendVerificationCode () {
      this.$http.post('users/verification-code', {}, { headers: { 'X-Verification-Token': this.token } }).then(response => {
        // Success message
      }).catch(({ response }) => {
        if (response.data.errors) {
          this.updateValidationMessage(response.data.errors)
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
    },
    updateValidationMessage (errors) {
      forEach(errors, (messages, field) => {
        if (field === 'user') {
          this.errors.add('phone', messages.join('\n'))
        } else {
          this.errors.add(field, messages.join('\n'))
        }
      })
    }
  }
}
</script>

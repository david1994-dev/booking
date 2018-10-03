<template>
  <b-modal id="modal-choice-account"
           ref="registerModal"
           :hideHeader="true"
           :hideFooter="true"
           :no-close-on-esc="notClose"
           :no-enforce-focus="notClose"
           :no-close-on-backdrop="notClose">
    <i class="bz-close tp-modal-close" v-if="!success" @click="hide"></i>
    <div class="modal-body-inner">
      <div v-show="!salonRegister">
        <div class="salon">
          <div class="des">{{ $t('auth.register_as_salon') }}</div>
          <div class="tp-btn" @click="salonRegister = true">{{ $t('auth.register') }}</div>
        </div>
        <div class="user">
          <div class="des">{{ $t('auth.register_as_user') }}</div>
          <p>{{ $t('auth.easily_book') }}</p>
          <a href="#" class="tp-btn" v-if="$route.name === 'explore'" @click.prevent="hide">{{ $t('common.search')
            }}</a>
          <router-link class="tp-btn" v-else :to="{ name: 'explore' }">{{ $t('common.search') }}</router-link>
        </div>
      </div>

      <div v-show="salonRegister">
        <div v-if="success">
          <!--<div class="tp-title-form">Thank you!</div>-->
          <!--<div class="tp-des-form">{{ $t('auth.thank_for_salon_register') }}</div>-->
          <!--<div class="img-mobile"><a target="_blank" :href="salonMobileAppUrl"><img width="150"-->
          <!--src="../../assets/images/app-store.png"/></a>-->
          <!--</div>-->
          <div class="tp-modal-success">
            <div class="name-success">{{ $t('auth.success')}}</div>
            <div class="gift-bzone">
              <div class="title-gift">{{ $t('auth.gift')}}</div>
              <ul>
                <li v-html="$t('auth.gift_line_1')"></li>
                <li v-html="$t('auth.gift_line_2')"></li>
                <li v-html="$t('auth.gift_line_3')"></li>
              </ul>
            </div>
            <div class="complete-info" v-html="$t('auth.success_info_desc')">
            </div>
            <a href="#" class="tp-btn" :disabled="counting" @click="countdown">
              <countdown v-if="counting" :time="5000" @countdownend="countdownend">
                <template slot-scope="props">{{ $t('auth.redirect',{seconds: props.seconds || 5 })}}</template>
              </countdown>
            </a>
          </div>
        </div>
        <div v-else-if="confirmCode">
          <form novalidate @submit.prevent="verify">
            <div class="tp-title-form">{{ $t('auth.enter_code_salon') }}</div>
            <div class="tp-des-form" v-html="$t('auth.des_code_salon', {phone: verifyData.phone_number})">
            </div>
            <input class="tp-text-form form-control"
                   type="text"
                   name="code"
                   :placeholder="$t('auth.enter_code')"
                   v-model="verification_code"
                   v-validate="'required|min:6'"
                   :data-vv-as="$t('auth.enter_code')"
                   :class="{ 'is-invalid': errors.has('verification_code') }" title="code"/>
            <div class="text-left invalid-feedback">{{ errors.first('verification_code') }}</div>
            <br/>
            <input class="tp-btn" type="submit" value="Xác nhận">
            <div class="tp-send-form">
              <a href="#" :disabled="countingResend" @click="countDownResend">
                <countdown v-if="countingResend" :time="60000" @countdownend="countDownResendEnd">
                  <template slot-scope="props">{{ $t('auth.resend_seconds',{seconds: props.seconds || 60 })}}</template>
                </countdown>
                <span v-else>{{$t('auth.resend')}}</span>
              </a>
            </div>
            <div class="tp-back-form" @click="confirmCode = false">{{$t('auth.back')}}</div>
          </form>
        </div>
        <form novalidate v-else @submit.prevent="submit">
          <div class="tp-title-form">{{ $t('auth.register_as_salon') }}</div>
          <div class="tp-des-form">{{ $t('auth.register_salon_60s') }}</div>
          <input class="tp-text-form form-control"
                 type="text"
                 name="name"
                 :placeholder="$t('auth.salon_name')"
                 v-model="name"
                 v-validate="'required|min:3'"
                 :data-vv-as="$t('auth.salon_name')"
                 :class="{ 'is-invalid': errors.has('name') }" title="name"/>
          <div class="text-left invalid-feedback">{{ errors.first('name') }}</div>
          <input class="tp-text-form form-control"
                 type="text"
                 name="address"
                 v-validate="'required|min:3'"
                 v-model="address"
                 :data-vv-as="$t('auth.salon_address')"
                 :placeholder="$t('auth.salon_address')"
                 :class="{ 'is-invalid': errors.has('address') }" title="address"/>
          <div class="text-left invalid-feedback">{{ errors.first('address') }}</div>
          <input class="tp-text-form form-control"
                 type="text"
                 name="representatives"
                 v-validate="'required|min:5'"
                 v-model="representatives"
                 :data-vv-as="$t('auth.representatives')"
                 :placeholder="$t('auth.representatives')"
                 :class="{ 'is-invalid': errors.has('representatives') }" title="representatives"/>
          <div class="text-left invalid-feedback">{{ errors.first('representatives') }}</div>
          <input class="tp-text-form form-control"
                 type="text"
                 name="phone"
                 v-validate="'required'"
                 v-model="phone"
                 :data-vv-as="$t('auth.phone_number')"
                 :placeholder="$t('auth.phone_number')"
                 :class="{ 'is-invalid': errors.has('phone') }" title="phone"/>
          <div class="text-left invalid-feedback">{{ errors.first('phone') }}</div>
          <input class="tp-text-form form-control"
                 type="password"
                 name="password"
                 v-validate="'required|min:6'"
                 v-model="password"
                 :data-vv-as="$t('auth.password')"
                 :placeholder="$t('auth.password')"
                 :class="{ 'is-invalid': errors.has('password') }" title="password"/>
          <div class="text-left invalid-feedback">{{ errors.first('password') }}</div>
          <input class="tp-text-form form-control"
                 type="password"
                 name="password_confirmation"
                 v-validate="'required|confirmed:password|min:6'"
                 v-model="password_confirmation"
                 :data-vv-as="$t('auth.password_confirmation')"
                 :placeholder="$t('auth.password_confirmation')"
                 :class="{ 'is-invalid': errors.has('password_confirmation') }" title="password confirm"/>
          <div class="text-left invalid-feedback">{{ errors.first('password_confirmation') }}</div>
          <label class="tp-checkbox-txt">
            <div class="tp-checkbox"><input type="checkbox" v-model="checkTerm"><span/></div>
            <span v-html="$t('auth.term', {url:'#'})"></span>
          </label>
          <input class="tp-btn mw-100 btn" type="submit" :disabled="($isLoading('creating salon') || !checkTerm)"
                 :value="$t('auth.register')">
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import {forEach} from 'lodash'
  import countdown from '@xkeshi/vue-countdown'
  import {domainUrl} from '../../config'

  let errors = {
    vi: {
      messages: {
        confirmed: () => 'Mật khẩu xác nhận không khớp'
      }
    }
  }

  export default {
    name: 'RegisterModal',
    components: {
      countdown
    },
    data () {
      return {
        salonRegister: false,
        confirmCode: false,
        success: false,
        name: '',
        representatives: '',
        address: '',
        password: '',
        password_confirmation: '',
        phone: '',
        verification_code: '',
        checkTerm: false,
        counting: true,
        countingResend: false,
        notClose: false,
        verifyData: {}
      }
    },
    mounted () {
      this.$validator.localize(errors)

      this.$root.$on('bv::modal::hidden', ({vueTarget}) => {
        if (vueTarget.id === 'modal-choice-account') {
          this.salonRegister = false
          this.success = false
          this.counting = false
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
              hotline: this.phone,
              account_name: this.representatives,
              password: this.password,
              password_confirmation: this.password_confirmation
            }

            this.$startLoading('creating salon')
            this.$http.post('salons', postData).then((response) => {
              this.$endLoading('creating salon')
              this.verifyData = response.data
              this.confirmCode = true
              this.countingResend = true
            }).catch(({response}) => {
              if (response.data.errors) {
                this.updateValidationMessage(response.data.errors)
              }
              this.success = false
              this.$endLoading('creating salon')
            })
          }
        })
      },
      verify () {
        this.$startLoading('verify salon')
        this.$http.post('salons/verify', {verification_code: this.verification_code}, {headers: {'X-Verification-Token': this.verifyData.verification_token}}).then((response) => {
          this.$endLoading('verify salon')
          this.confirmCode = false
          this.success = true
          this.countdown()
        }).catch(({response}) => {
          if (response.data.errors) {
            this.updateValidationMessage(response.data.errors)
          }
          this.success = false
          this.$endLoading('creating salon')
        })
      },
      resend () {
        this.$startLoading('resend code salon')
        this.$http.post('salons/resend_code', {phone_number: this.verifyData.phone_number}, {headers: {'X-Verification-Token': this.verifyData.verification_token}}).then((response) => {
          this.$endLoading('resend code salon')
          this.verifyData = response.data
        }).catch(({response}) => {
          this.$endLoading('creating salon')
        })
      },
      resetState () {
        this.name = ''
        this.address = ''
        this.phone = ''
        // this.salonRegister = false
        this.representatives = ''
        this.password = ''
        this.password_confirmation = ''
        this.checkTerm = false
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
      },
      countdown: function () {
        this.counting = true
        this.notClose = true
      },
      countdownend: function () {
        window.location = domainUrl + '/app/login?usr=' + this.phone + '&pass=' + this.password + '&first_login=1'
      },
      countDownResend: function () {
        if (!this.countingResend) {
          this.countingResend = true
          this.resend()
        }
      },
      countDownResendEnd: function () {
        this.countingResend = false
      }
    },
    computed: {
      salonMobileAppUrl () {
        return `${window.location.protocol}//${window.location.host}` + '/redirect?type=salon_mobile_app'
      }
    }
  }
</script>

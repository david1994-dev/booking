<template>
  <b-modal id="modal-choice-account"
           ref="registerModal"
           :hideHeader="true"
           :hideFooter="true">
    <i class="bz-close tp-modal-close" @click="hide"></i>
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
            <div class="name-success">Thank you!</div>
            <div class="des-success">Đăng ký thành công. Vui lòng hoàn thành thông tin về thương hiệu tại PHẦM MỀM QUẢN
              LÝ SALON - chỉ dành cho salon.
            </div>
            <a href="#" class="tp-btn">Chuyển trang trong 5s</a>
            <div class="name-mobile">Bzone Bussiness App - Quản lý salon hiệu quả hơn.</div>
            <div class="img-mobile"><a href="#"><img width="150" src="../../assets/images/app-store.png"/></a></div>
          </div>
        </div>
        <div v-else-if="confirmCode">
          <div class="tp-title-form">Nhập Code để xác nhận tài khoản</div>
          <div class="tp-des-form">Hệ thống vừa gửi một mã xác nhận tới <span class="phone-number">{{phone}}</span>
            vui lòng xác nhận vào ô bên dưới
          </div>
          <input class="tp-text-form" type="text" placeholder="Nhập code"/>
          <input class="tp-btn" type="submit" value="Xác nhận" data-toggle="modal" @click="success = true">
          <div class="tp-send-form"><a href="#">Gửi lại mã xác nhận</a></div>
          <div class="tp-back-form" @click="confirmCode = false">Quay lại</div>
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
                 :class="{ 'is-invalid': errors.has('name') }"/>
          <div class="text-left invalid-feedback">{{ errors.first('name') }}</div>
          <input class="tp-text-form form-control"
                 type="text"
                 name="address"
                 v-validate="'required|min:3'"
                 v-model="address"
                 :data-vv-as="$t('auth.salon_address')"
                 :placeholder="$t('auth.salon_address')"
                 :class="{ 'is-invalid': errors.has('address') }"/>
          <div class="text-left invalid-feedback">{{ errors.first('address') }}</div>
          <input class="tp-text-form form-control"
                 type="text"
                 name="representatives"
                 v-validate="'required|min:3'"
                 v-model="representatives"
                 :data-vv-as="$t('auth.representatives')"
                 :placeholder="$t('auth.representatives')"
                 :class="{ 'is-invalid': errors.has('representatives') }"/>
          <div class="text-left invalid-feedback">{{ errors.first('representatives') }}</div>
          <input class="tp-text-form form-control"
                 type="text"
                 name="phone"
                 v-validate="'required'"
                 v-model="phone"
                 :data-vv-as="$t('auth.phone_number')"
                 :placeholder="$t('auth.phone_number')"
                 :class="{ 'is-invalid': errors.has('phone') }"/>
          <div class="text-left invalid-feedback">{{ errors.first('phone') }}</div>
          <input class="tp-text-form form-control"
                 type="password"
                 name="password"
                 v-validate="'required'"
                 v-model="password"
                 :data-vv-as="$t('auth.password')"
                 :placeholder="$t('auth.password')"
                 :class="{ 'is-invalid': errors.has('password') }"/>
          <div class="text-left invalid-feedback">{{ errors.first('password') }}</div>
          <input class="tp-text-form form-control"
                 type="password"
                 name="password_confirm"
                 v-validate="'required'"
                 v-model="password_confirm"
                 :data-vv-as="$t('auth.password_confirm')"
                 :placeholder="$t('auth.password_confirm')"
                 :class="{ 'is-invalid': errors.has('password_confirm') }"/>
          <div class="text-left invalid-feedback">{{ errors.first('password_confirm') }}</div>
          <label class="tp-checkbox-txt">
            <div class="tp-checkbox"><input type="checkbox"><span></span></div>
            <span>Đăng ký nghĩa là bạn đồng ý với mọi <a href="#">điều khoản dịch vụ</a></span>
          </label>

          <input class="tp-btn" type="submit" :disabled="$isLoading('creating salon')" :value="$t('auth.register')">
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import {forEach} from 'lodash'

  export default {
    name: 'RegisterModal',
    data () {
      return {
        salonRegister: false,
        confirmCode: false,
        success: false,
        name: '',
        address: '',
        phone: ''
      }
    },
    mounted () {
      this.$root.$on('bv::modal::hidden', ({vueTarget}) => {
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
            // const postData = {
            //   name: this.name,
            //   address: this.address,
            //   hotline: this.phone
            // }
            // TODO: call API

            this.confirmCode = true
            // this.$startLoading('creating salon')
            // this.$http.post('salons', postData).then(() => {
            //   this.$endLoading('creating salon')
            //   this.success = true
            //   this.resetState()
            // }).catch(({ response }) => {
            //   if (response.data.errors) {
            //     this.updateValidationMessage(response.data.errors)
            //   }
            //   this.success = false
            //   this.$endLoading('creating salon')
            // })
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
    },
    computed: {
      salonMobileAppUrl () {
        return `${window.location.protocol}//${window.location.host}` + '/redirect?type=salon_mobile_app'
      }
    }
  }
</script>

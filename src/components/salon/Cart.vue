<template>
<div class="wrap-cart">
  <div class="cart">
    <div class="inner-cart">
      <div class="service-c" v-show="cartServices.length">
        <div class="title-service">{{ $t('salon.service') }}</div>
        <div class="list">
          <div class="tp-choice-service" v-for="service in cartServices" :key="service.id">
            <div class="bullet"></div>
            <div class="info">
              <div class="name"><span class="delete" @click="removeServiceFromCart(service)"></span>{{ service.name }}</div>
              <div class="time-price">
                <div class="time">{{ service.duration }} {{ $t('common.minutes') }}</div>
                <div class="price">{{ service.formatted_price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stylist-c" v-show="cartStylist.id">
        <div class="title-stylist">{{ $t('salon.staff')}}</div>
        <div class="wrap">
          <figure><span class="deletez"></span><img :src="cartStylist.avatar_url"></figure>
          <div class="info">
            <strong>{{ cartStylist.name }}</strong>
            <span>{{ cartStylist.name }}</span>
          </div>
        </div>
      </div>

      <div class="time-c" v-show="bookingDate">
        <strong>{{ $t('common.times') }}</strong>
        <span>{{ bookingDate | dateFormat('H:mm D/MM/YYYY') }}</span>
      </div>

      <div class="discount-code" v-show="cartServices.length">
        <div class="tp-discount-code">
          <input type="search" v-model.lazy="code" :placeholder="$t('salon.promo_code')" />
          <p v-show="promoCodeStatus == 'error'" class="error">{{ $t('salon.promocode_exprided') }}</p>
          <p v-show="promoCodeStatus == 'success'" class="success">{{ $t('salon.discounted') }} {{ discount | numberFormat('0,0') }} VNĐ</p>
        </div>
      </div>

      <div class="price-book-c" v-show="cartServices.length">
        <div class="price-c">
          <div class="tp-price-total">
            <div class="price">
              <span>{{ $t('salon.total') }}</span>
              <span>{{ total | numberFormat('0,0') }} VND</span>
            </div>
            <div class="time">
              <span>{{ $t('salon.period_of_execution') }}</span>
              <span>{{ duration }} {{ $t('common.minutes') }}</span>
            </div>
          </div>
        </div>
        <div class="tp-btn-book btn-book" @click="checkout"><i class="bz-book"></i>{{ $t('salon.make_an_appointment') }}</div>
        <div class="not-time" v-show="!bookingDate">{{ $t('salon.choose_service_time') }}</div>
      </div>

      <div class="no-service-c" v-show="!cartServices.length">
        <p>{{ $t('salon.choose_the_service') }}</p>        
        <a class="tp-btn-book red" :href="'tel:'+this.salon.hotline"><i class="bz-phone"></i>{{ $t('salon.call_to_salon') }}</a>
        <a class="tp-btn-book choice-service" href="services" @click.prevent="scrollToServices"><i class="bz-book"></i>{{ $t('salon.select_service') }}</a>
        
      </div>
    </div>
  </div>

  <div class="cart-mobile" :class="{ active: mobileCart }">
    <div class="no-choice-service" v-show="!cartServices.length">
      <a class="tp-btn-book red" :href="'tel:'+this.salon.hotline"><i class="bz-phone"></i>{{ $t('salon.call_to_salon') }}</a>
      <a class="tp-btn-book choice-service" href="services" @click.prevent="scrollToServices">{{ $t('salon.select_service') }}</a>
    </div>

    <div class="wrap-book" v-show="cartServices.length">
      <div class="title-book">
        <span>{{ $t('salon.make_an_appointment') }}</span>
        <i @click="mobileCart = false" class="bz-close close"></i>
      </div>

      <div class="content-book">

        <div class="service-stylist">
          <div class="list-service">
            <div class="tp-choice-service" v-for="service in cartServices" :key="service.id">
              <div class="bullet"></div>
              <div class="info">
                <div class="name"><span class="delete" @click="removeServiceFromCart(service)"></span>{{ service.name }}</div>
                <div class="time-price">
                  <div class="time">{{ service.duration }} {{ $t('common.minutes') }}</div>
                  <div class="price">{{ service.formatted_price }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="list-stylist">
            <div class="name-box">{{ $t('salon.staff') }}</div>
            <v-loading loader="fetching stylists">
              <template slot="spinner">
                <div class="text-center">
                  <v-loading-spinner height="30px" width="30px" />
                </div>
              </template>

              <div class="list" v-if="stylists.length">
                <div class="item" v-for="stylist in stylists"
                  :key="stylist.id"
                  :class="{ active: cartStylist.id == stylist.id }"
                  @click="setStylist(stylist)">
                  <figure><img :src="stylist.avatar_url"></figure>
                  <div class="name">{{ stylist.name }}</div>
                </div>
              </div>
              <div class="text-center" v-else>Không tìm thấy nhân viên phù hợp với dịch vụ được chọn</div>
            </v-loading>
          </div>
          <div class="choice-time">
            <div class="name-chose">
              <div class="name">Thời gian</div>
              <div class="chose" v-show="bookingDate">{{ bookingDate | dateFormat('H:mm D/MM/YYYY') }}</div>
            </div>
            <div class="btn-time" :class="{ active: bookingDate }" @click="$bus.$emit('displayDateTimePopup', true)">{{ $t('salon.choose_the_time') }}</div>
          </div>
          <div class="discount-code">
            <div class="tp-discount-code">
              <input type="search" v-model.lazy="code" :placeholder="$t('salon.promo_code')" />
              <p v-show="promoCodeStatus == 'error'" class="error">{{ $t('salon.promocode_exprided') }}</p>
              <p v-show="promoCodeStatus == 'success'" class="success">{{ $t('salon.discounted') }} {{ discount | numberFormat('0,0') }} VNĐ</p>
            </div>
          </div>
        </div>

        <div class="btn-book">
          <div class="tp-btn-book" @click="mobileCheckout">
            <i class="bz-book"></i>{{ $t('salon.make_an_appointment') }}
          </div>
        </div>

        <div class="des-nochoice" v-show="!bookingDate">{{ $t('salon.choose_service_time') }}</div>

        <div class="price-time">
          <div class="tp-price-total">
            <div class="price">
              <span>{{ $t('salon.total') }}</span>
              <span>{{ total | numberFormat('0,0') }} VND</span>
            </div>
            <div class="time">
              <span>{{ $t('salon.period_of_execution') }}</span>
              <span>{{ duration }} {{ $t('common.minutes') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <b-modal v-model="checkoutModal"
    id="modal-booking"
    :hideHeader="true"
    :hideFooter="true">
    <i class="bz-close tp-modal-close" @click="checkoutModal = false"></i>
    <booking-modal />
  </b-modal>

  <div class="ads-cart">
      <a href="#"><img src="http://frontend.ajaxle.co/bzone/assets/images/ads-11.jpg" /></a>
      <a href="#"><img src="http://frontend.ajaxle.co/bzone/assets/images/ads-12.jpg" /></a>
      <a href="#"><img src="http://frontend.ajaxle.co/bzone/assets/images/ads-13.jpg" /></a>
      <a href="#"><img src="http://frontend.ajaxle.co/bzone/assets/images/ads-14.jpg" /></a>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
import { reduce, sumBy } from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import BookingModal from '../partials/BookingModal'
import { mixpanelProjectToken } from '@/config'
import mixpanel from 'mixpanel-browser'

export default {
  name: 'Cart',
  components: {
    BookingModal
  },
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['cartServices', 'cartStylist', 'bookingDate', 'promoCode']),
    duration () {
      return sumBy(this.cartServices, 'duration')
    },
    discount () {
      if (this.promoCode.type === 'percent') {
        return parseInt(this.subtotal * parseInt(this.promoCode.value) / 100)
      }

      return parseInt(this.promoCode.value)
    },
    subtotal () {
      const total = reduce(this.cartServices, (sum, { discount_price }) => {
        return sum + parseInt(discount_price)
      }, 0)

      return total
    },
    total () {
      const total = this.subtotal - this.discount
      return total > 0 ? total : 0
    },
    canCheckout () {
      return (this.cartServices.length && this.cartStylist.id && this.bookingDate)
    }
  },
  data () {
    return {
      checkoutModal: false,
      mobileCart: false,
      stylists: [],
      slots: [],
      selectedSlot: { label: '' },
      code: '',
      promoCodeStatus: ''
    }
  },
  mounted () {
    this.$nextTick(() => {
      setTimeout(() => {
        this.stickyCart()
      }, 1000)
    })

    this.$bus.$on('serviceStylists', stylists => {
      this.stylists = stylists
    })

    this.$bus.$on('booking::completed', () => {
      this.promoCodeStatus = ''
      this.code = ''
    })
  },
  watch: {
    'code': 'applyPromoCode',
    cartServices (value) {
      if (!value.length) {
        this.mobileCart = false
      }
    },
    mobileCart (value) {
      if (value) {
        document.documentElement.classList.add('ofhd')
      } else {
        document.documentElement.classList.remove('ofhd')
      }
    }
  },
  methods: {
    ...mapActions(['removeServiceFromCart', 'setStylist']),
    checkout () {
      if (this.canCheckout) {
        this.checkoutModal = true
        mixpanel.init(mixpanelProjectToken)
        mixpanel.track(
          'Click vào đặt lịch & hiện pop-up SDT',
          {
            'device': 'desktop',
            'salon_id': this.salon.id,
            'salon_name': this.salon.name
          }
        )
      } else {
        document.getElementById('mennu-stylists').click()
      }
    },
    mobileCheckout () {
      if (!this.mobileCart) {
        this.mobileCart = true
        this.checkoutModal = false
        mixpanel.init(mixpanelProjectToken)
        mixpanel.track(
          'Click vào đặt lịch & hiện pop-up SDT',
          {
            'device': 'mobile',
            'salon_id': this.salon.id,
            'salon_name': this.salon.name
          }
        )
      } else {
        this.checkout()
      }
    },
    applyPromoCode () {
      this.promoCodeStatus = ''
      this.$store.dispatch('removePromoCode').then(() => {
        if (this.code) {
          this.$http.post('promo-codes/verify', { code: this.code, salons: this.salon.id }).then(({ data }) => {
            this.promoCodeStatus = 'success'
            this.$store.dispatch('applyPromoCode', data)
          }).catch(() => {
            this.promoCodeStatus = 'error'
            this.$store.dispatch('removePromoCode')
          })
        }
      })
    },
    scrollToServices () {
      document.getElementById('mennu-services').click()
    },
    stickyCart () {
      const $wrapper = $('.detail-page .content .wrap-cart')
      const $cart = $('.detail-page .content .cart')
      const $window = $(window)

      if (!$wrapper.length) {
        return
      }
      let lastScrollTop = 0
      let fixScroll = 0
      let setMarginTop = 0

      const frameHandler = () => {
        if ($window.width() <= 1050) {
          $wrapper.removeClass('fixed')
          $cart.css('top', '')
          return
        }

        const offsetTop = parseInt($wrapper.offset().top)
        const scrollTop = parseInt($window.scrollTop())

        if (scrollTop > offsetTop) {
          $wrapper.addClass('fixed')
          const cartTop = parseInt($cart.offset().top)
          const cartHeight = parseInt($cart.height())
          const wrapperBottom = offsetTop + parseInt($wrapper.height())
          const cartBottom = cartTop + cartHeight
          const hiddenHeight = cartHeight - $window.height()

          if (cartBottom >= wrapperBottom) {
            if (scrollTop < cartTop) {
              $wrapper.removeClass('fixed_bottom')
              $cart.css('top', '')
              setMarginTop = 0
              fixScroll = 0
            } else {
              $wrapper.addClass('fixed_bottom')
              $cart.css('top', '')
            }
          } else {
            $wrapper.removeClass('fixed_bottom')
            if (cartHeight > $window.height()) {
              if (!fixScroll) {
                fixScroll = scrollTop
              }
              if (scrollTop >= lastScrollTop) { // Down
                if (setMarginTop < hiddenHeight) {
                  setMarginTop = scrollTop - fixScroll
                } else {
                  setMarginTop = hiddenHeight
                }
              } else { // Up
                if (setMarginTop < hiddenHeight) {
                  setMarginTop = scrollTop - fixScroll
                } else {
                  setMarginTop = hiddenHeight
                }
                if (-setMarginTop >= 0) {
                  setMarginTop = 0
                  fixScroll = 0
                } else if (setMarginTop === hiddenHeight) {
                  setMarginTop -= 1
                  fixScroll = scrollTop - hiddenHeight
                }
              }
              $cart.css('top', -setMarginTop)
            }
          }
        } else {
          $wrapper.removeClass('fixed fixed_bottom')
          $cart.css('top', '')
        }
        lastScrollTop = scrollTop
      }

      const scrollHandler = () => {
        requestAnimationFrame(frameHandler)
      }

      $window.scroll(scrollHandler)
      scrollHandler()
    }
  }
}
</script>

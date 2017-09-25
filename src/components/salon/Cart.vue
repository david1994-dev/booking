<template>
<div class="wrap-cart">
  <div class="cart">
    <div class="inner-cart">
      <div class="service-c" v-show="cartServices.length">
        <div class="title-service">Dịch vụ</div>
        <div class="list">
          <div class="tp-choice-service" v-for="service in cartServices" :key="service.id">
            <div class="bullet"></div>
            <div class="info">
              <div class="name"><span class="delete" @click="removeServiceFromCart(service)"></span>{{ service.category.name }}</div>
              <div class="time-price">
                <div class="time">{{ service.duration }} phút</div>
                <div class="price">{{ service.formatted_price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="stylist-c" v-show="cartStylist.id">
        <div class="title-stylist">Nhân viên</div>
        <div class="wrap">
          <figure><span class="deletez"></span><img :src="cartStylist.avatar_url"></figure>
          <div class="info">
            <strong>{{ cartStylist.name }}</strong>
            <span>{{ cartStylist.name }}</span>
          </div>
        </div>
      </div>

      <div class="time-c" v-show="bookingDate">
        <strong>Thời gian</strong>
        <span>{{ bookingDate | dateFormat('H:mm D/MM/YYYY') }}</span>
      </div>

      <div class="price-book-c" v-show="cartServices.length">
        <div class="price-c">
          <div class="tp-price-total">
            <div class="price">
              <span>Cộng</span>
              <span>{{ total }}</span>
            </div>
            <div class="time">
              <span>Thời gian thực hiện</span>
              <span>{{ duration }} phút</span>
            </div>
          </div>
        </div>
        <div class="tp-btn-book btn-book" @click="checkout"><i class="bz-book"></i>Đặt lịch hẹn</div>
        <div class="not-time" v-show="!bookingDate">Bạn chưa chọn thời gian làm dịch vụ!</div>
      </div>

      <div class="no-service-c" v-show="!cartServices.length">
        <a class="tp-btn choice-service red" href="services" @click.prevent="scrollToServices">Chọn dịch vụ</a>
        <p>Bạn chưa chọn dịch vụ</p>
      </div>
    </div>
  </div>

  <div class="cart-mobile" :class="{ active: mobileCart }">
    <div class="no-choice-service" v-show="!cartServices.length">
      <a class="tp-btn choice-service red" href="services" @click.prevent="scrollToServices">Chọn dịch vụ</a>
      <p>Bạn chưa chọn dịch vụ</p>
    </div>

    <div class="wrap-book" v-show="cartServices.length">
      <div class="title-book">
        <span>Đặt lịch</span>
        <i @click="mobileCart = false" class="bz-close close"></i>
      </div>

      <div class="content-book">

        <div class="service-stylist">
          <div class="list-service">
            <div class="tp-choice-service" v-for="service in cartServices" :key="service.id">
              <div class="bullet"></div>
              <div class="info">
                <div class="name"><span class="delete" @click="removeServiceFromCart(service)"></span>{{ service.category.name }}</div>
                <div class="time-price">
                  <div class="time">{{ service.duration }} phút</div>
                  <div class="price">{{ service.formatted_price }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="list-stylist">
            <div class="name-box">Nhân viên</div>
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
            <div class="btn-time" :class="{ active: bookingDate }" @click="$bus.$emit('displayDateTimePopup', true)">Chọn thời gian</div>
          </div>
        </div>

        <div class="btn-book">
          <div class="tp-btn-book" @click="mobileCheckout">
            <i class="bz-book"></i>Đặt lịch hẹn
          </div>
          <!-- <div class="not-time" v-show="!bookingDate">Bạn chưa chọn thời gian làm dịch vụ!</div> -->
        </div>

        <div class="price-time">
          <div class="tp-price-total">
            <div class="price">
              <span>Cộng</span>
              <span>{{ total }}</span>
            </div>
            <div class="time">
              <span>Thời gian thực hiện</span>
              <span>{{ duration }} phút</span>
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
</div>
</template>

<script>
import $ from 'jquery'
import { reduce, sumBy } from 'lodash'
import { default as numeral } from 'numeral'
import { mapActions, mapGetters } from 'vuex'
import BookingModal from '../partials/BookingModal'

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
    ...mapGetters(['cartServices', 'cartStylist', 'bookingDate']),
    duration () {
      return sumBy(this.cartServices, 'duration')
    },
    total () {
      const total = reduce(this.cartServices, (sum, { price }) => {
        return sum + parseInt(price)
      }, 0)

      return `${numeral(total).format('0,0')} VND`
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
      selectedSlot: { label: '' }
    }
  },
  metaInfo () {
    return {
      htmlAttrs: {
        class: this.mobileCart ? 'ofhd' : null
      }
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
  },
  watch: {
    cartServices (value) {
      if (!value.length) {
        this.mobileCart = false
      }
    }
  },
  methods: {
    ...mapActions(['removeServiceFromCart', 'setStylist']),
    checkout () {
      if (this.canCheckout) {
        this.checkoutModal = true
      } else {
        document.getElementById('mennu-stylists').click()
      }
    },
    mobileCheckout () {
      if (!this.mobileCart) {
        this.mobileCart = true
        this.checkoutModal = false
      } else {
        this.checkout()
      }
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

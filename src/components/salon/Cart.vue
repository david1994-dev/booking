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
        <div class="title-stylist">Stylist</div>
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
        <div class="tp-btn-book btn-book" @click="checkout = true"><i class="bz-book"></i>Đặt lịch hẹn</div>
      </div>

      <div class="no-service-c" v-show="!cartServices.length">
        <a class="tp-btn choice-service red" href="services" @click.prevent="scrollToServices">Chọn dịch vụ</a>
        <p>Bạn chưa chọn dịch vụ</p>
      </div>
    </div>
  </div>

  <div class="cart-mobile">
    <div class="no-choice-service" v-show="!cartServices.length">
      <a class="tp-btn choice-service red" href="services" @click.prevent="scrollToServices">Chọn dịch vụ</a>
      <p>Bạn chưa chọn dịch vụ</p>
    </div>

    <div class="wrap-book" v-show="cartServices.length"
      :class="{ active: mobileCart }">
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
            <div class="name">Stylist</div>
            <v-loading class="wrap-list" loader="fetching stylists">
              <template slot="spinner">
                <div class="text-center">
                  <v-loading-spinner height="30px" width="30px" />
                </div>
              </template>

              <div class="list">
                <div class="item" v-for="stylist in stylists"
                  :key="stylist.id"
                  :class="{ active: cartStylist.id == stylist.id }"
                  @click="setStylist(stylist)">
                  <img :src="stylist.avatar_url">
                </div>
              </div>
            </v-loading>
          </div>
          <div class="choice-time">
            <div class="name">Thời gian</div>
            <div class="btn-time" @click="$bus.$emit('displayDateTimePopup', true)">Chọn thời gian</div>
          </div>
        </div>

        <div class="btn-book">
          <div class="tp-btn-book" @click="mobileCheckout">
            <i class="bz-book"></i>Đặt lịch hẹn
          </div>
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

  <b-modal v-model="checkout"
    id="modal-booking"
    :hideHeader="true"
    :hideFooter="true">
    <i class="bz-close tp-modal-close" @click="checkout = false"></i>
    <div class="modal-body-inner">
      <div class="tp-title-form">Vui lòng nhập số điện thoại</div>
      <div class="tp-des-form">Hệ thống sẽ gửi mã xác nhận tới số điện thoại này của bạn</div>
      <input class="tp-text-form" type="type" placeholder="Số điện thoại" />
      <input class="tp-btn" type="submit" value="Xác nhận đặt lịch">
    </div>
  </b-modal>
</div>
</template>

<script>
import $ from 'jquery'
import { reduce, sumBy } from 'lodash'
import { default as numeral } from 'numeral'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Cart',
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
    }
  },
  data () {
    return {
      checkout: false,
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
    mobileCheckout () {
      if (!this.mobileCart) {
        this.mobileCart = true
        this.checkout = false
      } else {
        this.checkout = true
      }
    },
    scrollToServices () {
      document.getElementById('mennu-services').click()
    },
    stickyCart () {
      const $cart = $('.detail-page .content .wrap-cart')
      const $cartInner = $('.detail-page .content .cart .inner-cart')
      const $window = $(window)

      if (!$cart.length) {
        return
      }

      const frameHandler = () => {
        if ($window.width() <= 1050) {
          $cart.removeClass('fixed')
          return
        }

        const offsetTop = $cart.offset().top
        const scrollTop = $window.scrollTop()
        const marginTop = 25

        if (scrollTop > (offsetTop - marginTop)) {
          $cart.addClass('fixed')
          if (scrollTop > (offsetTop + $cart.height() - $cartInner.height()) - marginTop) {
            $cart.addClass('fixed_bottom')
            $cartInner.css('top', '')
          } else {
            $cart.removeClass('fixed_bottom')
          }
        } else {
          $cart.removeClass('fixed fixed_bottom')
          $cartInner.css('top', '')
        }
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

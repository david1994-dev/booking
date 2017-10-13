<template>
<div class="tp-salon" :class="{ unverified: !salon.verified }">
  <div class="img-price">
    <div class="tp-img-slide">
      <div v-if="salon.verified" class="slide-salon">
        <div><router-link :to="{ name: 'salon', params: { id: salon.slug } }">
          <img :src="salon.image_url" @click="setCategory">
        </router-link></div>
      </div>
      <div v-else class="slide-salon">
        <div><img src="../../assets/images/verified.jpg"></div>
      </div>
      <div class="utilities" v-if="salon.verified && salon.amenities">
        <i v-for="amenity in salon.amenities" :key="amenity.id"
          :class="amenity.icon"
          v-b-tooltip.hover.auto :title="amenity.name"></i>
      </div>
    </div>
    <div class="price-rate">
      <div class="price" :class="{ 'sale-off': salon.min_price.has_discount }">
        <span>From <b v-if="salon.min_price.has_discount">{{ salon.min_price.formatted_price }}</b></span>
        <strong>{{ salon.min_price.has_discount ? salon.min_price.formatted_discount_price : salon.min_price.formatted_price }}</strong>
      </div>
      <div class="rate" v-if="salon.verified">
        <div class="tp-rate">
          <stars :rating="salon.average_rating">
            <div class="number" v-if="salon.average_rating">{{ salon.average_rating | numberFormat('0.0') }} - {{ salon.rating_summary }}</div>
          </stars>
          <div class="rate-status">{{ salon.review_count }} Đánh giá</div>
        </div>
      </div>
    </div>
  </div>
  <div class="wrap-info">
    <div class="name-address">
      <h3 class="salon-name"><router-link :to="{ name: 'salon', params: { id: salon.slug } }">
        <span @click="setCategory">{{ salon.name }}</span>
      </router-link></h3>
      <p class="address pointer" @click="$emit('salonAddressClick', salon)">{{ salon.address }}</p>
      <div class="tp-view">
        <div class="viewing"><i class="bz-check"></i><span>Đang có 10 người xem</span></div>
        <div class="viewed"><i class="bz-eye"></i><span>688</span></div>
      </div>
    </div>
    <div v-if="salon.verified">
      <div class="wrap-stylist" :class="{ expand: expandStylist }">
        <div class="stylist-img">
          <div class="item" v-for="(stylist, i) in salon.stylists"
            :key="stylist.id"
            :class="{
              active: selectedStylist.id === stylist.id,
              show: i <= stylistToShow,
              'stylist-more': i === stylistToShow
            }">
            <figure>
              <div class="number" v-if="i === stylistToShow && hiddenStylists > 0"
                @click="expandStylists">+{{ hiddenStylists }}</div>
              <a @click="selectedStylist = stylist"><img :src="stylist.avatar_url"></a>
            </figure>
            <div class="info">
              <h3><a @click="selectedStylist = stylist">{{ stylist.name }}</a></h3>
              <!-- <span>34 Salon có dịch vụ</span> -->
            </div>
          </div>
        </div>
        <div class="scrollup" @click="expandStylist = !expandStylist"><i class="bz-down-2"></i></div>
      </div>

      <calendar v-if="salon.stylists.length" v-model="selectedDate">
        <template slot="button">
          <i class="bz-calendar-day"></i>
        </template>

        <div class="wrap-times" :class="{ expand: expandTime }">
          <v-loading :loader="`fetching stylist::${selectedStylist.id} slots`">
            <template slot="spinner">
              <div class="text-center">
                <v-loading-spinner height="30px" width="30px" />
              </div>
            </template>

            <div class="times">
              <div v-for="slot in slots" class="item"
                v-if="slot.status == 'available'"
                :class="{ active: selectedSlot.label == slot.label }"
                @click="updateCart(slot)">{{ slot.label }}</div>
            </div>
            <div class="scrollup" v-show="slots.length > 15" @click="expandTime = !expandTime"><i class="bz-down-2"></i></div>
            <div class="empty" v-if="!slots.length"><strong>Không còn lịch trống.</strong><br />Vui lòng chọn ngày khác hoặc stylist khác</div>
          </v-loading>
        </div>
      </calendar>
    </div>
    <div v-else class="tp-unverified">
      <div class="child">
        <div class="des"><strong>Gọi trực tiếp</strong> cho salon để book lịch hẹn.</div>
        <div class="btn-action">
          <i class="bz-phone2"></i>
          <span>Gọi salon</span>
        </div>
      </div>
      <div class="child">
        <div class="des">Bạn thích thương hiệu này? <strong>Vote</strong> để ủng hộ thương hiệu nào!</div>
        <div class="btn-action">
          <i class="bz-like"></i>
          <span>1.240</span>
        </div>
      </div>
      <div class="child">
        <div class="des">Đây là thương hiệu của bạn? Có <strong>1.204</strong> người đang quan tâm tới bạn. Kết nối ngay thôi</div>
        <div class="btn-action">
          <i class="bz-note"></i>
          <span>Đăng ký</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import $ from 'jquery'
import { head } from 'lodash'
import store from 'store2'
import Calendar from './Calendar'
import Stars from './StarRating'

const today = moment()
const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  name: 'SalonCard',
  props: {
    salon: {
      type: Object,
      required: true
    },
    category: {
      type: Number,
      required: true
    }
  },
  components: {
    Calendar,
    Stars
  },
  computed: {
    stylistToShow () {
      return this.visibleStylists - 1
    },
    hiddenStylists () {
      return this.salon.stylists.length - this.stylistToShow - 1
    }
  },
  data () {
    return {
      selectedStylist: { id: 0 },
      selectedSlot: { label: '' },
      selectedDate: today,
      slots: [],
      expandStylist: false,
      expandTime: false,
      visibleStylists: 5
    }
  },
  watch: {
    'selectedStylist': 'fetchSlots',
    'selectedDate': 'fetchSlots'
  },
  mounted () {
    this.setSelectedStylist()
    this.$nextTick(() => {
      this.resizeHandler()
    })
    this.$bus.$on('stylistPicker::selected', stylist => {
      this.selectedStylist = stylist
    })
  },
  methods: {
    setSelectedStylist () {
      if (this.salon.stylists.length) {
        this.selectedStylist = head(this.salon.stylists)
      }
      this.calculateStylistToShow()
    },
    fetchSlots () {
      this.resetState()
      this.$startLoading(`fetching stylist::${this.selectedStylist.id} slots`)
      const params = { date: this.selectedDate.format(DATE_FORMAT) }
      if (this.category) {
        params.categories = this.category
      }
      this.$http.get(`stylists/${this.selectedStylist.id}/schedule`, { params }).then(({ data }) => {
        this.slots = data
        this.$endLoading(`fetching stylist::${this.selectedStylist.id} slots`)
      }).catch(() => this.$endLoading(`fetching stylist::${this.selectedStylist.id} slots`))
    },
    updateCart (slot) {
      this.selectedSlot = slot
      if (!slot.start) {
        return
      }

      store.set('cart', {
        category: this.category,
        stylist: this.selectedStylist.id,
        time: slot.start
      })
      this.$router.push({ name: 'salon', params: { id: this.salon.slug } })
    },
    resetState () {
      this.slots = []
      this.selectedSlot = { label: '' }
      this.expandTime = false
    },
    calculateStylistToShow () {
      const $list = $('.wrap-info .stylist-img')
      const wrapWidth = $list.width()
      const itemWidth = $list.find('.item').outerWidth()
      this.visibleStylists = parseInt(wrapWidth / itemWidth)
    },
    resizeHandler () {
      const _this = this
      $(window).resize(() => {
        _this.calculateStylistToShow()
      })
    },
    expandStylists () {
      if (window.innerWidth < 1200) {
        this.$bus.$emit('stylistPicker::init', { stylists: this.salon.stylists, selected: this.selectedStylist })
        this.$bus.$emit('stylistPicker::show')
      } else {
        this.expandStylist = true
      }
    },
    setCategory () {
      store.set('cart', {
        category: this.category
      })
    }
  }
}
</script>

<style scoped>
.show {
  display: block !important;
}
</style>

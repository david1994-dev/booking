<template>
<div class="tp-salon" :class="{ unverified: !salon.verified }"
  @mouseover="mouseOver"
  @mouseleave="mouseLeave">
  <div class="img-price">
    <div class="tp-img-slide" v-if="salon.verified">
      <slick v-if="salon.covers && salon.covers.length"
        ref="slick"
        class="slide-salon"
        :options="slickOptions">
        <div><router-link :to="{ name: 'salon', params: { id: salon.slug } }">
          <img :src="salon.image_url" @click="setCategory">
        </router-link></div>
        <div v-if="salon.covers" v-for="image in salon.covers"
          :key="image.id">
          <router-link :to="{ name: 'salon', params: { id: salon.slug } }">
            <img :src="image.template_url.replace('{size}', 'large')" @click="setCategory">
          </router-link>
        </div>
      </slick>
      <div class="slide-salon" v-else>
        <div><router-link :to="{ name: 'salon', params: { id: salon.slug } }">
          <img :src="salon.image_url" @click="setCategory">
        </router-link></div>
      </div>
      <div v-if="salon.covers && salon.covers.length" class="slide-control">
        <div class="tp-control small">
          <div class="btn prev" ref="prevBtn" @click="prev"></div>
          <div class="btn next" ref="nextBtn" @click="next"></div>
        </div>
      </div>
      <div class="utilities" v-if="salon.amenities">
        <i v-for="amenity in salon.amenities" :key="amenity.id"
          :class="amenity.icon"
          v-b-tooltip.hover.auto :title="amenity.name"></i>
      </div>
    </div>
    <div class="tp-img-slide" v-else>
      <div class="slide-salon">
        <div><img src="../../assets/images/verified.jpg"></div>
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
          <div class="rate-status">{{ $t('common.rates',{'rates':salon.review_count})}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="wrap-info">
    <div class="name-address">
      <h3 class="salon-name"><router-link :to="{ name: 'salon', params: { id: salon.slug } }">
        <span @click="setCategory">{{ salon.name }}</span>
      </router-link></h3>
      <p class="address pointer">{{ salon.address }}</p>
      <div class="tp-view">
        <div class="viewing" v-if="salon.today_page_views"><i class="bz-check"></i><span>Đã có {{ salon.today_page_views }} người xem</span></div>
        <!-- <div class="viewed"><i class="bz-eye"></i><span>{{ salon.page_views }} lượt xem</span></div> -->
      </div>
      <div class="des" v-if="salon.verified">{{ salon.description }}</div>
    </div>
    <div class="list-price" v-if="salon.verified && salon.services">
      <router-link class="item" v-for="(service, i) in salon.services"
        :key="service.id"
        v-if="!service.is_group && (i < 3)"
        :to="{ name: 'salon', params: { id: salon.slug } }">
        <div class="name-time">
          <div class="name">{{ service.name }}</div>
          <div class="time">{{ service.duration }} {{ $t('common.minutes') }}</div>
        </div>
        <div class="price-save">
          <div class="price">{{ service.has_discount ? service.formatted_discount_price : service.formatted_price }}</div>
          <div class="save" v-if="service.has_discount">{{ service.discount_offer }}</div>
        </div>
      </router-link>
    </div>
    <div class="tp-unverified" v-else>
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
import $ from 'jquery'
import store from 'store2'
import Slick from 'vue-slick'
import Stars from './StarRating'

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
    Stars,
    Slick
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
      visibleStylists: 5,
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        prevArrow: false,
        nextArrow: false,
        infinite: false
      }
    }
  },
  beforeUpdate () {
    if (this.$refs.slick) {
      this.$refs.slick.destroy()
    }
  },
  updated () {
    if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
      this.$refs.slick.create()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.resizeHandler()
    })
  },
  methods: {
    mouseOver () {
      this.$emit('mouseOver', this.salon)
      this.$bus.$emit('salonCard::mouseOver', this.salon)
    },
    mouseLeave () {
      this.$emit('mouseLeave', this.salon)
      this.$bus.$emit('salonCard::mouseLeave', this.salon)
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
    setCategory () {
      store.set('cart', {
        category: this.category
      })
    },
    setService (service) {
      store.set('cart', {
        service: service.id
      })
    },
    next () {
      this.$refs.slick.next()
    },
    prev () {
      this.$refs.slick.prev()
    }
  }
}
</script>

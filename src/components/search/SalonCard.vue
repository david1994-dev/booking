<template>
<div class="item" :class="{ unverified: !salon.verified }">
  <div class="tp-img-slide" v-if="salon.verified">
    <slick v-if="salon.covers && salon.covers.length"
      ref="slick"
      class="slide-salon"
      :options="slickOptions">
      <div class="demo1"><router-link :to="{ name: 'salon', params: { id: salon.slug } }">
        <img :src="salon.image_url">
      </router-link></div>
      <div v-if="salon.covers" v-for="image in salon.covers"
        :key="image.id" class="demo2">
        <router-link :to="{ name: 'salon', params: { id: salon.slug } }">
          <img :src="image.template_url.replace('{size}', 'large')">
        </router-link>
      </div>
    </slick>
    <div class="slide-salon" v-else>
      <div><router-link :to="{ name: 'salon', params: { id: salon.slug } }">
        <img :src="salon.image_url">
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
  <div class="info">
    <div class="name-adress">
      <h3><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h3>
      <p>{{ salon.address }}</p>
      <div class="tp-view">
        <div class="viewing" v-if="salon.today_page_views"><i class="bz-check"></i><span>Đã có {{ salon.today_page_views }} người xem</span></div>
        <!-- <div class="viewed"><i class="bz-eye"></i><span>{{ salon.page_views }} lượt xem</span></div> -->
      </div>
    </div>
    <div class="price-rate">
      <div class="price" :class="{ 'sale-off': salon.min_price.has_discount }">
        <span>From <b v-if="salon.min_price.has_discount">{{ salon.min_price.formatted_price }}</b></span>
        <strong>{{ salon.min_price.has_discount ? salon.min_price.formatted_discount_price : salon.min_price.formatted_price }}</strong>
      </div>
      <div class="rate" v-if="salon.verified">
        <div class="tp-rate">
          <stars :rating="salon.average_rating_rounded">
            <div class="number" v-if="salon.average_rating">{{ salon.average_rating | numberFormat('0.0') }} - {{ salon.rating_summary }}</div>
          </stars>
          <div class="rate-status">{{ $t('common.rates',{'rates':salon.review_count})}}</div>
        </div>
      </div>
      <div v-if="!salon.verified" class="action-unverified">
        <div class="btn-action">
          <i class="bz-phone2"></i>
          <span>Gọi salon</span>
        </div>
      </div>
      <div v-if="!salon.verified" class="action-unverified">
        <div class="btn-action">
          <i class="bz-like"></i>
          <span>1.240 Votes</span>
        </div>
      </div>
      <div v-if="!salon.verified" class="action-unverified">
        <div class="btn-action">
          <i class="bz-note"></i>
          <span>Bạn là chủ salon?</span>
        </div>
      </div>
      <div v-if="!salon.verified" class="tp-unverified">
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
</div>
</template>

<script>
import Slick from 'vue-slick'
import Stars from '../partials/StarRating'

export default {
  props: {
    salon: {
      required: true,
      type: Object
    }
  },
  components: {
    Slick,
    Stars
  },
  data () {
    return {
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
  methods: {
    next () {
      this.$refs.slick.next()
    },
    prev () {
      this.$refs.slick.prev()
    }
  }
}
</script>

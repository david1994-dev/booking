<template>
  <div class="style-item" :class="{ unverified: !salon.verified }">
    <div class="avata-price">
      <div class="avata-info">
        <figure> <a href="#"><img src="assets/images/barbershop.jpg"></a> </figure>
        <div class="info">
          <h2><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h2>
          <div class="address">{{ salon.address }}</div>
          <div class="property">
            <div class="item-pro">
              <i class="bz-three-stars"></i>
              <span>150 người đã đặt</span>
            </div>
            <div class="item-pro">
              <i class="bz-photo-camera"></i>
              <span>288 ảnh trải nghiệm kiểu này</span>
            </div>
          </div>
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
      </div>
    </div>
    <div class="images">
      <slick v-if="salon.covers && salon.covers.length"
             ref="slick"
             class="slide-image"
             :options="slickOptions">

        <div class="item">
          <router-link :to="{ name: 'salon', params: { id: salon.slug } }" tag="figure">
            <div class="avata-stylist"><img :src="salon.image_url"></div>
            <a class="name-stylist" href="#">by <strong>Tuan Anh</strong></a>
          </router-link>
        </div>

        <div class="item" v-if="salon.covers" v-for="image in salon.covers" :key="image.id">
          <router-link :to="{ name: 'salon', params: { id: salon.slug } }" tag="figure">
            <div class="avata-stylist"><img :src="image.template_url.replace('{size}', 'large')"></div>
            <a class="name-stylist" href="#">by <strong>Tuan Anh</strong></a>
          </router-link>
        </div>

      </slick>

      <div class="tp-control small" v-if="salon.covers && salon.covers.length">
        <div class="btn prev slick-arrow" @click="prev"></div>
        <div class="btn next slick-arrow" @click="next"></div>
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

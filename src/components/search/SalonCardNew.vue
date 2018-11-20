<template>
  <div class="style-item" :class="{ unverified: !salon.verified }">
    <div class="avata-price">
      <div class="avata-info">
        <figure> <router-link :to="{ name: 'salon', params: { id: salon.slug } }"><img :src="salon.image"></router-link> </figure>
        <div class="info">
          <h2><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h2>
          <div class="address">{{ salon.address }}</div>
          <div class="property">
            <div class="item-pro">
              <i class="bz-three-stars"></i>
              <span>{{ $t('home.feature.num_booked',{'num':salon.number_booking}) }}</span>
            </div>
            <div class="item-pro">
              <i class="bz-photo-camera"></i>
              <span>{{ salon.total_verified_images }} ảnh trải nghiệm kiểu này</span>
            </div>
          </div>
        </div>
      </div>
      <div class="price-rate">
        <div class="price" :class="{ 'sale-off': false }">
          <span>From
          </span>
          <strong>{{ formatPrice(salon.cost_from) }} {{ salon.currency }}</strong>
        </div>
        <div class="rate" v-if="salon.average_score">
          <div class="tp-rate">
            <stars :rating="parseInt(salon.average_score)">
              <div class="number" v-if="salon.average_score">{{ salon.average_score | numberFormat('0.0') }}</div>
            </stars>
            <div class="rate-status">{{ $t('common.rates',{'rates':parseInt(salon.average_score)})}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="images show-control">
      <slick v-if="salon.verified_images && salon.verified_images.length"
             ref="slick"
             class="slide-image"
             :options="slickOptions">

        <div class="item" v-if="salon.verified_images" v-for="image in salon.verified_images" :key="image.url">
          <router-link :to="{ name: 'salon', params: { id: salon.slug } }" tag="figure">
            <div class="avata-stylist"><img :src="image.url"></div>
            <a class="name-stylist" href="#">by <strong>{{ image.author }}</strong></a>
          </router-link>
        </div>

      </slick>

      <div class="tp-control small" v-if="salon.verified_images && salon.verified_images.length">
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
        slidesToShow: 6,
        prevArrow: false,
        nextArrow: false,
        infinite: false,
        variableWidth: true,
        mobileFirst: true
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
    },
    formatPrice (value) {
      let val = (value / 1).toFixed(0).replace('.', ',')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    sanitizeTitle: function (title) {
      var slug = ''
      // Change to lower case
      var titleLower = title.toLowerCase()
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e')
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a')
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o')
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u')
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd')
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '')
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-')

      return slug
    }
  }
}
</script>

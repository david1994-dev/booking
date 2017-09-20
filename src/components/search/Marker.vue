<template>
<div class="pin public" :class="{ active: popupOpen }">
  <div class="wrapper">
    <!-- <div class="small" @click="popupOpen = !popupOpen">{{ salon.min_price.price | numberFormat('0,0') }}</div> -->
    <div class="small">{{ salon.min_price.price | numberFormat('0,0') }}</div>
    <div class="large">
      <div class="pin-close"><i class="bz-close"></i></div>
      <div class="tp-map">
        <div class="rate">
          <div class="tp-rate">
            <div class="rate-status">{{ salon.rating_summary }}</div>
            <stars :rating="salon.average_rating">
              <div class="number">{{ salon.review_count }} Đánh giá</div>
            </stars>
          </div>
        </div>
        <figure><img :src="salon.image_url"></figure>
        <div class="name-address">
          <div class="name"><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></div>
          <div class="address">{{ salon.address }}</div>
        </div>
      </div>
    </div>
  </div>
  <span></span>
</div>
</template>

<script>
import Stars from '../partials/StarRating'

export default {
  name: 'SalonMarker',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  components: {
    Stars
  },
  data () {
    return {
      popupOpen: false
    }
  },
  mounted () {
    if (this.$parent) {
      this.$parent.$on('click', () => {
        this.popupOpen = !this.popupOpen
      })
    }
  }
}
</script>

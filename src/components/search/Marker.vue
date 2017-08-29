<template>
<div class="pin public" :class="{ active: popupOpen }">
  <div class="wrapper">
    <div class="small" @click="popupOpen = !popupOpen">120.000</div>
    <div class="large">
      <div class="pin-close" @click="popupOpen = false"><i class="bz-close"></i></div>
      <div class="tp-map">
        <div class="rate">
          <div class="tp-rate">
            <div class="rate-status">Rất tốt</div>
            <stars :rating="salon.average_rating">
              <div class="number">{{ salon.review_count }} Đánh giá</div>
            </stars>
          </div>
        </div>
        <figure><img :src="salon.image_url"></figure>
        <div class="name-address">
          <div class="name"><a href="#">{{ salon.name }}</a></div>
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
  }
}
</script>

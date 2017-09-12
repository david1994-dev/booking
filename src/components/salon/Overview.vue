<template>
<div class="about-d">
  <div class="title-address">
    <h1 class="title">{{ salon.name }}</h1>
    <p class="address">{{ salon.address }}</p>
  </div>
  <div class="rate">
    <div class="tp-rate">
      <stars :rating="salon.average_rating">
        <div class="number">{{ salon.review_count }} Đánh giá</div>
      </stars>
    </div>
  </div>

  <div class="link">
    <div class="name">Liên kết</div>
    <ul>
      <li><a href="#"><i class="bz-facebook"></i></a></li>
      <li><a href="#"><i class="bz-instagram"></i></a></li>
    </ul>
  </div>

  <div class="time-since">
    <div class="item"><i class="bz-clock"></i> 09:00 - 21:00 <span class="main-color">-</span> Các ngày trong tuần</div>
    <div class="item" v-if="salon.established"><i class="bz-calendar"></i> Thành lập ngày {{ salon.established | dateFormat('D-M-YYYY') }}</div>
    <div class="item" v-if="chemicals"><i class="bz-hair-spray"></i> Hoá chất sử dụng: {{ chemicals }}</div>
  </div>

  <div class="des" v-if="salon.description">
    <p>{{ salon.description }}</p>
  </div>
</div>
</template>

<script>
import { map } from 'lodash'
import Stars from '../partials/StarRating'

export default {
  name: 'SalonOverview',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  components: {
    Stars
  },
  computed: {
    chemicals () {
      if (!this.salon.chemicals || !this.salon.chemicals.length) {
        return
      }

      return map(this.salon.chemicals, 'name').join(', ')
    }
  }
}
</script>

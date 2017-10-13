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

  <div class="link" v-if="salon.facebook_url || salon.instagram_url">
    <ul>
      <li v-if="salon.facebook_url"><a :href="salon.facebook_url"><i class="bz-facebook"></i></a></li>
      <li v-if="salon.instagram_url"><a :href="salon.instagram_url"><i class="bz-instagram"></i></a></li>
    </ul>
    <div class="name">Liên kết</div>
  </div>

  <div class="time-since">
    <div class="item date-open"><i class="bz-clock"></i>
      <ul>
        <li v-for="(hours, day) in salon.opening_hours"
          v-if="hours.open && hours.close"
          >{{ hours.open }} - {{ hours.close }} <span class="main-color">-</span> {{ displayDate(day) }}</li>
        <!-- <li v-if="salon.opening_hours['monday']['open']">{{ salon.opening_hours['monday']['open'] }} - {{ salon.opening_hours['monday']['close'] }} <span class="main-color">-</span> Các ngày trong tuần</li>
        <li v-if="salon.opening_hours['saturday']['open'] ">{{ salon.opening_hours['saturday']['open'] }} - {{ salon.opening_hours['saturday']['close'] }} <span class="main-color">-</span> {{ weekendAvaiable }}</li> -->
      </ul>
    </div>
    <div class="item" v-if="salon.established"><i class="bz-calendar"></i> Thành lập ngày {{ salon.established | dateFormat('D-M-YYYY') }}</div>
    <div class="item chemical" v-if="salon.chemicals.length">
      <i class="bz-hair-spray"></i> Hoá chất sử dụng:
      <ul>
        <li v-for="chemical in salon.chemicals" :key="chemical.id">
          <img :src="chemical.image_url" />
          <span>{{ chemical.name }}</span>
        </li>
      </ul>
    </div>
  </div>

  <div class="utilities" v-if="salon.amenities">
    <div class="title">Tiện ích</div>
    <ul :class="{ active: expand }">
      <li v-for="amenity in salon.amenities" :key="amenity.id">
        <i :class="amenity.icon" v-b-tooltip.hover.top :title="amenity.name"></i>
        <span>{{ amenity.description || amenity.name }}</span>
      </li>
      <li class="view-all-wrap">
        <div class="view-all expand" @click="expand = true"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
        <div class="view-all collapse" @click="expand = false"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
      </li>
    </ul>
  </div>

  <div class="des" v-if="salon.description">
    <p>{{ salon.description }}</p>
  </div>
</div>
</template>

<script>
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
  data () {
    return {
      expand: false
    }
  },
  computed: {
    // weekendAvaiable () {
    //   if (this.salon.opening_hours['saturday'] && this.salon.opening_hours['sunday']) {
    //     return 'Thứ 7 - Chủ nhật'
    //   }
    //   return 'Thứ 7'
    // }
  },
  methods: {
    displayDate (key) {
      const days = {
        monday: 'Thứ 2',
        tuesday: 'Thứ 3',
        wednesday: 'Thứ 4',
        thursday: 'Thứ 5',
        friday: 'Thứ 6',
        saturday: 'Thứ 7',
        sunday: 'Chủ nhật'
      }
      const day = key.toLowerCase()

      return days[day] ? days[day] : ''
    }
  }
}
</script>

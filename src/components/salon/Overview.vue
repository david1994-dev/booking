<template>
<div class="about-d">
  <div class="title-address">
    <h1 class="title">{{ salon.name }}</h1>
    <div class="tp-rate">
      <div class="stars-number">
        <div class="number">8.0</div>
        <stars :rating="salon.average_rating_rounded">
          <div class="number" v-if="salon.average_rating">{{ salon.average_rating | numberFormat('0.0') }} - {{ salon.rating_summary }}</div>
        </stars>
      </div>
      <div class="rate-status">{{ $t('common.rates',{'rates':salon.review_count})}}</div>
    </div>
    <p class="address">{{ salon.address }}</p>
  </div>
  <div class="hot-news">
    <div class="title">HOT NEWS</div>
    <div class="list">
      <div class="item" v-for="(snew, index) in salon.news">
        <div class="img"><a target="_blank" :href="snew.url"><img :src="snew.image_url"></a></div>
        <div class="info">
          <div class="name"> <a target="_blank" :href="snew.url">{{ snew.title }}</a> </div>
          <!--<div class="creat-by">{{ snew.created_at }}</div>-->
          <div class="des">{{ snew.content }}</div>
        </div>
      </div>
    </div>
  </div>


  <div class="staff-d" data-scroll="stylist" id="stylists-f">
    <div class="title">ĐỘI NGŨ NHÂN VIÊN</div>
    <div class="list">
      <div @click="viewInfoStaff(child, index)" v-for="(child, index) in salon.stylists"
        v-bind:class="{'item': 1, 'more': (index == 5 && more)}" >
        <img :src="child.avatar_url" />
        <div class="info">
          <div class="level">{{ child.position }}</div>
          <div class="name">{{ child.name }}</div>
        </div>
        <div v-if="(index===5 && salon.stylists.length > 6)" class="number">+{{salon.stylists.length - 6}}</div>
      </div>
    </div>
  </div>
  <b-modal id="modal-staff-info"
    ref="staffModal"
    centered
    size="lg"
    :hide-header="true"
    :hide-footer="true"
    title="1">
    <i class="bz-close tp-modal-close" @click="hide"></i>
    <div class="tp-modal-staff">
      <div class="avata"><img :src="staff.avatar_url" /></div>
        <div class="name">{{ staff.name }}</div>
        <div class="position">{{ staff.position }}</div>
        <div class="social">
          <a :href="staff.facebook" target="_blank"><i class="bz-facebook"></i></a>
          <a :href="staff.instagram" target="_blank"><i class="bz-instagram"></i></a>
        </div>
        <div class="des">
          {{ staff.about }}
        </div>
    </div>
  </b-modal>

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
      expand: false,
      more: true,
      translateText: '',
      staff: {
        name: '',
        about: '',
        position: '',
        avatar_url: '',
        instagram: '',
        facebook: ''
      }
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
    },
    translateLang (text, event) {
      this.$http.post('translate', { text: text }).then(({ data }) => {
        event.target.style.display = 'none'
        this.translateText = data.translation
      })
    },
    hide () {
      this.$refs.staffModal.hide()
    },
    viewInfoStaff (child, key) {
      this.staff = child
      if (key === 5 && this.more) {
        this.more = false
        return false
      }
      this.$nextTick(() => this.$refs.staffModal.show())
    }
  }
}
</script>

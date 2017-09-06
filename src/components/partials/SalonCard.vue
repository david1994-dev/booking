<template>
<div class="tp-salon">
  <div class="img-price">
    <figure><router-link :to="{ name: 'salon', params: { id: salon.slug } }"><img :src="salon.image_url"></router-link></figure>
    <div class="price-rate">
      <div class="price">
        <span>From</span>
        <strong>324.000 VND</strong>
      </div>
      <div class="rate">
        <div class="tp-rate">
          <div class="rate-status">{{ salon.rating_summary }}</div>
          <stars :rating="salon.average_rating">
            <div class="number">{{ salon.review_count }} Đánh giá</div>
          </stars>
        </div>
      </div>
    </div>
  </div>
  <div class="wrap-info">
    <div class="name-address">
      <h3 class="salon-name"><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h3>
      <p class="address pointer" @click="$emit('salonAddressClick', salon)">{{ salon.address }}</p>
    </div>
    <div class="wrap-stylist">
      <div class="stylist-img">
        <div class="item" v-for="stylist in salon.stylists"
          :key="stylist.id"
          :class="{ active: selectedStylist.id === stylist.id }">
          <figure><a @click="selectedStylist = stylist"><img :src="stylist.avatar_url"></a></figure>
          <div class="info">
            <h3><a href="#">{{ stylist.name }}</a></h3>
            <span>34 Salon có dịch vụ</span>
          </div>
        </div>
      </div>
      <div class="scrollup"><i class="bz-down-2"></i></div>
    </div>
    <!-- <div class="dates" v-if="salon.stylists.length">
      <div v-for="date in dates"
        :key="date.id"
        :class="{ active: date.id == selectedDate.format('YYYY-MM-DD') }"
        @click="selectedDate = date.date"
        class="item">{{ date.label }}</div>
      <div class="item calendar" data-toggle><i class="bz-calendar-day"></i></div>
    </div> -->

    <calendar v-model="selectedDate">
      <template slot="button">
        <i class="bz-calendar-day"></i>
      </template>

      <div class="wrap-times" :class="{ expand }" v-if="salon.stylists.length">
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
              @click="selectedSlot = slot">{{ slot.label }}</div>
          </div>
        </v-loading>
        <div class="scrollup" v-if="slots.length" @click="expand = !expand"><i class="bz-down-2"></i></div>
      </div>
    </calendar>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { head } from 'lodash'
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
    }
  },
  components: {
    Calendar,
    Stars
  },
  data () {
    return {
      selectedStylist: { id: 0 },
      selectedSlot: { label: '' },
      selectedDate: today,
      slots: [],
      expand: false
    }
  },
  watch: {
    'selectedStylist': 'fetchSlots',
    'selectedDate': 'fetchSlots'
  },
  mounted () {
    this.setSelectedStylist()
  },
  methods: {
    setSelectedStylist () {
      if (this.salon.stylists.length) {
        this.selectedStylist = head(this.salon.stylists)
      }
    },
    fetchSlots () {
      this.resetState()
      this.$startLoading(`fetching stylist::${this.selectedStylist.id} slots`)
      this.$http.get(`stylists/${this.selectedStylist.id}/schedule`, { params: { date: this.selectedDate.format(DATE_FORMAT) } }).then(({ data }) => {
        this.slots = data
        this.$endLoading(`fetching stylist::${this.selectedStylist.id} slots`)
      })
    },
    resetState () {
      this.slots = []
      this.selectedSlot = { label: '' }
      this.expand = false
    }
  }
}
</script>

<template>
<div class="wrap-info">
  <div class="name-address">
    <h3 class="salon-name"><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h3>
    <p class="address">{{ salon.address }}</p>
  </div>
  <div class="wrap-stylist">
    <div class="stylist-img">
      <div class="item" :class="{ active: selectedStylist.id === stylist.id }" v-for="stylist in salon.stylists">
        <figure><a @click="selectedStylist = stylist"><img :src="stylist.avatar_url"></a></figure>
        <div class="info">
          <h3><a href="#">{{ stylist.name }}</a></h3>
          <span>34 Salon có dịch vụ</span>
        </div>
      </div>
    </div>
    <div class="scrollup"><i class="bz-down-2"></i></div>
  </div>
  <div class="dates" v-if="salon.stylists.length">
    <div v-for="date in dates"
      :class="{ active: date.id == selectedDate.format('YYYY-MM-DD') }"
      @click="selectedDate = date.date"
      class="item">{{ date.label }}</div>
    <div class="item calendar" data-toggle><i class="bz-calendar-day"></i></div>
  </div>
  <div class="wrap-times" :class="{ expand }" v-if="salon.stylists.length">
    <v-loading :loader="`fetching stylist::${selectedStylist.id} slots`">
      <template slot="spinner">
        <div class="text-center">
          <v-loading-spinner height="30px" width="30px" />
        </div>
      </template>

      <div class="times">
        <div v-for="slot in slots" class="item"
          :class="{ active: selectedSlot.label == slot.label }"
          @click="selectedSlot = slot">{{ slot.label }}</div>
      </div>
    </v-loading>
    <div class="scrollup" v-if="slots.length" @click="expand = !expand"><i class="bz-down-2"></i></div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { head } from 'lodash'
// import { Alert } from 'uiv'

const today = moment()
const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  name: 'SalonInfo',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  computed: {
    dates () {
      const tomorrow = moment().add(1, 'd')
      const next2Days = moment().add(2, 'd')
      return [
        {
          id: today.format(DATE_FORMAT),
          label: 'Hôm nay',
          date: today
        },
        {
          id: tomorrow.format(DATE_FORMAT),
          label: tomorrow.format('DD/MM'),
          date: tomorrow
        },
        {
          id: next2Days.format(DATE_FORMAT),
          label: next2Days.format('DD/MM'),
          date: next2Days
        }
      ]
    }
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

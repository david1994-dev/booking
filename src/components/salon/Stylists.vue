<template>
<div>
  <div class="stylist-d">
    <div class="title">Stylist</div>
    <v-loading class="wrap-list" loader="fetching stylists">
      <template slot="spinner">
        <div class="text-center">
          <v-loading-spinner height="30px" width="30px" />
        </div>
      </template>

      <div class="list">
        <div class="item" v-for="stylist in stylists"
          :key="stylist.id"
          :class="{ active: selectedStylist.id == stylist.id }">
          <figure><a @click="selectedStylist = stylist"><img :src="stylist.avatar_url" /></a></figure>
        </div>
      </div>
    </v-loading>
  </div>
  <div class="times-d"  v-show="stylists.length">
    <div class="title">Chọn thời gian</div>
    <div class="dates-times" v-show="selectedStylist.id">
      <div class="tp-datetime">
        <div class="dates">
          <div v-for="date in dates"
            :key="date.id"
            :class="{ active: date.id == selectedDate.format('YYYY-MM-DD') }"
            @click="selectedDate = date.date"
            class="item">{{ date.label }}</div>
          <div class="item calendar"><i class="bz-calendar-day"></i>calendar</div>
        </div>
        <v-loading loader="fetching slots">
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
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { head, reduce } from 'lodash'
import { mapGetters } from 'vuex'

const today = moment()
const DATE_FORMAT = 'YYYY-MM-DD'

export default {
  name: 'SalonStylists',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['cartServices']),
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
      stylists: [],
      slots: [],
      selectedStylist: { id: 0 },
      selectedSlot: { label: '' },
      selectedDate: today
    }
  },
  mounted () {
    this.fetchStylists()
  },
  watch: {
    'cartServices': 'fetchStylists',
    'selectedStylist': 'fetchSlots',
    'selectedDate': 'fetchSlots',
    'selectedSlot': 'setBookingDate',
    stylists (value) {
      this.$bus.$emit('serviceStylists', value)
    }
  },
  methods: {
    fetchStylists () {
      this.$store.dispatch('removeStylist')
      this.resetState()
      const services = reduce(this.cartServices, (result, { id }) => {
        result.push(id)
        return result
      }, [])

      if (services.length) {
        this.$startLoading('fetching stylists')
        this.$http.get(`salons/${this.salon.id}/stylists`, { params: { services } }).then(({ data }) => {
          this.stylists = data
          this.$endLoading('fetching stylists')
          this.setSelectedStylist()
        }).catch(() => this.$endLoading(`fetching stylists`))
      } else {
        this.stylists = []
      }
    },
    fetchSlots () {
      this.resetState()
      if (!this.selectedStylist.id) {
        this.$store.dispatch('removeStylist')
        return
      }

      this.$store.dispatch('setStylist', this.selectedStylist)

      this.$startLoading(`fetching slots`)
      this.$http.get(`stylists/${this.selectedStylist.id}/schedule`, { params: { date: this.selectedDate.format(DATE_FORMAT) } }).then(({ data }) => {
        this.slots = data
        this.$endLoading(`fetching slots`)
      }).catch(() => this.$endLoading(`fetching slots`))
    },
    setSelectedStylist () {
      if (this.stylists.length) {
        this.selectedStylist = head(this.stylists)
      }
    },
    setBookingDate () {
      let date = null
      if (this.selectedSlot.start) {
        date = moment(this.selectedSlot.start)
      }

      this.$store.dispatch('setBookingDate', date)
    },
    resetState () {
      this.slots = []
      this.selectedSlot = { label: '' }
    }
  }
}
</script>

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
          :class="{ active: cartStylist.id == stylist.id }">
          <figure><a @click="setSelectedStylist(stylist)"><img :src="stylist.avatar_url" /></a></figure>
        </div>
      </div>
    </v-loading>
  </div>
  <div class="times-d"  v-show="stylists.length">
    <div class="title">Chọn thời gian</div>
    <div class="dates-times" v-show="cartStylist.id">
      <calendar v-model="selectedDate" wrapperClass="tp-datetime">
        <v-loading loader="fetching slots">
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
          <div class="empty" v-if="!slots.length"><strong>Không còn lịch trống.</strong><br />Vui lòng chọn ngày khác hoặc stylist khác</div>
        </v-loading>
      </calendar>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { head, reduce } from 'lodash'
import { mapGetters } from 'vuex'
import store from 'store2'
import Calendar from '../partials/Calendar'

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
  components: {
    Calendar
  },
  computed: {
    ...mapGetters(['cartServices', 'cartStylist']),
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
      selectedSlot: { label: '' },
      selectedDate: today
    }
  },
  mounted () {
    this.fetchStylists()
    this.setSelectedDate()
  },
  watch: {
    'cartServices': 'fetchStylists',
    'cartStylist': 'fetchSlots',
    'selectedDate': 'fetchSlots',
    'selectedSlot': 'setBookingDate',
    stylists (value) {
      this.$bus.$emit('serviceStylists', value)
    }
  },
  methods: {
    getServiceIds () {
      return reduce(this.cartServices, (result, { id }) => {
        result.push(id)
        return result
      }, [])
    },
    fetchStylists () {
      this.$store.dispatch('setStylist', {})
      this.resetState()
      const services = this.getServiceIds()

      if (services.length) {
        this.$startLoading('fetching stylists')
        this.$http.get(`salons/${this.salon.id}/stylists`, { params: { services } }).then(({ data }) => {
          this.stylists = data
          this.$endLoading('fetching stylists')
          if (this.stylists.length) {
            let stylist = head(this.stylists)
            const cart = store.get('cart', {})
            const id = parseInt(cart.stylist)
            if (id) {
              const exists = this.stylists.find(s => s.id === id)
              if (exists) {
                stylist = exists
              }
            }
            this.setSelectedStylist(stylist)
          }
        }).catch(() => this.$endLoading(`fetching stylists`))
      } else {
        this.stylists = []
      }
    },
    fetchSlots () {
      this.resetState()
      if (!this.cartStylist.id) {
        return
      }

      const services = this.getServiceIds()
      if (!services.length) {
        return
      }

      this.$startLoading(`fetching slots`)
      this.$http.get(`stylists/${this.cartStylist.id}/schedule`, { params: { services, date: this.selectedDate.format(DATE_FORMAT) } }).then(({ data }) => {
        this.slots = data
        this.$endLoading(`fetching slots`)
        this.setSelectedSlot()
      }).catch(() => this.$endLoading(`fetching slots`))
    },
    setSelectedStylist (stylist) {
      this.$store.dispatch('setStylist', stylist)
    },
    setSelectedSlot () {
      const cart = store.get('cart', {})
      const time = cart.time
      if (time) {
        const slot = this.slots.find(s => s.start === time)
        if (slot) {
          this.selectedSlot = slot
        }
      }
    },
    setSelectedDate () {
      const cart = store.get('cart', {})
      const date = cart.time ? moment(cart.time) : today
      this.selectedDate = date
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

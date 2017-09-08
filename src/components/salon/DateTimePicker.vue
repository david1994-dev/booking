<template>
<div class="datetime-popup" :class="{ active: active }">
  <div class="flex-datetime">
    <div class="close-outer" @click="active = false"></div>
    <div class="inner-datetime">
      <div class="title-datetime">
        <span>Chọn thời gian</span>
        <i class="bz-down-2 close" @click="active = false"></i>
      </div>
      <div class="content-datetime">
        <calendar v-model="date" wrapperClass="tp-datetime">
          <v-loading loader="fetching slots">
            <template slot="spinner">
              <div class="text-center">
                <v-loading-spinner height="30px" width="30px" />
              </div>
            </template>

            <div class="times">
              <div class="item" v-for="slot in slots"
                v-if="slot.status == 'available'"
                :class="{ active: selectedSlot.label == slot.label }"
                @click="setBookingDate(slot)">{{ slot.label }}</div>
            </div>
            <div class="empty" v-if="!slots.length"><strong>Không còn lịch trống.</strong><br />Vui lòng chọn ngày khác hoặc stylist khác</div>
          </v-loading>
        </calendar>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { reduce } from 'lodash'
import store from 'store2'
import Calendar from '../partials/Calendar'

const DATE_FORMAT = 'YYYY-MM-DD'
const today = moment()

export default {
  name: 'DateTimePicker',
  components: {
    Calendar
  },
  computed: mapGetters(['cartServices', 'cartStylist']),
  data () {
    return {
      active: false,
      date: today,
      slots: [],
      selectedSlot: { label: '' }
    }
  },
  mounted () {
    this.$bus.$on('displayDateTimePopup', value => {
      this.active = value
    })
  },
  watch: {
    'date': 'fetchSlots',
    cartStylist (value) {
      this.$store.dispatch('setBookingDate', null)
      if (value.id) {
        const cart = store.get('cart', {})
        this.date = cart.time ? moment(cart.time) : today
      }
    }
  },
  methods: {
    fetchSlots () {
      const services = reduce(this.cartServices, (result, { id }) => {
        result.push(id)
        return result
      }, [])

      if (!services.length) {
        return
      }

      this.$startLoading(`fetching slots`)
      this.$http.get(`stylists/${this.cartStylist.id}/schedule`, { params: { services, date: this.date.format(DATE_FORMAT) } }).then(({ data }) => {
        this.slots = data
        this.$endLoading(`fetching slots`)
        this.setSelectedSlot()
      }).catch(() => this.$endLoading(`fetching slots`))
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
    setBookingDate (slot) {
      let date = null
      if (slot.start) {
        date = moment(slot.start)
      }

      this.selectedSlot = slot
      this.active = false
      this.$store.dispatch('setBookingDate', date)
    }
  }
}
</script>

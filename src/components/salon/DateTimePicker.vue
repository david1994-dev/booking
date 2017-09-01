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
        <calendar v-model="date" :dates="dates">
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
import Calendar from '../partials/Calendar'

const DATE_FORMAT = 'YYYY-MM-DD'

const today = moment()
const tomorrow = moment().add(1, 'd')
const next2Days = moment().add(2, 'd')
const next3Days = moment().add(3, 'd')

const DATES = [
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
  },
  {
    id: next3Days.format(DATE_FORMAT),
    label: next3Days.format('DD/MM'),
    date: next3Days
  }
]

export default {
  name: 'DateTimePicker',
  components: {
    Calendar
  },
  computed: mapGetters(['cartStylist']),
  data () {
    return {
      dates: DATES,
      active: false,
      date: null,
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
      if (value.id) {
        this.date = moment()
      } else {
        this.date = null
      }
    }
  },
  methods: {
    fetchSlots () {
      if (!this.date) {
        this.$store.dispatch('setBookingDate', null)
        return
      }

      this.$startLoading(`fetching slots`)
      this.$http.get(`stylists/${this.cartStylist.id}/schedule`, { params: { date: this.date.format(DATE_FORMAT) } }).then(({ data }) => {
        this.slots = data
        this.$endLoading(`fetching slots`)
      }).catch(() => this.$endLoading(`fetching slots`))
    },
    setBookingDate (slot) {
      let date = null
      if (slot.start) {
        date = moment(slot.start)
      }

      this.active = false
      this.$store.dispatch('setBookingDate', date)
    }
  }
}
</script>

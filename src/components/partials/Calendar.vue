<template>
<div :class="wrapperClass">
  <div class="dates">
    <div v-for="d in dates"
      :key="d.id"
      :class="{ active: d.id == selectedDate.format('YYYY-MM-DD') }"
      @click="updateSelectedDate(d.date)"
      class="item">{{ d.label }}</div>
    <div class="item calendar-btn"
      :class="{ active: isCalendarActive }"
      @click="showDatePicker = true">
      <slot name="button">
        <i class="bz-calendar-day"></i>calendar
      </slot>
    </div>
    <transition name="calendar-fade">
      <date-picker @close="showDatePicker = false"
        :format="formatDate"
        :min="minDate"
        color="#54B2B0"
        v-if="showDatePicker"
        v-model="datetime"></date-picker>
    </transition>
  </div>
  <slot></slot>
</div>
</template>

<script>
import moment from 'moment'
import { last } from 'lodash'
import DatePicker from 'vue-md-date-picker'

const DATE_FORMAT = 'YYYY-MM-DD'
const today = moment().startOf('day')
const tomorrow = today.clone().add(1, 'd')
const next2Days = today.clone().startOf('day').add(2, 'd')

export default {
  model: {
    prop: 'date',
    event: 'dateChanged'
  },
  props: {
    wrapperClass: {
      type: String,
      default: ''
    },
    date: {
      default: today
    },
    format: {
      type: String,
      default: 'DD/MM'
    },
    dates: {
      type: Array,
      default () {
        return [
          {
            id: today.format(DATE_FORMAT),
            label: 'Hôm nay',
            date: today
          },
          {
            id: tomorrow.format(DATE_FORMAT),
            label: tomorrow.format(this.format),
            date: tomorrow
          },
          {
            id: next2Days.format(DATE_FORMAT),
            label: next2Days.format(this.format),
            date: next2Days
          }
        ]
      }
    }
  },
  components: {
    DatePicker
  },
  computed: {
    minDate () {
      const date = last(this.dates)
      const lastDate = date.date ? date.date : today

      return lastDate.clone().add(1, 'd').format(DATE_FORMAT)
    },
    isCalendarActive () {
      return this.selectedDate.isSameOrAfter(this.minDate)
    }
  },
  data () {
    return {
      selectedDate: this.date,
      showDatePicker: false,
      datetime: null
    }
  },
  watch: {
    showDatePicker (value) {
      if (value) {
        document.body.classList.add('calendar-slick')
      } else {
        document.body.classList.remove('calendar-slick')
      }
    },
    date (value) {
      if (!value) {
        value = moment()
      }
      if (!moment.isMoment(value)) {
        value = moment(value)
      }
      this.selectedDate = value
    },
    datetime (value) {
      if (value) {
        this.updateSelectedDate(moment(value))
      }
    }
  },
  methods: {
    updateSelectedDate (date) {
      // this.selectedDate = date
      this.$emit('dateChanged', date)
    },
    updateSelectedSlot (slot) {
      this.selectedSlot = slot
      this.$emit('timeChanged', slot)
    },
    formatDate (date) {
      return date ? moment(date, 'YYYY-M-D').format('YYYY-MM-DD') : null
    }
  }
}
</script>

<template>
<div class="tp-datetime">
  <div class="dates">
    <div v-for="date in dates"
      :key="date.id"
      :class="{ active: date.id == selectedDate.format('YYYY-MM-DD') }"
      @click="updateSelectedDate(date.date)"
      class="item">{{ date.label }}</div>
    <slot name="button">
      <div class="item calendar"><i class="bz-calendar-day"></i>calendar</div>
    </slot>
  </div>
  <slot></slot>
</div>
</template>

<script>
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'
const today = moment()
const tomorrow = moment().add(1, 'd')
const next2Days = moment().add(2, 'd')

export default {
  model: {
    prop: 'date',
    event: 'dateChanged'
  },
  props: {
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
  data () {
    return {
      selectedDate: today
    }
  },
  watch: {
    date (value) {
      if (!value) {
        value = moment()
      }
      if (!moment.isMoment(value)) {
        value = moment(value)
      }
      this.selectedDate = value
    }
  },
  methods: {
    updateSelectedDate (date) {
      this.selectedDate = date
      this.$emit('dateChanged', date)
    },
    updateSelectedSlot (slot) {
      this.selectedSlot = slot
      this.$emit('timeChanged', slot)
    }
  }
}
</script>

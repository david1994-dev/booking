<template>
<div class="working-d">
  <div class="title text-uppercase">{{ $t('salon.working_hours')}}</div>
  <div class="list">
    <div class="item" v-for="(hours, day) in salon.opening_hours" v-if="hours.open && hours.close">
      <span>{{ displayDate(day) }}</span>
      <span>{{ hours.open }} - {{ hours.close }}</span>
    </div>
  </div>
</div>
</template> n

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
      translateText: '',
      staff: {
      }
    }
  },
  computed: {
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
    viewInfoStaff (child) {
      this.staff = child
      this.$nextTick(() => this.$refs.staffModal.show())
    }
  }
}
</script>

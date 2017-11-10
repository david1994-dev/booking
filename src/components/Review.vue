<template>
<div>
  <page-header />
  <div class="contact-page">
    <div class="tp-container">
      <div class="content-page" v-if="booking.salon">
        <div class="address-info">
          <div class="info" style="margin-top: 80px">
            <div class="item" v-if="booking.salon">
              <div class="icon"><i class="bz-location"></i></div>
              <div class="name-value">
                <div class="name">{{ booking.salon.name }}</div>
                <div class="value">{{ booking.salon.address }}</div>
              </div>
            </div>
            <div class="item" v-if="booking.start_date && booking.end_date">
              <div class="icon"><i class="bz-clock"></i></div>
              <div class="name-value">
                <div class="name">{{ booking.formatted_price }}</div>
                <div class="value">{{ booking.start_date | dateFormat('H:mm D/MM/YYYY') }}</div>
              </div>
            </div>
            <div class="item" v-if="booking.reservations && booking.reservations.length">
              <div class="icon"><i class="bz-hair-spray"></i></div>
              <div class="name-value">
                <div v-for="reservation in booking.reservations">
                  <div class="name">{{ reservation.service.name }}</div>
                  <!-- <div class="value">(123) 123-456</div> -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap-form">
          <div class="title-form">Đánh giá</div>
          <div class="adress" style="margin-bottom: 10px;">
            Cảm ơn bạn đã tin tưởng sử dụng dịch vụ của Bzone cho lần trải nghiệm vừa qua tại salon {{ booking.salon.name }}
          </div>
          <b-alert :variant="alertVariant" :show="showAlert">{{ alertMessage }}</b-alert>
          <form v-if="!booking.review" @submit.prevent="submit">
            <star-rating v-model="rating"
              activeColor="#54B2B0"
              inactiveColor="#ccc"></star-rating>
            <textarea rows="7" placeholder="Đánh giá"
              v-model="content"
              class="txt-field tae-field"></textarea>
            <input class="tp-btn btn-submit" type="submit"
              @click.prevent="submit"
              :disabled="!canSubmit"
              value="Gửi đánh giá" />
          </form>
          <div v-else>Cảm ơn bạn đã đánh giá lần trải nghiệm vừa qua tại salon {{ booking.salon.name }}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PageHeader from './layout/Header'
import StarRating from 'vue-star-rating'

export default {
  name: 'Review',
  components: {
    PageHeader,
    StarRating
  },
  metaInfo: {
    title: 'Đánh giá trải nghiệm'
  },
  computed: {
    canSubmit () {
      return (!this.$isLoading('saving review') && this.content)
    }
  },
  data () {
    return {
      rating: 5,
      content: '',
      showAlert: false,
      alertVariant: 'info',
      alertMessage: '',
      booking: {}
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching booking')
      this.$http.get(`bookings/${this.$route.params.id}`, { params: { includes: 'salon,user,review,reservations.stylist,reservations.service' } }).then(({ data }) => {
        this.booking = data
        this.$endLoading('fetching booking')
      }).catch(() => {
        this.$endLoading('fetching booking')
      })
    },
    submit () {
      if (!this.content) {
        return
      }
      const postData = {
        rating: this.rating,
        content: this.content
      }
      this.$startLoading('saving review')
      this.$http.post(`bookings/${this.$route.params.id}/review`, postData).then(({ data }) => {
        this.booking.review = {}
        this.resetState()
        this.$endLoading('saving review')
      }).catch(({ response }) => {
        this.alertMessage = response.data.message
        this.alertVariant = 'danger'
        this.showAlert = true
        this.$endLoading('saving review')
      })
    },
    resetState () {
      this.rating = 5
      this.content = ''
      this.showAlert = false
      this.alertVariant = 'info'
      this.alertMessage = ''
    }
  }
}
</script>

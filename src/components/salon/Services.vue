<template>
<div class="service-d">
  <div class="title">Chọn dịch vụ</div>
  <!-- <v-loading loader="fetching salon">
    <template slot="spinner">
      <div class="text-center">
        <v-loading-spinner height="30px" width="30px" />
      </div>
    </template>


  </v-loading> -->
  <div class="list">
    <label class="item" v-for="service in salon.services" :key="service.id">
      <div class="tp-checkbox">
        <input type="checkbox" :checked="isChecked(service)"
          @change="toggleService(service, $event.target.checked)" /><span></span>
      </div>
      <div class="name-price">
        <div class="name-serivce">{{ service.category.name }}</div>
        <div class="price-wrap">
          <div class="sale-off" v-if="service.has_discount">{{ offerDetail(service) }}</div>
          <div class="price">
            <div class="number" v-if="service.up_to_price">{{ service.formatted_price }}&nbsp;-&nbsp;{{ service.up_to_price | numberFormat('0,0') }} {{ service.currency }}</div>
            <div class="number" v-else>{{ service.formatted_price }}</div>
            <strong>trong</strong>
            <div class="time">{{ service.duration }} phút</div>
          </div>
        </div>
      </div>
    </label>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from 'store2'
import moment from 'moment'

export default {
  name: 'SalonServices',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  computed: mapGetters(['cartServices']),
  mounted () {
    this.setSelectedService()
  },
  methods: {
    isChecked (service) {
      return this.cartServices.find(s => s.id === service.id)
    },
    toggleService (service, checked) {
      if (checked) {
        this.$store.dispatch('addServiceToCart', service)
      } else {
        this.$store.dispatch('removeServiceFromCart', service)
      }
    },
    setSelectedService () {
      const cart = store.get('cart', {})
      const category = parseInt(cart.category)
      const service = this.salon.services.find(s => s.category_id === category)
      if (service) {
        this.toggleService(service, true)
      }
    },
    offerDetail (service) {
      if (service.has_discount) {
        return `Chỉ còn ${service.formatted_discount_price} từ ${moment(service.discount_starts).format('DD/MM')} - ${moment(service.discount_expires).format('DD/MM')}`
      }

      return ''
    }
  }
}
</script>

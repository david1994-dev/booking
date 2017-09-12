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
        <strong>{{ service.category.name }}</strong>
        <div class="fl-full"></div>
        <span class="brace">(</span><span>{{ service.formatted_price }} - {{ service.duration }} phút</span><span class="brace">)</span>
      </div>
    </label>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import store from 'store2'

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
    }
  }
}
</script>

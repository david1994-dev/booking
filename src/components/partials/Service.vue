<template>
<label class="item-sub">
  <div class="name-time">
    <div class="name">{{ service.name }}</div>
    <div class="time">{{ service.duration }} {{ $t('common.minutes') }}</div>
  </div>
  <div class="price-save">
    <div class="price">{{ service.has_discount ? service.formatted_discount_price : service.formatted_price }}</div>
    <div class="save" v-if="service.has_discount">{{ service.discount_offer }}</div>
  </div>
  <div class="action">
    <div class="tp-checkbox check-plus">
      <input type="checkbox" :checked="isChecked(service)"
        @change="toggleService(service, $event.target.checked)"><span></span>
    </div>
  </div>
</label>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    service: {
      required: true,
      type: Object
    }
  },
  computed: mapGetters(['cartServices']),
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
    }
  }
}
</script>

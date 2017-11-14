<template>
<div class="service-d">
  <div class="title">{{ $t('salon.select_service') }}</div>
  <v-loading loader="fetching services">
    <template slot="spinner">
      <div class="text-center">
        <v-loading-spinner height="30px" width="30px" />
      </div>
    </template>

    <div class="content-service">
      <div class="left">
        <div class="item" v-for="(category, i) in categories"
          :key="category.id"
          :class="{ active: index === i, selected: isSelected(category) }"
          @click="index = i">
          {{ category.name }} ({{ category.services.length }})
          <svg width="16px" viewBox="0 0 16 32" preserveAspectRatio="none">
            <path d="M0,0 L16,16 L0,32 Z" fill="black"></path>
          </svg>
          <i class="bz-check"></i>
        </div>
      </div>
      <div class="right">
        <div class="item" v-for="(category, i) in categories"
          :key="category.id"
          :class="{ active: index === i, selected: isSelected(category) }"
          @click="index = i">
          <div class="name-item"><span>{{ category.name }} ({{ category.services.length }})</span><div class="action"><i class="bz-check"></i><i class="bz-down-2"></i></div></div>
          <div class="sub-service">
            <service-items v-for="service in category.services"
              :key="service.id"
              :service="service"></service-items>
          </div>
        </div>
      </div>
    </div>
  </v-loading>
  <!-- <div class="list">
    <label class="item" v-for="service in salon.services" :key="service.id" v-if="!service.is_group">
      <div class="tp-checkbox">
        <input type="checkbox" :checked="isChecked(service)"
          @change="toggleService(service, $event.target.checked)" /><span></span>
      </div>
      <div class="name-price">
        <div class="name-serivce">{{ service.name }}</div>
        <div class="price-wrap">
          <div class="sale-off" v-if="service.has_discount">{{ offerDetail(service) }}</div>
          <div class="price">
            <div class="number" v-if="service.up_to_price">{{ service.formatted_price }}&nbsp;-&nbsp;{{ service.up_to_price | numberFormat('0,0') }} {{ service.currency }}</div>
            <div class="number" v-else>{{ service.formatted_price }}</div>
            <strong>{{ $t('common.in') }}</strong>
            <div class="time">{{ service.duration }} {{ $t('common.minutes') }}</div>
          </div>
        </div>
      </div>
    </label>
  </div> -->
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { flatten, includes, map, uniq } from 'lodash'
import store from 'store2'
import moment from 'moment'
const ServiceItems = () => import(/* webpackChunkName: "salon-bundle" */ '../partials/ServiceItems')

export default {
  name: 'SalonServices',
  components: {
    ServiceItems
  },
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['cartServices']),
    services () {
      return flatten(this.salon.services.map(service => service.children))
    },
    selected () {
      if (this.cartServices.length) {
        return uniq(map(this.cartServices, 'category_id'))
      }

      return []
    }
  },
  data () {
    return {
      categories: [],
      index: 0
    }
  },
  mounted () {
    // this.setSelectedService()
    this.fetchServices()
    this.$bus.$on('locale::change', locale => {
      this.fetchServices()
    })
  },
  methods: {
    fetchServices () {
      this.$startLoading('fetching services')
      this.$http.get(`salons/${this.salon.id}/services`, { params: { withCategories: 1 } }).then(({ data }) => {
        this.categories = data
        this.$endLoading('fetching services')
        this.setSelectedService()
      }).catch(() => this.$endLoading('fetching services'))
    },
    setSelectedService () {
      const cart = store.get('cart', {})
      const categoryId = parseInt(cart.category)
      const serviceId = parseInt(cart.service)

      if (serviceId) {
        const service = this.salon.services.find(s => s.id === serviceId)
        if (service && !service.is_group) {
          this.$store.dispatch('addServiceToCart', service)
        }
      }

      if (categoryId) {
        const index = this.categories.findIndex(c => c.id === categoryId)
        if (index > -1) {
          this.index = index
        }
      }
    },
    offerDetail (service) {
      if (service.has_discount) {
        return `Chỉ còn ${service.formatted_discount_price} từ ${moment(service.discount_starts).format('DD/MM')} - ${moment(service.discount_expires).format('DD/MM')}`
      }

      return ''
    },
    isSelected (category) {
      return includes(this.selected, category.id)
    }
  }
}
</script>

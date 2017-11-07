<template>
<div class="item-subs"
  :class="{ active: expand }">
  <div class="name-sub" v-if="service.is_group"
    @click="expand = !expand">
    <div class="name-time">
      <div class="name">{{ service.name }}</div>
      <div class="time">{{ cheapestService.id ? `${cheapestService.duration} ${$t('common.minutes')}` : '&nbsp;' }}</div>
    </div>
    <div class="price-save">
      <div class="price">{{ $t('common.from') }} {{ cheapestService.id ? cheapestService.formatted_discount_price : '&nbsp;' }}</div>
      <div class="save">&nbsp;</div>
    </div>
    <div class="action"><i class="bz-down-2"></i></div>
  </div>
  <service v-else
    :service="service"></service>
  <div class="sub-list" v-if="service.children && service.children.length">
    <service v-for="sv in service.children" :key="sv.id"
      :service="sv"></service>
  </div>
</div>
</template>

<script>
import { minBy } from 'lodash'
const Service = () => import(/* webpackChunkName: "salon-bundle" */ './Service')

export default {
  name: 'ServiceItems',
  components: {
    Service
  },
  props: {
    service: {
      required: true,
      type: Object
    }
  },
  computed: {
    cheapestService () {
      if (this.service.is_group) {
        return minBy(this.service.children, 'discount_price')
      }

      return {}
    }
  },
  data () {
    return {
      expand: false
    }
  }
}
</script>

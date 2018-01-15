<template>
<div class="sale-off tp-box" v-if="promotions.length">
  <div class="tp-wrap-title">
    <h3 class="tp-title"><strong>Khuyến mại</strong> hấp dẫn</h3>
    <div class="tp-view-more orange"><a href="#">{{ $t('common.see_more') }}</a></div>
  </div>
  <div class="ofhd">
    <div class="list">
      <div :class="classImage(promotion.image_type)" v-for="promotion in promotions" :key="promotion.id">
        <figure v-if="promotion.salons.length > 1"><router-link :to="{ name: 'showcase', params: { id: promotion.slug } }"><img :src="promotion.image_url" /></router-link></figure>
        <figure v-if="promotion.salons.length === 1"><router-link :to="{ name: 'salon', params: { id: promotion.salons[0].slug } }"><img :src="promotion.image_url" /></router-link></figure>
      </div>
    </div>
  </div>

  <div class="tp-view-more bottom orange"><a href="#">{{ $t('common.see_more') }}</a></div>
</div>
</template>
<script>
export default {
  name: 'Promotion',
  data () {
    return {
      promotions: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcases')
      this.$http.get('showcases', { params: { limit: 4, type: 4, includeSalon: 1 } }).then(({ data }) => {
        this.promotions = data.data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    },
    classImage (imageType) {
      if (imageType === 2) {
        return 'item half-percent'
      }
      return 'item'
    }
  }
}
</script>
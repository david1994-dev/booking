<template>
<div v-if="topSalons.length">
	<div class="top-barbershop tp-box" v-for="topSalon in topSalons">
		<div class="tp-wrap-title">
			<h3 class="tp-title"><strong>{{ topSalon.name }}</strong></h3>
			<div class="tp-view-more orange"><router-link :to="{ name: 'showcase', params: { id: topSalon.slug } }">{{ $t('common.see_more') }}</router-link></div>
		</div>
		<div class="ofhd">
			<div class="list">
				<div class="item" v-for="salon in topSalon.salons">
					<figure><router-link :to="{ name: 'salon', params: { id: salon.slug } }"><img :src="salon.image_url"></router-link></figure>
					<h3><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h3>
					<div class="address">{{ salon.address }}</div>
					<div class="tp-rate">
						<stars :rating="salon.average_rating_rounded">
	          			</stars>
						<div class="dash">-</div>
						<div class="rate-status">{{ $t('common.rates',{'rates':salon.review_count})}}
						</div>
					</div>
					<div class="price">Giá {{ salon.min_price.has_discount ? salon.min_price.formatted_discount_price : salon.min_price.formatted_price }}/lần
					</div>
				</div>
			</div>
		</div>

		<div class="tp-view-more bottom orange"><router-link :to="{ name: 'showcase', params: { id: topSalon.slug } }">{{ $t('common.see_more') }}</router-link>
		</div>
	</div>
</div>
</template>
<script>
import Stars from '../partials/StarRating'

export default {
  name: 'TopSalon',
  data () {
    return {
      topSalons: []
    }
  },
  created () {
    this.fetchData()
  },
  components: {
    Stars
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcases')
      this.$http.get('showcases', { params: { limit: 4, booking_count: 1, type: 2, includeSalon: 1, salon_services: 1, limit_salon: 8 } }).then(({ data }) => {
        this.topSalons = data.data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    }
  }
}
</script>
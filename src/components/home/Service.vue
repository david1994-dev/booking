<template>
  <div class="discovery tp-box" v-if="services.length">
    <div class="tp-wrap-title">
      <h3 class="tp-title"><strong>Top dịch vụ</strong> Phổ biến</h3>
      <!-- <div class="tp-view-more orange"><router-link :to="{ name: 'explore' }">{{ $t('common.see_more') }}</router-link></div> -->
    </div>
    <div class="ofhd">
      <v-loading loader="fetching showcases">
        <template slot="spinner">
          <div class="text-center">
            <v-loading-spinner height="30px" width="30px" />
          </div>
        </template>
        <div class="tp-discovery" v-if="services.length">
          <div class="item" v-for="service in services" :key="service.id">
            <figure><router-link :to="{ name: 'showcase', params: { id: service.slug } }"><img :src="service.image_url" /></router-link></figure>
            <div class="info">
              <h4><router-link :to="{ name: 'showcase', params: { id: service.slug } }">{{ service.name }}</router-link></h4>
              <span>{{ $t('home.explore.booked', {'booking_times': service.total_booking}) }}</span>
            </div>
          </div>
        </div>
      </v-loading>
    </div>

    <!-- <div class="tp-view-more bottom orange"><router-link :to="{ name: 'explore' }">{{ $t('common.see_more') }}</router-link></div> -->
  </div>
</template>

<script>
export default {
  name: 'Service',
  data () {
    return {
      services: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcases')
      this.$http.get('showcases', { params: { limit: 4, booking_count: 1, type: 1 } }).then(({ data }) => {
        this.services = data.data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    }
  }
}
</script>

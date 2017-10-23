<template>
<div class="guide-discovery">
  <div class="guide-book tp-box">
    <div class="tp-wrap-title">
      <h3 class="tp-title"><strong>{{ $t('home.steps.to_be_beautiful') }}</strong> {{ $t('home.steps.in_4_steps') }}</h3>
    </div>
    <div class="ofhd">
      <div class="list">
        <div class="item">
          <div class="name">{{ $t('home.steps.step1') }}</div>
          <div class="content-item">
            <div class="number">1</div>
            <p class="des">{{ $t('home.steps.step1_detail') }}</p>
          </div>
        </div>
        <div class="item">
          <div class="name">{{ $t('home.steps.step2') }}</div>
          <div class="content-item">
            <div class="number">2</div>
            <p class="des">{{ $t('home.steps.step2_detail') }}</p>
          </div>
        </div>
        <div class="item">
          <div class="name">{{ $t('home.steps.step3') }}</div>
          <div class="content-item">
            <div class="number">3</div>
            <p class="des">{{ $t('home.steps.step3_detail') }}</p>
          </div>
        </div>
        <div class="item">
          <div class="name">{{ $t('home.steps.step4') }}</div>
          <div class="content-item">
            <div class="number">4</div>
            <p class="des">{{ $t('home.steps.step4_detail') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="discovery tp-box">
    <div class="tp-wrap-title">
      <h3 class="tp-title"><strong>{{ $t('home.explore.exploring') }}</strong> {{ $t('home.explore.the_salon') }}</h3>
      <div class="tp-view-more orange"><router-link :to="{ name: 'explore' }">{{ $t('common.see_more') }}</router-link></div>
    </div>
    <div class="ofhd">
      <v-loading loader="fetching showcases">
        <template slot="spinner">
          <div class="text-center">
            <v-loading-spinner height="30px" width="30px" />
          </div>
        </template>

        <div class="tp-discovery" v-if="showcases.length">
          <div class="item" v-for="showcase in showcases" :key="showcase.id">
            <figure><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }"><img :src="showcase.image_url" /></router-link></figure>
            <div class="info">
              <h4><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }">{{ showcase.name }}</router-link></h4>
              <span>{{ $t('home.explore.booked', {'booking_times': showcase.total_booking}) }}</span>
            </div>
          </div>
        </div>
      </v-loading>
    </div>

    <div class="tp-view-more bottom orange"><router-link :to="{ name: 'explore' }">{{ $t('common.see_more') }}</router-link></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Explore',
  data () {
    return {
      showcases: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcases')
      this.$http.get('showcases', { params: { limit: 4, booking_count: 1 } }).then(({ data }) => {
        this.showcases = data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    }
  }
}
</script>

<template>
<div>
  <page-header />
  <div class="detail-page">
    <cover-slider :images="salon.covers" />

    <scrollactive ref="scrollactive"
      class="content"
      active-class="active"
      :offset="58">
      <div class="main-content">
        <div class="wrap-menu">
          <ul class="menu">
            <li><a href="#about" class="scrollactive-item">Giới thiệu</a></li>
            <li><a href="#services" class="scrollactive-item">Dịch vụ</a></li>
            <li><a href="#stylists" class="scrollactive-item">Stylist</a></li>
            <li><a href="#images" class="scrollactive-item">Hình ảnh</a></li>
            <li><a href="#reviews" class="scrollactive-item">Đánh giá</a></li>
          </ul>
        </div>

        <div id="about" >
          <overview :salon="salon"></overview>
        </div>

        <div id="services">
          <services :salon="salon"></services>
        </div>

        <div id="stylists">
          <stylists :salon="salon"></stylists>
        </div>

        <div id="images">
          <gallery :salon="salon"></gallery>
        </div>

        <div id="reviews">
          <reviews :salon="salon"></reviews>
        </div>

        <div class="map-d" v-if="salon.latitude && salon.longitude">
          <div class="title">Bản đồ</div>
          <div class="content-map">
            <gmap-map ref="map"
              :center="{ lat: salon.latitude, lng: salon.longitude }"
              :zoom="14"
              :options="{ mapTypeControl: false, streetViewControl: false }"
              style="width: 600px; height: 280px">
              <gmap-marker :position="{ lat: salon.latitude, lng: salon.longitude }"></gmap-marker>
            </gmap-map>
          </div>
        </div>
      </div>

      <cart />
    </scrollactive>
    <relate />
  </div>
</div>
</template>

<script>
import { stickyClassMixin } from '@/utils/mixins'
import PageHeader from './layout/Header'
const CoverSlider = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Covers')
const Overview = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Overview')
const Services = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Services')
const Stylists = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Stylists')
const Gallery = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Gallery')
const Reviews = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Reviews')
const Relate = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Relate')
const Cart = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Cart')

export default {
  name: 'Salon',
  components: {
    PageHeader,
    CoverSlider,
    Overview,
    Services,
    Stylists,
    Gallery,
    Reviews,
    Relate,
    Cart
  },
  mixins: [stickyClassMixin],
  data () {
    return {
      salon: {}
    }
  },
  metaInfo () {
    return {
      title: this.salon.name
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('clearSearchQuery')
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('clearCart').then(() => next())
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('clearCart').then(() => next())
  },
  created () {
    this.fetchSalon()
  },
  mounted () {
    this.initSticky()
  },
  watch: {
    '$route': 'fetchSalon'
  },
  methods: {
    fetchSalon () {
      this.$startLoading('fetching salon')
      this.$http.get(`salons/${this.$route.params.id}`, { params: { includes: 'covers,gallery,services.category' } }).then(({ data }) => {
        this.salon = data
        this.$endLoading('fetching salon')
      }).catch(() => this.$endLoading('fetching salon'))
    },
    initSticky () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.addStickyClass('.wrap-menu')
        }, 1000)
      })
    }
  }
}
</script>

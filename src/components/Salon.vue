<template>
<div>
  <stylist-picker />
  <page-header />
  <div class="detail-page">
    <cover-slider v-if="salon.covers" :images="salon.covers" />
    <div class="content">
        <scrollactive ref="scrollactive"
          v-if="salon.id"
          class="content-cart"
          active-class="active"
          :offset="58">
          <div class="main-content">
            <div class="wrap-menu">
              <ul class="menu">
                <li><a href="#about" class="scrollactive-item">{{ $t('salon.introduce') }}</a></li>
                <li><a href="#stylists-f" class="scrollactive-item" id="mennu-stylists" >{{ $t('salon.staff') }}</a></li>
                <li><a href="#services" class="scrollactive-item" id="mennu-services" >{{ $t('salon.service') }}</a></li>
                <li><a href="#images" class="scrollactive-item">{{ $t('salon.gallery') }}</a></li>
                <li><a href="#reviews" class="scrollactive-item" id="mennu-reviews">{{ $t('salon.ratting') }}</a></li>
              </ul>
            </div>

            <div id="about" >
              <overview v-if="salon.id" :salon="salon"></overview>
            </div>

            <div id="services">
              <services v-if="salon.id" :salon="salon"></services>
            </div>

            <div id="stylists">
              <stylists v-if="salon.id" :salon="salon"></stylists>
            </div>

            <div id="images">
              <gallery v-if="salon.id" :salon="salon"></gallery>
            </div>

            <div id="reviews">
              <reviews v-if="salon.id" :salon="salon"></reviews>
            </div>
          </div>



          <cart v-if="salon.id" :salon="salon" />
        </scrollactive>
        <!--<div class="ads-d"><a href="#"><img src="http://frontend.ajaxle.co/bzone/assets/images/ads-1.jpg" /></a></div>-->
        <div class="map-about">
          <div class="map-d" v-if="salon.latitude && salon.longitude">
            <div class="title text-uppercase" style="text-transform: uppercase">{{ $t('salon.map') }}</div>
            <div class="content-map">
              <gmap-map ref="map"
                :center="{ lat: salon.latitude, lng: salon.longitude }"
                :zoom="15"
                :options="mapOptions"
                style="width: 100%; height: 280px">
                <gmap-marker :position="{ lat: salon.latitude, lng: salon.longitude }"></gmap-marker>
              </gmap-map>
            </div>
          </div>

          <div class="address-d">
            <div class="name"><i class="bz-location"></i>{{ salon.name }}</div>
            <div class="address">{{ salon.address }}</div>
          </div>

          <div class="about-des-d">
            <div class="title text-uppercase">VỀ CHÚNG TÔI</div>
            <div class="content-about">
              {{ salon.description }}
            </div>
          </div>

          <div class="working">
            <working v-if="salon.id" :salon="salon"></working>
          </div>
          <div class="utilities-d" >
            <div class="title text-uppercase">{{ $t('salon.utilities') }}</div>
            <ul v-if="salon.amenities">
              <li v-for="amenity in salon.amenities" :key="amenity.id">
                <i :class="amenity.icon" v-b-tooltip.hover.top :title="amenity.name"></i>
                <span>{{ amenity.description || amenity.name }}</span>
              </li>
            </ul>
          </div>
          <div class="chemical-d" >
            <div class="title text-uppercase">{{ $t('salon.chemicals') }}</div>
            <div class="list">
              <div class="item" v-for="chemical in salon.chemicals" :key="chemical.id">
                <img style="border-radius: 50%;border:1px solid" :src="chemical.image_url">
                <span>{{ chemical.name }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    <related v-if="salon.id" :salon="salon" />
  </div>

  <date-time-picker />
</div>
</template>

<script>
import { stickyClassMixin } from '@/utils/mixins'
import { googlemap } from '@/config'
import PageHeader from './layout/Header'
const CoverSlider = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Covers')
const Overview = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Overview')
const Working = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Working')
const Services = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Services')
const Stylists = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Stylists')
const News = () => import(/* webpackChunkName: "salon-bundle" */ './salon/News')
const Gallery = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Gallery')
const Reviews = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Reviews')
const Related = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Related')
const Cart = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Cart')
const DateTimePicker = () => import(/* webpackChunkName: "salon-bundle" */ './salon/DateTimePicker')
const StylistPicker = () => import(/* webpackChunkName: "salon-bundle" */ './salon/StylistPicker')

export default {
  name: 'Salon',
  components: {
    PageHeader,
    CoverSlider,
    Overview,
    Working,
    Services,
    Stylists,
    News,
    Gallery,
    Reviews,
    Related,
    Cart,
    DateTimePicker,
    StylistPicker
  },
  mixins: [stickyClassMixin],
  data () {
    return {
      salon: {
        opening_hours: [],
        meta: {}
      },
      mapOptions: googlemap
    }
  },
  metaInfo () {
    return {
      title: this.salon.name || 'Thương hiệu',
      meta: [
        { name: 'keywords', content: this.salon.meta.keyword },
        { name: 'description', content: this.salon.meta.description }
      ]
    }
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
    this.$bus.$on('locale::change', locale => {
      this.fetchSalon()
    })
  },
  watch: {
    '$route': 'fetchSalon'
  },
  methods: {
    fetchSalon () {
      if (!this.$route.params.id) {
        return
      }

      this.$startLoading('fetching salon')
      this.$http.get(`salons/${this.$route.params.id}`, { params: { includes: 'stylists,news,covers,gallery,services,chemicals,amenities' } }).then(({ data }) => {
        this.salon = data
        this.$store.dispatch('setSalon', data)
        this.$endLoading('fetching salon')
        this.$bus.$on('coverSliderInit', () => this.initSticky())
      }).catch(() => this.$endLoading('fetching salon'))
    },
    initSticky () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.addStickyClass('.wrap-menu')
        }, 500)
      })
    }
  }
}
</script>

<template>
<div class="searchsalon-page">
  <div class="box-salons">
    <div class="tp-salon" v-for="salon in salons"
      :key="salon.id"
      @mouseover="mouseOver(salon)"
      @mouseleave="mouseLeave(salon)">
      <div class="img-price">
        <figure><router-link :to="{ name: 'salon', params: { id: salon.slug } }"><img :src="salon.image_url" /></router-link>
        </figure>
        <div class="price-rate">
          <div class="price">
            <span>From</span>
            <strong>324.000 VND</strong>
          </div>
          <div class="rate">
            <div class="tp-rate">
              <div class="rate-status">Rất tốt</div>
              <div class="stars-number">
                <stars v-if="salon.average_rating" :rating="salon.average_rating" />
                <div class="number">{{ salon.review_count }} Đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <salon :salon="salon" />
    </div>
    <infinite-loading
      :on-infinite="onInfinite"
      spinner="waveDots"
      ref="infiniteLoading"></infinite-loading>
  </div>

  <div class="wrap-maps">
    <div class="maps">
      <gmap-map ref="map"
        :center="center"
        :zoom="14"
        :options="{ mapTypeControl: false, streetViewControl: false }"
        style="width: 100%; height: 100%">
        <gmap-marker v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :clickable="true"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { merge } from 'lodash'
// import RichMarker from 'googlemaps-js-rich-marker'
import { stickyClassMixin } from '@/utils/mixins'
const Salon = () => import(/* webpackChunkName: "search-bundle" */ './Salon')
import Stars from '../partials/StarRating'

export default {
  name: 'SearchSalons',
  components: {
    Salon,
    Stars,
    InfiniteLoading
  },
  mixins: [stickyClassMixin],
  computed: {
    markers () {
      const markers = []
      this.salons.map(salon => {
        if (salon.latitude && salon.longitude) {
          const marker = {
            id: salon.id,
            position: { lat: salon.latitude, lng: salon.longitude }
          }
          salon.marker = marker
          markers.push(marker)
        }
      })

      return markers
    }
  },
  data () {
    return {
      center: { lat: 21.00329000, lng: 105.81904500 },
      salons: [],
      meta: {
        pagination: {
          current_page: 0
        }
      }
    }
  },
  mounted () {
    this.addStickyClass('.wrap-maps', 600)
  },
  watch: {
    $route () {
      this.fetchData({}, ({ data }) => {
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        })
        this.salons = data.data
        this.meta = data.meta
      })

      this.$gmapDefaultResizeBus.$emit('resize')
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params = merge(query, params)
      this.$http.get('search', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite () {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.salons = this.salons.concat(data.data)
        this.meta = data.meta
        this.$refs.infiniteLoading.$emit(data.data.length ? '$InfiniteLoading:loaded' : '$InfiniteLoading:complete')
      })
    },
    // initRichMarker () {
    //   /* eslint-disable no-undef */
    //   const marker = new RichMarker.RichMarker({
    //     position: new google.maps.LatLng(21.00329000, 105.81904500),
    //     map: this.$refs.map.$mapObject,
    //     draggable: false,
    //     flat: true,
    //     anchor: RichMarker.RichMarkerPosition.BOTTOM,
    //     content: '<i class="fa fa-star"></i>'
    //   })
    //   // marker.setMap(this.$refs.map.$mapObject)
    //   console.log(marker)
    // },
    mouseOver (salon) {
      if (salon.marker) {
        // this.center = salon.marker.position
      }
    },
    mouseLeave (salon) {
      //
    }
  }
}
</script>

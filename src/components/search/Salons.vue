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
          <div class="price" v-if="salon.min_price">
            <span>From</span>
            <strong>{{ salon.min_price.formatted_price }}</strong>
          </div>
          <div class="rate">
            <div class="tp-rate">
              <div class="rate-status">Rất tốt</div>
              <stars :rating="salon.average_rating">
                <div class="number">{{ salon.review_count }} Đánh giá</div>
              </stars>
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
        <!-- <gmap-marker v-for="marker in markers"
          :key="marker.id"
          :position="marker.position"
          :clickable="true"
        ></gmap-marker> -->
        <gmap-rich-marker v-for="marker in markers"
          :key="marker.id"
          :options="{ flat: true }"
          :position="marker.position"
        >
          <salon-marker :salon="marker.salon" />
        </gmap-rich-marker>
      </gmap-map>
    </div>
  </div>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { merge } from 'lodash'
// import GmapRichMarker from '@/utils/richmarker'
import GmapRichMarker from '@/components/RichMarker'
import { stickyClassMixin } from '@/utils/mixins'
const Salon = () => import(/* webpackChunkName: "search-bundle" */ './Salon')
const SalonMarker = () => import(/* webpackChunkName: "search-bundle" */ './Marker')
import Stars from '../partials/StarRating'

export default {
  name: 'SearchSalons',
  components: {
    Salon,
    SalonMarker,
    Stars,
    InfiniteLoading,
    GmapRichMarker
  },
  mixins: [stickyClassMixin],
  computed: {
    markers () {
      const markers = []
      this.salons.map(salon => {
        if (salon.latitude && salon.longitude && salon.min_price) {
          const marker = {
            id: salon.id,
            salon,
            position: { lat: salon.latitude, lng: salon.longitude }
          }
          // salon.marker = marker
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

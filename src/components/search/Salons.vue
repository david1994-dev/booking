<template>
<div class="searchsalon-page">
  <div class="box-salons">
    <div class="salons-result" v-show="!$isLoading('fetching salons')">
      Có {{ meta.pagination.total }} địa điểm phù hợp với từ khóa dịch vụ <strong>{{ getSearchQuery('keyword') }}</strong><span v-if="getSearchQuery('location')"> tại <strong>{{ getSearchQuery('location') }}</strong></span>.
    </div>

    <div v-if="salons.length">
      <salon v-for="salon in salons"
        @salonAddressClick="centerSalon(salon)"
        :key="salon.id"
        :salon="salon"
        :category="selectedService.id || 0" />
    </div>

    <infinite-loading
      :on-infinite="onInfinite"
      spinner="waveDots"
      ref="infiniteLoading">
      <span slot="no-more">
        Không tìm thấy thêm kết quả
      </span>
      <span slot="no-results">
        Không tìm thấy thêm kết quả
      </span>
    </infinite-loading>
  </div>

  <div class="wrap-maps">
    <div class="maps">
      <gmap-map ref="map"
        :center="center"
        :zoom="14"
        :options="mapOptions"
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
          @click="centerSalon(marker.salon)"
        >
          <salon-marker :salon="marker.salon" />
        </gmap-rich-marker>
      </gmap-map>
    </div>
  </div>
</div>
</template>

<script>
import { get, merge } from 'lodash'
import { mapGetters } from 'vuex'
import store from 'store2'
import { googlemap } from '@/config'
import InfiniteLoading from 'vue-infinite-loading'
import GmapRichMarker from '@/components/RichMarker'
import { DeferredReadyMixin } from 'vue2-google-maps/src/utils/deferredReady'
import { stickyClassMixin } from '@/utils/mixins'
const Salon = () => import(/* webpackChunkName: "salon-bundle" */ '../partials/SalonCard')
const SalonMarker = () => import(/* webpackChunkName: "search-bundle" */ './Marker')

export default {
  name: 'SearchSalons',
  components: {
    Salon,
    SalonMarker,
    InfiniteLoading,
    GmapRichMarker
  },
  mixins: [DeferredReadyMixin, stickyClassMixin],
  computed: {
    ...mapGetters(['keyword', 'location', 'position', 'selectedService']),
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
      mapOptions: googlemap,
      center: { lat: 21.00329000, lng: 105.81904500 },
      salons: [],
      meta: {
        pagination: {
          current_page: 0,
          total: 0,
          total_pages: 0
        }
      }
    }
  },
  deferredReady () {
    /* eslint-disable no-undef */
    this.$bounds = new google.maps.LatLngBounds()
  },
  mounted () {
    this.addStickyClass('.wrap-maps', 600)
  },
  watch: {
    'salons': 'autoCenter',
    $route () {
      this.fetchData({ page: 1 }, ({ data }) => {
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
      this.$startLoading('fetching salons')
      let params = this.$route.query
      params._meta = 1
      params = merge(query, params)

      if (this.position.latitude && this.position.longitude) {
        params = merge(this.position, params)
      }

      this.$http.get('search', { params })
        .then(response => {
          this.$endLoading('fetching salons')
          store.set('searchQuery', {
            keyword: this.keyword,
            location: this.location
          })
          cb(response)
        })
        .catch(error => {
          this.$endLoading('fetching salons')
          errCb ? errCb(error) : null
        })
    },
    onInfinite () {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.salons = this.salons.concat(data.data)
        this.meta = data.meta
        this.$refs.infiniteLoading.$emit(data.data.length ? '$InfiniteLoading:loaded' : '$InfiniteLoading:complete')
      })
    },
    getSearchQuery (key, fallback = null) {
      return get(store('searchQuery'), key, fallback)
    },
    centerSalon (salon) {
      if (salon.latitude && salon.longitude) {
        // this.center = { lat: salon.latitude, lng: salon.longitude }
        this.$refs.map.$mapObject.panTo({ lat: salon.latitude, lng: salon.longitude })
      }
    },
    autoCenter () {
      this.markers.map(marker => {
        this.$bounds.extend(marker.position)
        this.center = this.$bounds.getCenter()
        this.$refs.map.$mapObject.fitBounds(this.$bounds)
        // this.updateZoom()
      })
    },
    updateZoom () {
      let zoom = this.$refs.map.$mapObject.getZoom()
      if (zoom > 15) {
        zoom = 15
      }
      // console.log(this.$refs.map.$mapObject)
      this.$refs.map.$mapObject.setZoom(zoom - 1)
    }
  }
}
</script>

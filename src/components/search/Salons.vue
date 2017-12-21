<template>
<div>
  <div class="search-filter searchsalon-filter">
    <search-filter></search-filter>
  </div>
  <div class="searchsalon-page">
    <div class="box-salons">
      <div class="salons-result" v-show="!$isLoading('fetching salons')">
        {{ $t('search.search_results',{'total_results': meta.pagination.total}) }} <strong>{{ getSearchQuery('keyword') }}</strong><span v-if="getSearchQuery('location')"> {{ $t('common.at') }} <strong>{{ getSearchQuery('location') }}</strong></span>.
      </div>

      <div v-if="salons.length">
        <salon v-for="salon in salons"
          :key="salon.id"
          :salon="salon"
          :category="selectedService.id || 0" />
      </div>

      <infinite-loading
        @infinite="onInfinite"
        spinner="waveDots"
        ref="infiniteLoading">
        <span slot="no-more">
          {{ $t('search.no_more_results') }}
        </span>
        <span slot="no-results">
          {{ $t('search.no_more_results') }}
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
</div>
</template>

<script>
import { get, merge } from 'lodash'
import { mapGetters } from 'vuex'
import store from 'store2'
import { googlemap, mixpanelProjectToken, listHotels } from '@/config'
import InfiniteLoading from 'vue-infinite-loading'
import GmapRichMarker from '../RichMarker'
import { stickyClassMixin } from '@/utils/mixins'
import mixpanel from 'mixpanel-browser'

const Salon = () => import(/* webpackChunkName: "salon-bundle" */ '../partials/SalonCard')
const SalonMarker = () => import(/* webpackChunkName: "search-bundle" */ './Marker')
const SearchFilter = () => import(/* webpackChunkName: "search-bundle" */ './Filters')

export default {
  name: 'SearchSalons',
  components: {
    SearchFilter,
    Salon,
    SalonMarker,
    InfiniteLoading,
    GmapRichMarker
  },
  mixins: [stickyClassMixin],
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
  mounted () {
    this.addStickyClass('.wrap-maps', 600)
  },
  watch: {
    'markers': 'autoCenter',
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

      if (params.hotel && params.source) {
        mixpanel.init(mixpanelProjectToken)
        mixpanel.track(
          'Scan QR Code Search Page',
          {
            'HotelId': params.hotel,
            'HotelName': listHotels[params.hotel],
            'source': params.source
          }
        )
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
    onInfinite ($state) {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.salons = this.salons.concat(data.data)
        this.meta = data.meta
        if (data.data.length) {
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    },
    getSearchQuery (key, fallback = null) {
      return get(store('searchQuery'), key, fallback)
    },
    centerSalon (salon, zoom = null) {
      if (salon.latitude && salon.longitude) {
        // this.center = { lat: salon.latitude, lng: salon.longitude }
        this.$refs.map.$mapObject.panTo({ lat: salon.latitude, lng: salon.longitude })
        if (zoom) {
          this.$refs.map.$mapObject.setZoom(zoom)
        }
      }
    },
    autoCenter () {
      /* eslint-disable no-undef */
      const $bounds = new google.maps.LatLngBounds()
      this.markers.map(marker => {
        $bounds.extend(marker.position)
        this.center = $bounds.getCenter()
        this.$refs.map.$mapObject.fitBounds($bounds)
        this.updateZoom()
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

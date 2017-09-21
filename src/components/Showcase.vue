<template>
<div>
  <stylist-picker />
  <page-header />
  <div class="searchsalon-page">
    <div class="box-salons">
      <div class="salons-result">
        <h5>{{ showcase.name }}</h5>
        <p>{{ showcase.description }}</p>
      </div>

      <div v-if="showcase.salons.length">
        <salon v-for="salon in showcase.salons"
          @salonAddressClick="centerSalon"
          :key="salon.id"
          :salon="salon"
          :category="randomCategory(salon.services)" />
      </div>
    </div>

    <div class="wrap-maps">
      <div class="maps">
        <gmap-map ref="map"
          :center="center"
          :zoom="14"
          :options="mapOptions"
          style="width: 100%; height: 100%">
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
</div>
</template>

<script>
import { head } from 'lodash'
import { googlemap } from '@/config'
import PageHeader from './layout/Header'
import GmapRichMarker from '@/components/RichMarker'
import { stickyClassMixin } from '@/utils/mixins'
const Salon = () => import(/* webpackChunkName: "salon-bundle" */ './partials/SalonCard')
const SalonMarker = () => import(/* webpackChunkName: "search-bundle" */ './search/Marker')
const StylistPicker = () => import(/* webpackChunkName: "salon-bundle" */ './salon/StylistPicker')

export default {
  name: 'Showcase',
  components: {
    PageHeader,
    Salon,
    SalonMarker,
    GmapRichMarker,
    StylistPicker
  },
  mixins: [stickyClassMixin],
  computed: {
    markers () {
      const markers = []
      this.showcase.salons.map(salon => {
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
      showcase: {
        salons: []
      },
      mapOptions: googlemap,
      center: { lat: 21.00329000, lng: 105.81904500 }
    }
  },
  metaInfo () {
    return {
      title: `${this.showcase.name} | Chủ đề`
    }
  },
  created () {
    this.fetchData()
  },
  mounted () {
    this.addStickyClass('.wrap-maps', 600)
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcase')
      this.$http.get(`showcases/${this.$route.params.id}`, { params: { salon_services: 1 } }).then(({ data }) => {
        this.showcase = data
        this.$endLoading('fetching showcase')
      }).catch(() => this.$endLoading('fetching showcase'))
    },
    centerSalon (salon) {
      if (salon.latitude && salon.longitude) {
        // this.center = { lat: salon.latitude, lng: salon.longitude }
        this.$refs.map.$mapObject.panTo({ lat: salon.latitude, lng: salon.longitude })
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
      this.$refs.map.$mapObject.setZoom(zoom - 1)
    },
    randomCategory (services) {
      if (!services.length) {
        return 0
      }

      return head(services).category_id
    }
  }
}
</script>

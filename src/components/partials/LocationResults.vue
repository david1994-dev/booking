<template>
<div class="tp-search-result-2">
  <ul>
    <li>
      <a class="pointer" @click="getCurrentPosition">{{ $t('home.search_bar.current_location') }}</a>
    </li>
    <li v-for="city in locations">
      <a class="pointer" @click="setSelectedCity(city)">{{ city.name }}</a>
      <ul>
        <li v-for="area in city.areas">
          <a class="pointer" @click="setSelectedArea(area)">{{ area.name }}</a>
        </li>
      </ul>
    </li>
  </ul>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'LocationResults',
  computed: mapState({
    locations: state => state.preloadData.locations || []
  }),
  methods: {
    ...mapActions(['setSelectedCity', 'setSelectedArea']),
    getCurrentPosition () {
      if (navigator.geolocation) {
        this.$startLoading('geolocation')
        navigator.geolocation.getCurrentPosition(position => {
          this.geolocation(position.coords.latitude, position.coords.longitude)
        }, () => {
          this.$endLoading('geolocation')
          alert(`The Geolocation service failed`)
        })
      } else {
        this.$endLoading('geolocation')
        alert(`Your browser doesn't support geolocation`)
      }
    },
    geolocation (lat, lng) {
      this.$startLoading('geolocation')
      axios.get('https://maps.googleapis.com/maps/api/geocode/json', { params: { latlng: `${lat},${lng}`, sensor: false } }).then(({ data }) => {
        if (data.status === 'OK') {
          if (data.results[1]) {
            this.$endLoading('geolocation')
            this.$store.dispatch('setLocation', data.results[1].formatted_address)
            this.$store.dispatch('setPosition', { lat, lng })
          }
        }
      }).catch(() => {
        this.$endLoading('geolocation')
      })
    }
  }
}
</script>

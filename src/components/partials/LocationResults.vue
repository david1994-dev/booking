<template>
<ul>
  <li>
    <a class="pointer" @click="getCurrentPosition">Vị trí hiện tại</a>
  </li>
  <li v-for="city in locations">
    <a class="pointer">{{ city.name }}</a>
    <ul>
      <li v-for="area in city.areas">
        <a class="pointer" @click="setSelectedArea(area)">{{ area.name }}</a>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LocationResults',
  computed: mapState({
    locations: state => state.preloadData.locations || []
  }),
  methods: {
    ...mapActions(['setSelectedArea']),
    getCurrentPosition () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          this.getcode({ location: pos })
        }, () => {
          alert(`The Geolocation service failed`)
        })
      } else {
        alert(`Your browser doesn't support geolocation`)
      }
    },
    getcode (options) {
      // this.$geocoder.geocode(options, (results, status) => {
      //   console.log(results)
      //   console.log(status)
      // })
    }
  }
}
</script>

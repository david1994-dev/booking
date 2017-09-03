<template>
<ul>
  <li>
    <a href="#">Vị trí hiện tại</a>
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
  methods: mapActions(['setSelectedArea'])
}
</script>

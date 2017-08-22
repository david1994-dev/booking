<template>
<ul>
  <!-- <li>
    <a href="#">Vị trí hiện tại</a>
  </li> -->
  <li v-for="city in locations">
    <a href="#">{{ city.name }}</a>
    <ul>
      <li v-for="area in city.areas">
        <a href="#">{{ area.name }}</a>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LocationResults',
  computed: mapState({
    locations: state => state.preloadData.locations || []
  })
}
</script>

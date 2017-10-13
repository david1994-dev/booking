<template>
<div class="list">
  <label class="item" v-for="amenity in amenities" :key="amenity.id">
    <div class="tp-checkbox"><input type="checkbox" :value="amenity.id" v-model="values"><span></span></div>
    <div class="name">{{ amenity.name }}</div>
  </label>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AmenityFilters',
  computed: mapState({
    amenities: state => state.preloadData.amenities || []
  }),
  data () {
    return {
      values: []
    }
  }
}
</script>

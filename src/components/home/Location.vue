<template>
<div class="beautify-place tp-box" v-if="locations.length">
  <div class="tp-wrap-title">
    <h3 class="tp-title"><strong>Khám phá địa điểm</strong> làm đẹp</h3>
    <div class="tp-view-more orange"><a href="#">xem thêm</a></div>
  </div>
  <div class="ofhd">
    <div class="list">
      <div class="item" v-for="location in locations" :key="location.id">
        <div class="image-service">
          <figure><router-link :to="{ name: 'showcase', params: { id: location.slug } }"><img :src="location.image_url" /></router-link></figure>
          <ul>
            <li v-for="category in categories">
              <router-link :to="{ name:'showcase', params: { id: location.slug }, query: { q: category.children[0].name, category_id: category.children[0].id  } }">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
        <h3><router-link :to="{ name: 'showcase', params: { id: location.slug } }">{{ location.name }}</router-link></h3>
      </div>
    </div>
  </div>

  <div class="tp-view-more bottom orange"><a href="#">xem thêm</a></div>
</div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Location',
  data () {
    return {
      locations: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcases')
      this.$http.get('showcases', { params: { limit: 4, type: 3 } }).then(({ data }) => {
        this.locations = data.data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    }
  },
  computed: mapState({
    categories: state => state.preloadData.categories || []
  })
}
</script>
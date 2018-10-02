<template>
<div class="beautify-place tp-box" v-if="locations.length">
  <div class="tp-wrap-title">
    <h3 class="tp-title"><strong>{{ $t('home.block.explore') }}</strong> {{ $t('home.block.locations') }}</h3>
    <div class="tp-view-more bottom orange">
      <router-link :to="{ name: 'explore', query: { type: 3 } }">
        {{ $t('common.see_more') }}
      </router-link>
    </div>
  </div>
  <div class="ofhd">
    <div class="list">
      <div class="item" v-for="location in locations" :key="location.id">
        <div class="image-service">
          <figure>
            <router-link :to="{ name: 'showcase', params: { id: location.slug } }">
              <img :src="location.image_url" />
            </router-link>
          </figure>
          <ul>
            <li v-for="category in categories">
              <router-link :to="{ name:'search', query: { q: category.children[0].name, category_id: category.children[0].id, l: location.name } }">
                {{ category.name }}
              </router-link>
            </li>
          </ul>
        </div>
        <h3><router-link :to="{ name: 'showcase', params: { id: location.slug } }">{{ location.name }}</router-link></h3>
      </div>
    </div>
  </div>

  <div class="tp-view-more bottom orange"><router-link :to="{ name: 'explore', query: { type: 3 } }">{{ $t('common.see_more') }}</router-link></div>
</div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import store from 'store2'

const LocationResults = () => import(/* webpackChunkName: "search-bundle" */ '../partials/LocationResults')
const SuggestionResults = () => import(/* webpackChunkName: "search-bundle" */ '../partials/SuggestionResults')

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
  components: {
    LocationResults,
    SuggestionResults
  },
  computed: {
    ...mapGetters(['selectedService', 'selectedCity', 'selectedArea']),
    ...mapState({categories: state => state.preloadData.categories || []})
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcases')
      this.$http.get('showcases', { params: { limit: 4, type: 3 } }).then(({ data }) => {
        this.locations = data.data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    },
    search (keyword, category, location) {
      this.$startLoading('geolocation')
      this.$endLoading('geolocation')

      const query = {q: keyword}
      query.l = location
      query.category_id = category

      this.$store.state.locations = location
      this.$store.dispatch('setKeyword', keyword)
      this.$store.dispatch('setLocation', location)
      this.$store.dispatch('setPosition', {
        lat: '',
        lng: ''
      })

      store.set('searchQuery', {
        keyword: keyword,
        location: location
      })

      this.$bus.$emit('searchSubmitted')

      this.$router.push({name: 'search', query})
    }
  }
}
</script>

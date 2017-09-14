<template>
<ul ref="suggestionResults">
  <li v-show="!services.length && !keyword">
    <!-- <router-link :to="{ name: 'services' }">Dịch vụ</router-link> -->
    <a href="#">Dịch vụ</a>
    <ul>
      <li v-for="category in categories">
        <a class="pointer">{{ category.name }}</a>
        <ul v-if="category.children.length">
          <li v-for="service in category.children"><a class="pointer" @click="setSelectedService(service)">{{ service.name }}</a></li>
        </ul>
      </li>
    </ul>
  </li>
  <li v-show="services.length">
    <a href="#">Dịch vụ</a>
    <ul>
      <li v-for="service in services">
        <a class="pointer" @click="setSelectedService(service)">{{ service.name }}</a>
      </li>
    </ul>
  </li>

  <li v-show="stylists.length">
    <a href="#">Stylist</a>
    <ul>
      <li v-for="stylist in stylists">
        <router-link :to="{ name: 'stylist', params: { id: stylist.id } }">{{ stylist.name }}</router-link>
      </li>
    </ul>
  </li>

  <li v-show="salons.length">
    <a href="#">Salon</a>
    <ul>
      <li v-for="salon in salons">
        <router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link>
      </li>
    </ul>
  </li>
</ul>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'SuggestionResults',
  computed: mapState({
    categories: state => state.preloadData.categories || [],
    keyword: state => state.search.keyword
  }),
  data () {
    return {
      salons: [],
      stylists: [],
      services: []
    }
  },
  mounted () {
    this.fetchData()
  },
  watch: {
    'keyword': 'fetchData'
  },
  methods: {
    ...mapActions(['setSelectedService']),
    fetchData () {
      if (!this.keyword) {
        this.resetState()
        return
      }

      this.$http.get('suggest', { params: { search: this.keyword } }).then(({ data }) => {
        this.salons = data.salons
        this.stylists = data.stylists
        this.services = data.categories
      }).catch(() => this.resetState())
    },
    resetState () {
      this.salons = []
      this.stylists = []
      this.services = []
    }
  }
}
</script>

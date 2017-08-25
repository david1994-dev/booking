<template>
<div>
  <page-header />
  <salons v-if="searchByService" />
  <results v-else />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageHeader from './layout/Header'
const Results = () => import(/* webpackChunkName: "search-bundle" */ './search/Results')
const Salons = () => import(/* webpackChunkName: "search-bundle" */ './search/Salons')

export default {
  name: 'Search',
  components: {
    PageHeader,
    Results,
    Salons
  },
  computed: {
    ...mapGetters(['keyword', 'selectedArea']),
    searchByService () {
      return this.$route.query.category_id
    }
  },
  data () {
    return {
      salons: []
    }
  },
  metaInfo () {
    return {
      title: this.selectedArea.name ? `${this.keyword} - ${this.selectedArea.name}` : this.keyword
    }
  },
  mounted () {
    this.parseQueryString()
  },
  methods: {
    parseQueryString () {
      if (this.$route.query.q) {
        this.$store.dispatch('setKeyword', this.$route.query.q)
      }
      if (this.$route.query.category_id) {
        this.$store.dispatch('findAndSetService', this.$route.query.category_id)
      }
      if (this.$route.query.area_id) {
        this.$store.dispatch('findAndSetArea', this.$route.query.area_id)
      }
    }
  }
}
</script>

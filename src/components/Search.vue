<template>
<div>
  <page-header />
  <salons v-if="searchByService" />
  <results v-else />
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parseSearchQuery } from '@/utils/mixins'
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
  mixins: [parseSearchQuery],
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
    this.setSearchData()
  },
  watch: {
    '$route': 'setSearchData'
  }
}
</script>

<template>
<div>
  <page-header />
  <salons v-if="searchByService" />
  <results v-else />
</div>
</template>

<script>
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
    searchByService () {
      return this.$route.query.category_id
    }
  },
  data () {
    return {
      salons: []
    }
  }
}
</script>

<template>
<div>
  <stylist-picker />
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
const StylistPicker = () => import(/* webpackChunkName: "salon-bundle" */ './salon/StylistPicker')

export default {
  name: 'Search',
  components: {
    PageHeader,
    Results,
    Salons,
    StylistPicker
  },
  mixins: [parseSearchQuery],
  computed: {
    ...mapGetters(['keyword', 'selectedArea']),
    searchByService () {
      return this.$route.query.category_id
    }
  },
  metaInfo: {
    title: 'Tìm kiếm'
  },
  data () {
    return {
      salons: []
    }
  },
  // metaInfo () {
  //   return {
  //     title: this.selectedArea.name ? `${this.keyword} - ${this.selectedArea.name}` : this.keyword
  //   }
  // },
  mounted () {
    this.setSearchData()
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('clearSearchQuery').then(() => next())
  },
  watch: {
    '$route': 'setSearchData'
  }
}
</script>

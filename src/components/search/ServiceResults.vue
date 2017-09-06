<template>
<div class="services" v-if="services.length">
  <v-loading class="sub-container" loader="fetching services">
    <template slot="spinner">
      <div class="text-center">
        <v-loading-spinner height="30px" width="30px" />
      </div>
    </template>

    <div class="list">
      <div class="item" v-for="service in services" :key="service.id">
        <h3><router-link :to="{ name: 'search', query: { category_id: service.id } }">{{ service.name }}</router-link></h3>
        <span>830 Salon có dịch vụ</span>
      </div>
    </div>
    <div class="tp-view-all" v-if="hasMore">
      <router-link :to="{ name: 'services', query: { q: $route.query.q } }">
        <span>View all</span>
        <i class="bz-next"></i>
      </router-link>
    </div>
  </v-loading>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ServiceResults',
  computed: {
    ...mapGetters(['keyword']),
    hasMore () {
      return this.meta.pagination.total_pages > 1
    }
  },
  data () {
    return {
      services: [],
      meta: {
        pagination: {
          total_pages: 0
        }
      }
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching services')
      this.$http.get('search/services', { params: { q: this.keyword, _meta: 1 } }).then(({ data }) => {
        this.services = data.data
        this.meta = data.meta
        this.$endLoading('fetching services')
      })
    }
  }
}
</script>

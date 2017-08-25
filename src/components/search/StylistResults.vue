<template>
<div class="stylist">
  <v-loading class="sub-container" loader="fetching stylists">
    <template slot="spinner">
      <div class="text-center">
        <v-loading-spinner height="30px" width="30px" />
      </div>
    </template>

    <div class="list">
      <div class="item" v-for="stylist in stylists">
        <figure><a href="#"><img :src="stylist.avatar_url" /></a></figure>
        <div class="info">
          <h3><a href="#">{{ stylist.name }}</a></h3>
          <span>{{ salonNames(stylist) }}</span>
        </div>
      </div>
    </div>
    <div class="tp-view-all" v-if="hasMore">
      <a href="#">
        <span>View all</span>
        <i class="bz-next"></i>
      </a>
    </div>
  </v-loading>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { map } from 'lodash'

export default {
  name: 'StylistResults',
  computed: {
    ...mapGetters(['keyword']),
    hasMore () {
      return this.meta.pagination.total_pages > 1
    }
  },
  data () {
    return {
      stylists: [],
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
      this.$startLoading('fetching stylists')
      this.$http.get('search/stylists', { params: { q: this.keyword, _meta: 1 } }).then(({ data }) => {
        this.stylists = data.data
        this.meta = data.meta
        this.$endLoading('fetching stylists')
      })
    },
    salonNames (stylist) {
      if (!stylist.salons || !stylist.salons.length) {
        return
      }

      return map(stylist.salons, 'name').join(', ')
    }
  }
}
</script>

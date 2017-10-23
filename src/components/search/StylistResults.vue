<template>
<div class="stylist" v-if="stylists.length">
  <v-loading class="sub-container" loader="fetching stylists">
    <template slot="spinner">
      <div class="text-center">
        <v-loading-spinner height="30px" width="30px" />
      </div>
    </template>

    <div class="list">
      <div class="item" v-for="stylist in stylists" :key="stylist.id">
        <figure><router-link :to="{ name: 'stylist', params: { id: stylist.id } }"><img :src="stylist.avatar_url" /></router-link></figure>
        <div class="info">
          <h3><router-link :to="{ name: 'stylist', params: { id: stylist.id } }">{{ stylist.name }}</router-link></h3>
          <span>{{ salonNames(stylist) }}</span>
        </div>
      </div>
    </div>
    <div class="tp-view-all" v-if="hasMore">
      <router-link :to="{ name: 'stylists', query: { q: $route.query.q } }">
        <span>{{ $t('common.view_all') }}</span>
        <i class="bz-next"></i>
      </router-link>
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
  mounted () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching stylists')
      this.$http.get('search/stylists', { params: { q: this.$route.query.q, _meta: 1 } }).then(({ data }) => {
        this.stylists = data.data
        this.meta = data.meta
        this.$endLoading('fetching stylists')
      }).catch(() => this.$endLoading('fetching stylists'))
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

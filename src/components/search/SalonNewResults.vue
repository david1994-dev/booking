<template>
  <div class="styles-page">
    <div class="tp-bigcontainer">
      <h1 class="styles-result">Có {{ meta.pagination.total }} địa điểm phù hợp với từ khóa <strong>{{ keyword }}</strong> tại <strong>{{ location }}</strong> </h1>
      <div class="content-page">
        <div class="styles">
          <salon-new v-for="salon in salons"
                 :key="salon.id"
                 :salon="salon" />
        </div>
        <infinite-loading
            @infinite="onInfinite"
            spinner="waveDots"
            ref="infiniteLoading">
          <span slot="no-more">
            {{ $t('search.no_more_results') }}
          </span>
            <span slot="no-results">
            {{ $t('search.no_more_results') }}
          </span>
        </infinite-loading>
      </div>
    </div>

    <related-tags></related-tags>
  </div>
</template>

<script>
// import { merge } from 'lodash'
import _ from 'lodash'
import InfiniteLoading from 'vue-infinite-loading'
const Salon = () => import(/* webpackChunkName: "search-bundle" */ './SalonCard')
const SalonNew = () => import(/* webpackChunkName: "search-bundle" */ './SalonCardNew')
const RelatedTags = () => import(/* webpackChunkName: "search-bundle" */ '../partials/RelatedTags')
export default {
  name: 'SalonResults',
  components: {
    InfiniteLoading,
    Salon,
    SalonNew,
    RelatedTags
  },
  data () {
    return {
      salons: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  computed: {
    keyword: {
      get () {
        return this.$store.state.search.keyword
      },
      set (value) {
        this.$store.dispatch('setKeyword', value)
      }
    },
    location: {
      get () {
        return this.$store.state.search.location
      },
      set (value) {
        this.$store.dispatch('setLocation', value)
      }
    },
    tabActive: {
      get () {
        return this.$store.state.search.tabActive
      },
      set (value) {
        this.$store.dispatch('tabActive', value)
      }
    }
  },
  mounted () {
    this.fetchData({}, ({ data }) => {
      this.salons = data.data
      this.meta = data.meta
    })
  },
  watch: {
    $route () {
      this.fetchData({}, ({ data }) => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        this.salons = data.data
        this.meta = data.meta
      })
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params.keyword = this.keyword
      params = _.merge(query, params)
      this.$http.get('tags', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite ($state) {
      this.meta.pagination.current_page = parseInt(this.meta.pagination.current_page) + 1
      this.fetchData({ page: this.meta.pagination.current_page }, ({ data }) => {
//        this.salons = this.salons.concat(data.data)
        this.salons = _.uniqBy(this.salons.concat(data.data), 'id')
        this.meta = data.meta
        if (data.data.length) {
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

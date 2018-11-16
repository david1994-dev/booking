<template>
  <div class="styles-page">
    <div class="tp-bigcontainer">
      <h1 class="styles-result">Có 108 địa điểm phù hợp với từ khóa dịch vụ <strong>Kiểu side-part</strong> tại <strong>Hà Nội</strong> </h1>
      <div class="content-page">
        <div class="styles">
          <salon-new v-for="salon in salons"
                 :key="salon.id"
                 :salon="salon" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { merge } from 'lodash'
import InfiniteLoading from 'vue-infinite-loading'
const Salon = () => import(/* webpackChunkName: "search-bundle" */ './SalonCard')
const SalonNew = () => import(/* webpackChunkName: "search-bundle" */ './SalonCardNew')

export default {
  name: 'SalonResults',
  components: {
    InfiniteLoading,
    Salon,
    SalonNew
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
      params = merge(query, params)
      this.$http.get('search/salons', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite ($state) {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.salons = this.salons.concat(data.data)
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

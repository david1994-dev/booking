<template>
<div>
  <page-header />
  <div class="service-page">
    <div class="tp-bigcontainer">
      <h1 class="tp-pagetitle">Dịch vụ</h1>
      <div class="content-page">
        <div class="services">
          <div class="service-item" v-for="service in services" :key="service.id">
            <div class="info">
              <router-link class="link" :to="{ name: 'search', query: { category_id: service.id } }"></router-link>
              <h2>{{ service.name }}</h2>
              <div class="result">{{ service.salons_count }} kết quả</div>
            </div>
            <figure>
              <img :src="service.image_url" />
            </figure>
          </div>
        </div>

        <infinite-loading
          @infinite="onInfinite"
          spinner="waveDots"
          ref="infiniteLoading">
          <span slot="no-more">
            Không tìm thấy thêm kết quả
          </span>
          <span slot="no-results">
            Không tìm thấy thêm kết quả
          </span>
        </infinite-loading>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { merge } from 'lodash'
import { parseSearchQuery } from '@/utils/mixins'
import InfiniteLoading from 'vue-infinite-loading'
import PageHeader from './layout/Header'

export default {
  name: 'Services',
  components: {
    PageHeader,
    InfiniteLoading
  },
  mixins: [parseSearchQuery],
  metaInfo: {
    title: 'Dịch vụ'
  },
  mounted () {
    this.setSearchData()
  },
  watch: {
    '$route': 'setSearchData'
  },
  data () {
    return {
      services: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('clearSearchQuery').then(() => next())
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params.limit = 6
      params = merge(query, params)
      this.$http.get('search/services', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite ($state) {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.services = this.services.concat(data.data)
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

<template>
<div>
  <page-header />
  <div class="discovery-page">
    <div class="tp-bigcontainer">
      <div class="tp-wrap-title">
        <h3 class="tp-title"><strong>Khám phá</strong> các salon</h3>
      </div>

      <div class="content-page">
        <div class="tp-discovery" v-if="showcases.length">
          <div class="item" v-for="showcase in showcases" :key="showcase.id">
            <figure><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }"><img :src="showcase.image_url" /></router-link></figure>
            <div class="info">
              <h4><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }">{{ showcase.name }}</router-link></h4>
              <span>1.435 đã đặt</span>
            </div>
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
import PageHeader from './layout/Header'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'Explore',
  components: {
    PageHeader,
    InfiniteLoading
  },
  metaInfo: {
    title: 'Khám phá'
  },
  data () {
    return {
      showcases: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params.limit = 8
      params = merge(query, params)
      this.$http.get('showcases', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite ($state) {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.showcases = this.showcases.concat(data.data)
        this.meta = data.meta
        // this.$refs.infiniteLoading.$emit(data.data.length ? '$InfiniteLoading:loaded' : '$InfiniteLoading:complete')
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

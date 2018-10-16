<template>
<div>
  <page-header />
  <div class="discovery-page">
    <div class="tp-bigcontainer">
      <div class="tp-wrap-title">
        <h3 class="tp-title"><strong>{{ $t('home.explore.exploring') }}</strong> {{ $t('home.explore.the_salon') }}</h3>
      </div>

      <div class="content-page">
        <div class="tp-discovery" v-if="showcases.length">
          <div :class="classImage(showcase.image_type)" v-for="showcase in showcases" :key="showcase.id">
            <figure><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }"><img :src="showcase.image_url" /></router-link></figure>
            <div class="info">
              <h4><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }">{{ showcase.name }}</router-link></h4>
              <span>{{ $t('home.explore.booked', {'booking_times': showcase.total_booking}) }}</span>
            </div>
          </div>
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
      let params = this.$route.params
      params._meta = 1
      params.limit = 8
      params.booking_count = 1
      params = merge(query, params)

      switch (params.type) {
        case 'services':
          params.type = 1
          break
        case 'location':
          params.type = 3
          break
        case 'promotion':
          params.type = 4
          break
      }
      this.$http.get('showcases', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    classImage (imageType) {
      if (imageType === 2) {
        return 'item half-percent'
      }
      return 'item'
    },
    onInfinite ($state) {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.showcases = this.showcases.concat(data.data)
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

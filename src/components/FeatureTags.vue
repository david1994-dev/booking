<template>
<div>
  <page-header />
  <div class="styles-sub-page">
    <div class="inner-page">
      <h1 class="title-page">{{ $t('featureTag.list') }}</h1>
      <div class="list-style">
        <div class="list-style-inner">
          <div class="list">
            <feature-tag v-for="featureTag in featureTags" :key="featureTag.tag" :featureTag="featureTag" />
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
</div>
</template>

<script>
import { merge } from 'lodash'
import PageHeader from './layout/Header'
import InfiniteLoading from 'vue-infinite-loading'
const FeatureTag = () => import(/* webpackChunkName: "search-bundle" */ './partials/FeatureTag')

export default {
  name: 'FeatureTags',
  components: {
    PageHeader,
    InfiniteLoading,
    FeatureTag
  },
  metaInfo: {
    title: 'Feature Tags'
  },
  data () {
    return {
      featureTags: [],
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
      params = merge(query, params)
      this.$http.get('tags/featured', { params })
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
        this.featureTags = this.featureTags.concat(data.data)
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

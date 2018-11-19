<template>
    <div class="related">
        <div class="related-inner">
            <div class="title-related">
                <div class="title">Danh sách kiểu tóc/ nail có thế bạn quan tâm</div>
            </div>
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
            <!--<div class="tp-paging">-->
                <!--<a href="#" class="arrow prev"><i class="bz-prev-2"></i></a>-->
                <!--<a href="#" class="number active">1</a>-->
                <!--<a href="#" class="number">2</a>-->
                <!--<a href="#" class="number">3</a>-->
                <!--<a href="#" class="arrow next active"><i class="bz-next-2"></i></a>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
  import { merge } from 'lodash'
  import InfiniteLoading from 'vue-infinite-loading'
  const FeatureTag = () => import(/* webpackChunkName: "search-bundle" */ './FeatureTag')

  export default {
    name: 'RelatedTags',
    components: {
      FeatureTag,
      InfiniteLoading
    },
    metaInfo: {
      title: 'Related Tags'
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
    computed: {
      keyword: {
        get () {
          return this.$store.state.search.keyword
        },
        set (value) {
          this.$store.dispatch('setKeyword', value)
        }
      }
    },
    methods: {
      fetchData (query, cb, errCb) {
        let params = this.$route.params
        params._meta = 1
        params.keyword = this.keyword
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

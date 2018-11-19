<template>
    <div class="related">
        <div class="related-inner">
            <div class="title-related">
                <div class="title">Danh sách kiểu tóc/ nail có thế bạn quan tâm</div>
            </div>
            <div class="list">
                <feature-tag v-for="featureTag in featureTags" :key="featureTag.tag" :featureTag="featureTag" />
            </div>
            <div class="paging tp-paging" v-if="featureTags.length">
                <paginate
                    :click-handler="paginateTags"
                    :page-count="meta.pagination.total_pages"
                    :prev-text="'<'"
                    :next-text="'>'"
                    :page-class="'number'"
                    :prev-class="'arrow prev'"
                    :next-class="'arrow next'">
                </paginate>
            </div>
        </div>
    </div>
</template>

<script>
  import { merge } from 'lodash'
  import Paginate from 'vuejs-paginate'
  const FeatureTag = () => import(/* webpackChunkName: "search-bundle" */ './FeatureTag')

  export default {
    name: 'RelatedTags',
    components: {
      FeatureTag,
      Paginate
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
        },
        paginate: ['featureTags']
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
    mounted () {
      this.fetchData({}, ({ data }) => {
        this.featureTags = data.data
        this.meta = data.meta
      })
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
      paginateTags (page) {
        this.fetchData({ page }, ({ data }) => {
          this.featureTags = data.data
          this.meta = data.meta
//          document.getElementById('mennu-reviews').click()
        })
      }
    }
  }
</script>

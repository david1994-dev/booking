<template>
    <div class="trend-style tp-box">
        <div class="tp-wrap-title">
            <h3 class="tp-title"><strong>Kiểu tóc, nail</strong> được ưu chuộng</h3>
            <div class="tp-view-more orange"><router-link :to="{ name: 'tags' }">{{ $t('common.see_more') }}</router-link></div>
        </div>
        <div class="ofhd">
            <div class="list">
                <feature-tag v-for="featureTag in featureTags" :key="featureTag.tag" :featureTag="featureTag" />
            </div>
        </div>
        <div class="tp-view-more bottom orange"><router-link :to="{ name: 'tags' }">{{ $t('common.see_more') }}</router-link></div>
    </div>
</template>
<script>
  const FeatureTag = () => import(/* webpackChunkName: "search-bundle" */ '../partials/FeatureTag')
  export default {
    name: 'FeatureTags',
    data () {
      return {
        featureTags: []
      }
    },
    components: {
      FeatureTag
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$startLoading('fetching feature tag')
        this.$http.get('tags/featured', { params: { limit: 8 } }).then(({ data }) => {
          this.featureTags = data.data
          this.$endLoading('fetching feature tag')
        }).catch(() => this.$endLoading('fetching feature tag'))
      },
      classImage (imageType) {
        if (imageType === 2) {
          return 'item half-percent'
        }
        return 'item'
      }
    }
  }
</script>

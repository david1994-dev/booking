<template>
  <div>
    <pageHeader/>

    <div id="main-content">
      <div class="left-content">
        <div class="tp-title">
          <h2 class="main-title"><a href="#"></a>HOT NEWS</h2>
        </div>

        <HotNews :ads="ads" :items="hotNews"/>

        <CategoryList :text="'SỰ KIỆN'" :routeName="'eventsTopic'"
                      :items="Events"/>

        <CategoryList :text="'XU HƯỚNG'" :routeName="'trendTopic'"
                      :items="Trends"/>

        <CategoryList :text="'THÔNG TIN VỀ TÓC'" :routeName="'categories'"
                      :routeParams="{
                        category: 'hair',
                      }"
                      :items="Hair"/>

        <CategoryList :text="'THÔNG TIN VỀ NAIL'" :routeName="'categories'"
                      :routeParams="{
                        category: 'nail',
                      }"
                      :items="Nail"/>

        <CategoryList :text="'THÔNG TIN VỀ BEAUTY'" :routeName="'categories'"
                      :routeParams="{
                        category: 'beauty',
                      }"
                      :items="Beauty"/>

        <VideoList :text="'VIDEO CHỌN LỌC'"
                   :route-name="'videoTopic'"
                   :route-params="{}"
                   :items="Video"/>

        <LocationList :text="'ĐỊA ĐIỂM LÀM ĐẸP'" :items="locations"/>

        <ProductsList :text="'SẢN PHẨM'" :routeName="'productsTopic'" :items="products"/>
      </div>
      <rightContent :ads="ads"/>
    </div>


    <div id="ads-list">
      <div class="inner">
        <a v-if="ads.under_1_1" :href="ads.under_1_1.link"><img :src="ads.under_1_1.image_url"/></a>
        <a v-if="ads.under_1_2" :href="ads.under_1_2.link"><img :src="ads.under_1_2.image_url"/></a>
        <a v-if="ads.under_1_3" :href="ads.under_1_3.link"><img :src="ads.under_1_3.image_url"/></a>
        <a v-if="ads.under_1_4" :href="ads.under_1_4.link"><img :src="ads.under_1_4.image_url"/></a>
      </div>
    </div>

    <FooterNews/>
  </div>
</template>

<script>
  const HotNews = () => import(/* webpackChunkName: "homepage-bundle" */ './news/layout/HotNews')
  const RightContent = () => import(/* webpackChunkName: "homepage-bundle" */ './news/RightContent')
  const FooterNews = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Footer')

  import CategoryList from './news/layout/CategoryList'
  import VideoList from './news/layout/VideoList'
  import LocationList from './news/layout/LocationsList'
  import ProductsList from './news/layout/ProductsList'
  import PageHeader from './news/Header'
  import {mapState} from 'vuex'

  export default {
    name: 'news',
    metaInfo: {
      title: 'Bzone News',
      bodyAttrs: {
        class: null
      }
    },
    components: {
      HotNews,
      RightContent,
      FooterNews,
      CategoryList,
      VideoList,
      LocationList,
      ProductsList,
      PageHeader
    },
    data () {
      return {
        ads: {
          center_1_1: {},
          center_1_2: {},
          right_1_1: {},
          right_1_2: {},
          right_1_3: {},
          right_1_4: {},
          under_1_1: {},
          under_1_2: {},
          under_1_3: {},
          under_1_4: {}
        },
        hotNews: {
          first: {},
          second: {},
          items: []
        },
        Nail: {
          first: {},
          items: []
        },
        Hair: {
          first: {},
          items: []
        },
        Beauty: {
          first: {},
          items: []
        },
        Video: {
          first: {},
          items: []
        },
        Events: {
          first: {},
          items: []
        },
        Trends: {
          first: {},
          items: []
        },
        locations: {
          first: {},
          locations: []
        },
        products: {
          first: {},
          second: {},
          items: []
        }
      }
    },
    created () {
      this.fetchAds()
      this.fetchHotNews()
      this.fetchNailNews()
      this.fetchHairNews()
      this.fetchBeautyNews()
      this.fetchVideo()
      this.fetchDataLocation()
      this.fetchProducts()
      this.fetchEventNews()
      this.fetchTrendNews()
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('clearSearchQuery')
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('clearSearchQuery').then(() => next())
    },
    computed: mapState({
      categories: state => state.preloadData.categories || []
    }),
    mounted () {
    },
    methods: {
      fetchAds () {
        this.$http.get('ads/home_page').then(({data}) => {
          this.ads = data.data
          this.$endLoading('fetching ads')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching ads'))
      },
      fetchHotNews () {
        this.$http.get('news', {params: {limit: 6, hotnew: 1}}).then(({data}) => {
          let tmp = data.data
          if (tmp.length > 0) {
            this.hotNews.first = tmp[0]
            tmp.shift()
          }
          if (tmp.length > 0) {
            this.hotNews.second = tmp[0]
            tmp.shift()
          }
          this.hotNews.items = tmp

          this.$endLoading('fetching ads')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching ads'))
      },
      fetchDataNews (topic, type, keyData, limit = 6, second = false) {
        this.$http.get('news', {params: {limit: limit, type: type, topic: topic}}).then(({data}) => {
          let tmp = data.data
          if (tmp.length > 0) {
            keyData.first = tmp[0]
            tmp.shift()
          }
          if (second) {
            if (tmp.length > 0) {
              keyData.second = tmp[0]
              tmp.shift()
            }
          }
          keyData.items = tmp

          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      },
      fetchNailNews () {
        this.fetchDataNews(null, 'nail', this.Nail)
      },
      fetchHairNews () {
        this.fetchDataNews(null, 'hair', this.Hair)
      },
      fetchBeautyNews () {
        this.fetchDataNews(null, 'beauty', this.Beauty)
      },
      fetchVideo () {
        this.fetchDataNews(2, null, this.Video)
      },
      fetchProducts () {
        this.fetchDataNews(4, null, this.products, 20, true)
      },
      fetchEventNews () {
        this.fetchDataNews(3, null, this.Events)
      },
      fetchTrendNews () {
        this.fetchDataNews(1, null, this.Trends)
      },
      fetchDataLocation () {
        this.$http.get('showcases', {params: {limit: 20, includeSalon: 1}}).then(({data}) => {
          const res = data.data
          let tmp = res
          if (res.length > 0) {
            let salons = res[0].salons
            this.locations.first = salons[0]
            salons.shift()
            tmp[0].salons = salons
          }
          this.locations.locations = tmp
          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      }

    }
  }
</script>

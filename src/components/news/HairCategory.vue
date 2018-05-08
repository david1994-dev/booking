<template>
  <div>
    <PageHeader/>
    <div id="main-content">
      <div class="left-content">
        <HotNews :ads="ads" :items="hotNews"/>

        <CategoryList :text="'Sự kiện tóc'" id="123" :routeName="'HairChildCategory'"
                      :routeParams="{
                        slug: 3
                      }"
                      :items="eventNews"/>

        <CategoryList :text="'Xu hướng tóc'" id="4321" :routeName="'HairChildCategory'"
                      :routeParams="{
                        slug: 1
                      }"
                      :items="trendNews"/>

        <VideoList :text="'Video về tóc'" :route-params="{slug: 2}" :items="videoNews"/>
      </div>
      <RightContent :ads="ads"/>
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
  const FooterNews = () => import(/* webpackChunkName: "homepage-bundle" */ './Footer')
  const HotNews = () => import(/* webpackChunkName: "homepage-bundle" */ './layout/HotNews')
  const RightContent = () => import(/* webpackChunkName: "homepage-bundle" */ './RightContent')

  import CategoryList from './layout/CategoryList'
  import VideoList from './layout/VideoList'
  import PageHeader from './Header'
  import {mapState} from 'vuex'
  // import $ from 'jquery'

  export default {
    name: 'hairCategory',
    metaInfo: {
      title: 'Bzone News',
      bodyAttrs: {
        class: null
      }
    },
    components: {
      FooterNews,
      HotNews,
      RightContent,
      CategoryList,
      VideoList,
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
        eventNews: {
          first: {},
          news: []
        },
        trendNews: {
          first: {},
          news: []
        },
        videoNews: {
          first: {},
          news: []

        }
      }
    },
    created () {
      this.fetchAds()
      this.fetchHotNews()
      this.fetchEventNews()
      this.fetchTrendNews()
      this.fetchVideoNews()
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
      // this.$nextTick(() => this.menuMobile())
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
        this.$http.get('news', {params: {limit: 6, type: 'hotnews'}}).then(({data}) => {
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

      fetchDataNews (topic, keyData) {
        this.$http.get('news', {params: {limit: 6, type: 'hair', topic: topic}}).then(({data}) => {
          let tmp = data.data
          if (tmp.length > 0) {
            keyData.first = tmp[0]
            tmp.shift()
          }
          keyData.items = tmp

          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      },
      fetchEventNews () {
        this.fetchDataNews(3, this.eventNews)
      },
      fetchTrendNews () {
        this.fetchDataNews(1, this.trendNews)
      },
      fetchVideoNews () {
        this.fetchDataNews(2, this.videoNews)
      }
      // menuMobile () {
      //   $('.main-header .menu li').each((index, item) => {
      //     var _this = $(item)
      //     var count = _this.find('ul').length
      //     if (count) {
      //       _this.addClass('bullet')
      //       $('<i class="bullet-icon bz-down-2"></i>').insertAfter(_this.children('a'))
      //     }
      //   })
      //   $('.main-header .menu .icon, .main-header .menu .overlay, .main-header .menu .close-menu').click(() => {
      //     $('.main-header .menu').toggleClass('active-menu')
      //   })
      //
      //   $('.main-header .menu .bullet-icon').each((index, item) => {
      //     $(item).click(() => {
      //       if ($('.main-header .menu.active-menu').length) {
      //         var parent = $(item).parent()
      //
      //         if (parent.hasClass('active-down')) {
      //           $(item).siblings('ul').stop(true, true).slideUp()
      //         } else {
      //           $(item).siblings('ul').stop(true, true).slideDown()
      //         }
      //         parent.toggleClass('active-down')
      //       }
      //     })
      //   })
      // }
    }
  }
</script>

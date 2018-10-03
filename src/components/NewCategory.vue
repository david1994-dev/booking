<template>
  <div>
    <page-header/>
    <div id="main-content">
      <div class="left-content">
        <HotNews :ads="ads" :items="hotNews"/>
        <div class="list-article" v-if="news.data.length">
          <div class="item" v-for="item in news.data" :key="item.id">
            <router-link class="img" :to="{ name: 'new', params: { id: item.slug } }">
              <img :src="item.image_url"/>
            </router-link>
            <div class="info">
              <div class="name">
                <router-link :to="{ name: 'new', params: { id: item.slug } }">
                  {{ item.title}}
                </router-link>
              </div>
              <div class="creat-by">Hair - Tin mới, đăng bởi {{ item.author }}</div>
              <div class="des" v-if="item.intro.length<140">Welcome, {{ item.intro }}</div>
              <div class="des" v-if="item.intro.length>=140">Welcome, {{ item.intro.substring(0,140)+".." }}</div>
            </div>
          </div>
        </div>
        <div class="paging">
          <paginate
            :page-count="news.meta.pagination.total_pages"
            :container-class="'pagination'"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :prev-class="'prev'"
            :next-class="'next'"
            :break-view-class="'dots'"
            :click-handler="paginateNews"
          >
          </paginate>
        </div>
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

    <PageFooter/>
  </div>
</template>

<script>
  const HotNews = () => import(/* webpackChunkName: "homepage-bundle" */ './news/layout/HotNews')
  const RightContent = () => import(/* webpackChunkName: "homepage-bundle" */ './news/RightContent')

  const Beauty = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Beauty')
  // const Pagination = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Pagination')
  import Paginate from 'vuejs-paginate'

  import PageHeader from './news/Header'
  import PageFooter from './news/Footer'

  import {mapState} from 'vuex'

  export default {
    name: 'news',
    data () {
      return {
        first: null,
        news: {
          meta: {
            pagination: {
              current_page: 0,
              total_pages: 0
            }
          }
        },
        hotNews: {
          first: null,
          second: null,
          items: []
        },
        ads: {},
        pagination: {}
      }
    },
    created () {
      this.fetchData(this.$route.params.category, this.$route.params.slug, 1)
      this.fetchHotNews()
      this.fetchAds()
    },
    metaInfo: {
      title: 'Bzone News',
      bodyAttrs: {
        class: null
      }
    },
    components: {
      HotNews,
      Beauty,
      PageHeader,
      RightContent,
      PageFooter,
      Paginate
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

    watch: {
      '$route.params.id': function (id) {
        location.reload()
      }
    },
    methods: {
      fetchHotNews () {
        this.$http.get('category', {
          params: {
            limit: 6,
            type: this.$route.params.category,
            topic: this.$route.params.slug,
            hotnew: 1
          }
        }).then(({data}) => {
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
      fetchData (category, topic, page = 1) {
        this.$startLoading('fetching news')
        this.$http.get('category', {params: {limit: 20, type: category, topic: topic, page: page}}).then(({data}) => {
          this.news = data
          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      },

      paginateNews (page) {
        this.fetchData(this.$route.params.category, this.$route.params.slug, page)
      },
      fetchAds () {
        let topic = null
        switch (this.$route.params.slug) {
          case 1:
            topic = 'trend'
            break
          case 2:
            topic = 'video'
            break
          case 3:
            topic = 'event'
            break
          case 4:
            topic = 'product'
            break
        }
        this.$http.get('ads/category_2', {params: { type: this.$route.params.category, topic: topic }}).then(({data}) => {
          this.ads = data.data
          this.$endLoading('fetching ads')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching ads'))
      }
    }
  }
</script>

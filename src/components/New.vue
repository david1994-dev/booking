<template>
  <div>
    <pageHeader/>

    <div id="main-content">
      <div class="left-content">

        <div id="news-detail">

          <h1 class="main-title">{{ news.title }}</h1>

          <div class="time"><span class="text-capitalize">{{news.category}}</span> - Đăng bởi {{ news.author }}, {{
            moment(news.created_at).fromNow() }}
          </div>

          <div class="social-detail">
            <div class="social">
              <a :href="'http://www.facebook.com/share.php?u='+url" target="_blank"><img
                src="../assets/news/images/icon-facebook.svg"/></a>
              <a :href="'http://twitter.com/home?status='+url" target="_blank"><img
                src="../assets/news/images/icon-twitter.svg"/></a>
              <a :href="'http://www.linkedin.com/shareArticle?mini=true&url='+url" target="_blank"><img
                src="../assets/news/images/icon-linkedin.svg"/></a>
            </div>
            <div class="detail-content">
              <div class="des">{{ news.intro }}</div>
              <div class="list-relate" v-if="relatedNews.length > 0">
                <router-link v-for="relatedN in relatedNews" :key="relatedN.id" :to="{ name: 'new', params: { id: relatedN.slug } }">{{
                  relatedN.title }}
                </router-link>
              </div>
              <div class="main-content" v-html="news.content"></div>
            </div>
          </div>

          <div class="news-relate">

            <div class="title-relate">Tin liên quan:</div>

            <div class="list-relate" v-if="related.data.length">
              <div class="item" v-for="item in related.data" :key="item.id">
                <div class="img"><a href="#"><img :src="item.image_url"></a></div>
                <div class="info">
                  <div class="name">
                    <router-link :to="{ name: 'new', params: { id: item.slug } }">{{ item.title }}</router-link>
                  </div>
                  <div class="creat-by"><span class="text-capitalize">{{news.category}}</span> - {{
                    moment(news.created_at).fromNow() }}, đăng bởi {{ news.author }}
                  </div>

                  <div class="des" v-if="item.intro.length<140">{{ item.intro }}</div>
                  <div class="des" v-if="item.intro.length>=140">{{ item.intro.substring(0,140)+".." }}</div>
                </div>
              </div>
            </div>


            <div class="paging">
              <paginate
                :page-count="related.meta.pagination.total_pages"
                :container-class="'pagination'"
                :prev-text="'Prev'"
                :next-text="'Next'"
                :prev-class="'prev'"
                :next-class="'next'"
                :break-view-class="'dots'"
                :click-handler="paginateRelated"
              >
              </paginate>
            </div>
          </div>
        </div>

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

    <PageFooter/>
  </div>
</template>

<script>
  const RightContent = () => import(/* webpackChunkName: "homepage-bundle" */ './news/RightContent')
  import Slick from 'vue-slick'
  import PageHeader from './news/Header'
  import PageFooter from './news/Footer'
  import {fbAsyncInit} from '../utils/mixins'
  import Paginate from 'vuejs-paginate'
  import $ from 'jquery'

  export default {
    name: 'Blog',
    components: {
      PageHeader,
      PageFooter,
      Slick,
      RightContent,
      Paginate
    },
    mixins: [fbAsyncInit],
    computed: {
      url () {
        return `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      }
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
        news: {
          meta: {}
        },
        related: {
          meta: {
            pagination: {
              current_page: 0,
              total_pages: 0
            }
          }
        },
        relatedNews: {},
        slickOptions: {
          speed: 300,
          slidesToShow: 1,
          infinite: false,
          prevArrow: document.getElementById('prevRelate'),
          nextArrow: document.getElementById('nextRelate'),
          responsive: [
            {
              breakpoint: 5000,
              settings: {
                variableWidth: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                variableWidth: false
              }
            }
          ],
          accessibility: false
        }
      }
    },
    metaInfo () {
      return {
        title: `${this.News.title} | Bzone News`
      }
    },
    created () {
      this.fetchData()
    },
    beforeUpdate () {
      if (this.$refs.slick) {
        this.$refs.slick.destroy()
      }
    },
    updated () {
      if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
        this.$refs.slick.create()
      }
    },
    watch: {
      $route: function () {
        this.fetchData()
        $('body').removeClass('active-menu')
        $('body').removeClass('active-news')
      }
    },
    methods: {
      fetchData () {
        this.fetchBlog(this.$route.query.preview || null)
        this.fetchRelated()
        this.fetchAds()
        this.fetchRelatedNews()
      },
      fetchBlog (preview = null) {
        let params = {preview}
        this.$startLoading('fetching news')
        this.$http.get(`news/${this.$route.params.id}`, {params}).then(({data}) => {
          this.news = data
          this.$endLoading('fetching news')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching news'))
      },
      fetchRelated (params) {
        this.$startLoading('fetching related')
        this.$http.get(`news/${this.$route.params.id}/related`, {params}).then(({data}) => {
          this.related = data
          this.$endLoading('fetching related')
        }).catch(() => this.$endLoading('fetching related'))
      },
      fetchRelatedNews () {
        this.$startLoading('fetching related')
        this.$http.get(`news/${this.$route.params.id}/related`, {params: {limit: 2}}).then(({data}) => {
          this.relatedNews = data.data
          this.$endLoading('fetching related')
        }).catch(() => this.$endLoading('fetching related'))
      },
      next () {
        this.$refs.slick.next()
      },
      prev () {
        this.$refs.slick.prev()
      },

      paginateRelated (page) {
        this.fetchRelated({page})
      },
      fetchAds () {
        this.$http.get('ads/detail_new').then(({data}) => {
          this.ads = data.data
          this.$endLoading('fetching ads')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching ads'))
      }
    }
  }
</script>

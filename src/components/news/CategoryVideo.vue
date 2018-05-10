<template>
  <div>
    <Header/>
    <div id="main-content">
      <div class="left-content">
        <HotVideo :ads="ads" :items="HotVideo"/>

        <div class="list-video" v-if="items.data.length > 0">
          <div class="item" v-for="item in items.data">
            <div class="img">
              <a href="javascript:;" v-if="item.video_url" data-fancybox data-type="iframe" :data-src="item.video_url">
                <img :src="item.image_url"/>
              </a>
            </div>
            <div class="info">
              <div class="name">
                <a href="javascript:;" v-if="item.title" data-fancybox data-type="iframe" :data-src="item.video_url">
                  {{item.title}}
                </a>
              </div>
              <div class="time" v-if="item.category">{{ item.category }} - {{ item.created_at}}, đăng bởi {{ item.author
                }}
              </div>
              <div class="des" v-if="item.intro.length<140">{{ item.intro }}</div>
              <div class="des" v-if="item.intro.length>=140">{{ item.intro.substring(0,140)+".." }}</div>
            </div>
          </div>
        </div>
        <div class="paging">
          <Paginate
            :page-count="items.meta.pagination.total_pages"
            :container-class="'pagination'"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :prev-class="'prev'"
            :next-class="'next'"
            :break-view-class="'dots'"
            :click-handler="paginateVideo"
          >
          </Paginate>
        </div>
      </div>
      <RightContent :ads="ads"/>
    </div>
    <FooterNews/>
  </div>
</template>

<script>
  import '@fancyapps/fancybox'
  import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'

  const FooterNews = () => import(/* webpackChunkName: "homepage-bundle" */ './Footer')
  const HotVideo = () => import(/* webpackChunkName: "homepage-bundle" */ './layout/HotVideo')
  const RightContent = () => import(/* webpackChunkName: "homepage-bundle" */ './RightContent')
  const Header = () => import(/* webpackChunkName: "homepage-bundle" */ './Header')
  import Paginate from 'vuejs-paginate'

  export default {
    name: 'categoryVideo',
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
        HotVideo: {
          item: {}
        },
        items: {
          meta: {
            pagination: {
              current_page: 0,
              total_pages: 0
            }
          }
        }
      }
    },
    created () {
      this.fetchAds()
      this.fetchHotVideo()
      this.fetchData(this.$route.params.category, 2, 1)
    },
    metaInfo: {
      title: 'Bzone News',
      bodyAttrs: {
        class: null
      }
    },
    components: {
      HotVideo,
      RightContent,
      Paginate,
      Header,
      FooterNews
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.$store.dispatch('clearSearchQuery')
      })
    },
    beforeRouteLeave (to, from, next) {
      this.$store.dispatch('clearSearchQuery').then(() => next())
    },
    mounted () {
    },

    watch: {
      '$route.params.id': function (id) {
        location.reload()
      }
    },
    methods: {
      fetchAds () {
        this.$http.get('ads/home_page').then(({data}) => {
          this.ads = data.data
          this.$endLoading('fetching ads')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching ads'))
      },
      fetchHotVideo () {
        this.$http.get('category', {params: {limit: 1, topic: 2}}).then(({data}) => {
          let tmp = data.data
          if (tmp.length > 0) {
            this.HotVideo.item = tmp[0]
            tmp.shift()
          }

          this.$endLoading('fetching ads')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching ads'))
      },
      fetchData (category, topic, page = 1) {
        this.$startLoading('fetching news')
        this.$http.get('category', {params: {limit: 20, type: category, topic: topic, page: page}}).then(({data}) => {
          this.items = data
          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      },
      paginateVideo (page) {
        this.fetchData(this.$route.params.category, 2, page)
      }
    }
  }
</script>

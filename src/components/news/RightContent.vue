<template>
<div class="right-content">
  <div class="ads-list ads-list-top">
    <a v-if="ads.right_1_1" :href="ads.right_1_1.link"><img :src="ads.right_1_1.image_url"/></a>
    <a v-if="ads.right_1_2" :href="ads.right_1_2.link"><img :src="ads.right_1_2.image_url"/></a>
    <a v-if="ads.right_1_3" :href="ads.right_1_3.link"><img :src="ads.right_1_3.image_url"/></a>
  </div>
  <div class="newest">
    <div class="title-newest">TIN TỨC</div>
    <div class="list-newest">
      <div class="list" v-if="news.length > 0">
        <div class="item" v-for="item in news">
          <div class="img">
            <router-link :to="{ name: 'new', params: { id: item.slug } }">
              <img :src="item.image_url"/>
            </router-link>
          </div>
          <div class="info">
            <div class="name">
              <router-link :to="{ name: 'new', params: { id: item.slug } }">
                {{ item.title}}
              </router-link>
            </div>
            <div class="time">{{ moment(item.created_at).fromNow()}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="ads-list ads-list-center">
    <a v-if="ads.right_1_4" :href="ads.right_1_4.link"><img :src="ads.right_1_4.image_url"/></a>
  </div>
  <div class="like-box">
    <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbzonevn%2F&tabs=share&width=340&height=214&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=383977448645867" width="340" height="214" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
  </div>

  <!--<div class="ads-list ads-list-bottom">-->
    <!--<a href="#"><img src="../../assets/news/images/ads-11.jpg" /></a>-->
    <!--<a href="#"><img src="../../assets/news/images/ads-12.jpg" /></a>-->
    <!--<a href="#"><img src="../../assets/news/images/ads-13.jpg" /></a>-->
    <!--<a href="#"><img src="../../assets/news/images/ads-14.jpg" /></a>-->
  <!--</div>-->

</div>
</template>

<script>
export default {
  name: 'rightContent',
  props: {
    ads: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      first: null,
      news: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching news')
      this.$http.get('news', { params: { limit: 20 } }).then(({ data }) => {
        const res = data.data
        this.news = res
        this.$endLoading('fetching news')
      }).catch(() => this.$endLoading('fetching news'))
    }
  }
}
</script>

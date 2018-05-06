<template>
<div class="hot-news-ads">
  <div class="news-feature" v-if="first">
    <div class="img"> 
      <router-link :to="{ name: 'new', params: { id: first.slug } }">
        <img :src="first.image_url" />
      </router-link>
    </div>
    <div class="name">
      <router-link :to="{ name: 'new', params: { id: first.slug } }">
        {{ first.title}}
      </router-link>
    </div>
    <div class="des" v-if="first.intro.length<200">Welcome, {{ first.intro }}</div>
    <div class="des" v-if="first.intro.length>=200">Welcome, {{ first.intro.substring(0,200)+".." }}</div>
  </div>
  <div class="ads-1">
    <div class="img"> <a href="#"> <img src="../../assets/news/images/ads-1.jpg" /> </a> </div>
    <div class="name"><a href="#">Hàn Quốc vẫn được biết đến là quốc gia châu Á luôn dẫn đầu các xu hướng thời trang, trang điểm và mẫu tóc trong khu vực.</a></div>
  </div>
  
  <div class="list">
    <router-link class="item" v-for="item in news" :key="item.id" :to="{ name: 'new', params: { id: item.slug } }">
      <div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
      <div class="info">
        <div class="name">
          {{ item.title }}
        </div>
        <div class="time">2h trước</div>
      </div>
    </router-link>
  </div>
  <div class="ads-2"> <a href="#"> <img src="../../assets/news/images/ads-2.jpg" /> </a> </div>
  
</div>
</template>

<script>
export default {
  name: 'hotnews',
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
      this.$http.get(`news/${this.$route.params.id}`).then(({ data }) => {
        const res = data.data
        if (res.length > 0) {
          this.first = res[0]
          res.shift()
        }
        this.news = res
        this.$endLoading('fetching news')
      }).catch(() => this.$endLoading('fetching news'))
    }
  }
}
</script>

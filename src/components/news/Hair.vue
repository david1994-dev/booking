<template>
  <div class="news-seciton">
      <div class="tp-title">
        <h2 class="main-title"><a href="#"></a>THÔNG TIN  VỀ TÓC</h2>
        <a class="view-more" href=""><span>xem thêm</span><i class="bz-next"></i></a>
      </div>
      
      <div class="cate-feature" v-if="first">
        <div class="img"><a href="#"><img :src="first.image_url" /></a></div>
        <div class="info">
          <div class="name"> 
              <router-link :to="{ name: 'new', params: { id: first.slug } }">
                {{ first.title}}
              </router-link>
              
          </div>
          <div class="creat-by">Hair - Tin mới, đăng bởi {{ first.author}}</div>
          <div class="des" v-if="first.intro.length<190">Welcome, {{ first.intro }}</div>
          <div class="des" v-if="first.intro.length>=190">Welcome, {{ first.intro.substring(0,190)+".." }}</div>
        </div>
      </div>
      <div class="tp-list">
        <router-link v-for="item in news" :key="item.id" :to="{ name: 'new', params: { id: item.slug } }">
          {{ item.title}}
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'hair',
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
      this.$http.get('news', { params: { limit: 6, type: 'hair' } }).then(({ data }) => {
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

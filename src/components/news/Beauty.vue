<template>
  <div class="news-seciton">
      <div class="tp-title">
        <h2 class="main-title"><a href="#"></a>THÔNG TIN  VỀ BEAUTY</h2>
        <router-link class="view-more" :to="{ name: 'categories' , params:{ category: 'beauty'}}">
              <span>xem thêm</span><i class="bz-next"></i>
        </router-link>
      </div>

      <div class="cate-feature" v-if="first">
        <div class="img"><a href="#"><img :src="first.image_url" /></a></div>
        <div class="info">
          <div class="name"> <a href="#">{{ first.title}}</a> </div>
          <div class="creat-by">Hair - Tin mới, đăng bởi {{ first.author}}</div>
          <div class="des">{{ first.intro}}</div>
        </div>
      </div>
      <div class="tp-list">
        <a href="#" class="item" v-for="item in news" :key="item.id">
          {{ item.title }}
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'beauty',
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
      this.$http.get('news', { params: { limit: 6, type: 'beauty' } }).then(({ data }) => {
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

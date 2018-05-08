<template>
  <div class="news-seciton">
    <div class="tp-title">
      <h2 class="main-title"><a href="#"></a>SẢN PHẨM</h2>
      <router-link class="view-more" :to="{ name: 'productsTopic' }">
        <span>xem thêm</span><i class="bz-next"></i>
      </router-link>
    </div>

    <div class="product-section">
      <div class="product-feature">
        <div class="item first-product" v-if="first">
          <div class="img"><a href="#"><img :src="first.image_url"/></a></div>
          <div class="info">
            <div class="name">
              <router-link :to="{ name: 'new', params: { id: first.slug } }">
                {{ first.title}}
              </router-link>
            </div>
            <div class="des">{{ first.intro}}</div>
            <div class="time">{{ first.category}} - {{ first.created_at}}</div>
          </div>
        </div>
        <div class="item" v-if="second">
          <div class="img"><a href="#"><img :src="second.image_url"/></a></div>
          <div class="info">
            <div class="name"><a href="#">{{ second.title }}</a></div>
            <div class="des">{{ second.intro}}</div>
            <div class="time">{{ second.category}} - {{ second.created_at}}</div>
          </div>
        </div>
      </div>
      <div class="list" v-if="news.length > 0">
        <div class="item" v-for="item in news" :key="item.id">
          <div class="img"><a href="#"><img :src="item.image_url"/></a></div>
          <div class="info">
            <div class="name">
              <router-link :to="{ name: 'new', params: { id: item.slug } }">
                {{ item.title}}
              </router-link>
            </div>
            <div class="time">{{ item.category}} - {{ item.created_at }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'makeup',
  data () {
    return {
      first: null,
      second: null,
      news: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching news')
      this.$http.get('news', {params: {limit: 6, topic: 4}}).then(({data}) => {
        const res = data.data
        if (res.length > 1) {
          this.first = res[0]
          res.shift()
          this.second = res[0]
          res.shift()
        }
        this.news = res
        this.$endLoading('fetching news')
      }).catch(() => this.$endLoading('fetching news'))
    }
  }
}
</script>

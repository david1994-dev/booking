<template>
  <div class="hot-news-ads">
    <div class="news-feature" v-if="first">
      <div class="img">
        <router-link :to="{ name: 'new', params: { id: first.slug } }">
          <img :src="first.image_url"/>
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
    <div class="ads-1" v-if="second">
      <div class="img">
        <router-link :to="{ name: 'new', params: { id: second.slug } }">
          <img :src="second.second_image_url"/>
        </router-link>
      </div>
      <div class="name">
        <router-link :to="{ name: 'new', params: { id: first.slug } }">
          {{ second.title}}
        </router-link>
      </div>
    </div>

    <div class="list" >
      <router-link class="item" v-for="item in news" :key="item.id" :to="{ name: 'new', params: { id: item.slug } }">
        <div class="img"><img src="../../assets/news/images/img-thumb-1.jpg"/></div>
        <div class="info">
          <div class="name">
            {{ item.title }}
          </div>
          <!--<div class="time">2h trước</div>-->
        </div>
      </router-link>
    </div>
    <div class="ads-2" v-if="ads.center_1_2"> <a :href="ads.center_1_2.link"><img :src="ads.center_1_2.image_url"/></a></div>
    <div class="ads-full" v-if="ads.center_1_1">
      <a :href="ads.center_1_1.link"><img :src="ads.center_1_1.image_url"/></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hotnews',
    props: {
      ads: {
        type: Object,
        default: {}
      }
    },
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
        this.$http.get('news', {params: {limit: 6, type: 'hotnews'}}).then(({data}) => {
          const res = data.data
          if (res.length > 0) {
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

<template>
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
</template>

<script>
  export default {
    name: 'rightContent',
    props: {
    },
    data () {
      return {
        news: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$startLoading('fetching news')
        this.$http.get('news', {params: {limit: 20}}).then(({data}) => {
          this.news = data.data
          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      }
    }
  }
</script>

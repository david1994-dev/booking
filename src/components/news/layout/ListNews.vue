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
    <infinite-loading
      @infinite="onInfinite"
      spinner="waveDots"
      ref="infiniteLoading">
        <span slot="no-more">
          {{ $t('search.no_more_results') }}
        </span>
        <span slot="no-results">
          {{ $t('search.no_more_results') }}
        </span>
    </infinite-loading>
  </div>
</template>

<script>
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    name: 'rightContent',
    props: {},
    components: {
      InfiniteLoading
    },
    data () {
      return {
        news: [],
        page: 1,
        meta: {
          current_page: 0,
          total_pages: 0
        }
      }
    },
    created () {
      this.fetchData(null)
    },
    methods: {
      fetchData () {
        this.$startLoading('fetching news')
        this.$http.get('news', {params: {limit: 20, page: this.page}}).then(({data}) => {
          this.news = data.data
          this.meta = data.meta
          this.page++
          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      },
      onInfinite ($state) {
        this.$startLoading('fetching news')
        if (this.page > this.meta.total_pages) {
          $state.complete()
        } else {
          this.$http.get('news', {params: {limit: 20, page: this.page}}).then(({data}) => {
            this.news = this.news.concat(data.data)
            this.meta = data.meta
            if (data.data.length) {
              $state.loaded()
              this.page++
            } else {
              $state.complete()
            }
            this.$endLoading('fetching news')
          }).catch(() => this.$endLoading('fetching news'))
        }
      }
    }
  }
</script>

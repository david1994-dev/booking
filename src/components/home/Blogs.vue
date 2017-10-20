<template>
<div class="tricks-beautiful tp-box">
  <div class="tp-wrap-title">
    <h3 class="tp-title"><strong>{{ $t('home.blogs.sceret') }}</strong> {{ $t('home.blogs.beauty') }}</h3>
    <div class="tp-view-more">
      <router-link :to="{ name: 'blogs' }">{{ $t('common.see_more') }}</router-link>
    </div>
  </div>
  <div class="ofhd">
    <v-loading loader="fetching blogs">
      <template slot="spinner">
        <div class="text-center">
          <v-loading-spinner height="30px" width="30px" />
        </div>
      </template>

      <div class="list" v-if="blogs.length">
        <div class="item" v-for="blog in blogs" :key="blog.id">
          <figure>
            <router-link :to="{ name: 'blog', params: { id: blog.slug } }"><img :src="blog.image_url"></router-link>
          </figure>
          <h4><router-link :to="{ name: 'blog', params: { id: blog.slug } }">{{ blog.title }}</router-link></h4>
          <div class="info">
            <span><a href="#">Chăm sóc da</a></span> <span>{{ $t('home.blogs.viewed_time', {'view_count': blog.page_views}) }}</span>
          </div>
        </div>
      </div>
    </v-loading>
  </div>
  <div class="tp-view-more bottom">
    <router-link :to="{ name: 'blogs' }">{{ $t('common.see_more') }}</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'Blogs',
  data () {
    return {
      blogs: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching blogs')
      this.$http.get('blogs', { params: { limit: 6 } }).then(({ data }) => {
        this.blogs = data
        this.$endLoading('fetching blogs')
      }).catch(() => this.$endLoading('fetching blogs'))
    }
  }
}
</script>

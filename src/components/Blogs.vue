<template>
<div>
  <page-header />
  <div class="blog-page">
    <div class="tp-bigcontainer">
      <h1 class="tp-pagetitle">Blog</h1>
      <div class="content-page">
        <div class="blog">
          <blog-card v-for="blog in blogs"
            :key="blog.id"
            :blog="blog"></blog-card>
        </div>

        <infinite-loading
          :on-infinite="onInfinite"
          spinner="waveDots"
          ref="infiniteLoading">
          <span slot="no-more">
            Không tìm thấy thêm kết quả
          </span>
          <span slot="no-results">
            Không tìm thấy thêm kết quả
          </span>
        </infinite-loading>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { merge } from 'lodash'
import InfiniteLoading from 'vue-infinite-loading'
import PageHeader from './layout/Header'
const BlogCard = () => import(/* webpackChunkName: "blog-bundle" */ './partials/BlogCard')

export default {
  name: 'Blogs',
  components: {
    PageHeader,
    InfiniteLoading,
    BlogCard
  },
  metaInfo: {
    title: 'Blog, thủ thuật'
  },
  data () {
    return {
      blogs: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params.limit = 6
      params = merge(query, params)
      this.$http.get('blogs', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite () {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.blogs = this.blogs.concat(data.data)
        this.meta = data.meta
        this.$refs.infiniteLoading.$emit(data.data.length ? '$InfiniteLoading:loaded' : '$InfiniteLoading:complete')
      })
    }
  }
}
</script>

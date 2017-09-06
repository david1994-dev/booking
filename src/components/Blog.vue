<template>
<div>
  <page-header />
  <div class="blogdetail-page">
    <div class="content-page">
      <h1 class="main-title">{{ blog.title }}</h1>
      <div class="content-text" v-html="blog.content"></div>
    </div>

    <div class="related">
      <div class="title-related">
        <div class="title">Có thể bạn quan tâm</div>
        <div class="control">
          <div class="tp-control small">
            <div class="btn prev" id="prevRelate" @click="prev"></div>
            <div class="btn next" id="nextRelate" @click="next"></div>
          </div>
        </div>
      </div>

      <div class="related-slide" v-if="related.length">
        <slick class="slide" ref="slick" :options="slickOptions">
          <div v-for="blog in related" :key="blog.id">
            <blog-card :blog="blog" />
          </div>
        </slick>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Slick from 'vue-slick'
import PageHeader from './layout/Header'
const BlogCard = () => import(/* webpackChunkName: "blog-bundle" */ './partials/BlogCard')

export default {
  name: 'Blog',
  components: {
    PageHeader,
    BlogCard,
    Slick
  },
  data () {
    return {
      blog: {},
      related: [],
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        infinite: false,
        prevArrow: document.getElementById('prevRelate'),
        nextArrow: document.getElementById('nextRelate'),
        responsive: [
          {
            breakpoint: 5000,
            settings: {
              variableWidth: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              variableWidth: false
            }
          }
        ]
      }
    }
  },
  created () {
    this.fetchData()
  },
  beforeUpdate () {
    if (this.$refs.slick) {
      this.$refs.slick.destroy()
    }
  },
  updated () {
    if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
      this.$refs.slick.create()
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.fetchBlog()
      this.fetchRelated()
    },
    fetchBlog () {
      this.$startLoading('fetching blog')
      this.$http.get(`blogs/${this.$route.params.id}`).then(({ data }) => {
        this.blog = data
        this.$endLoading('fetching blog')
      }).catch(() => this.$endLoading('fetching blog'))
    },
    fetchRelated () {
      this.$startLoading('fetching related')
      this.$http.get(`blogs/${this.$route.params.id}/related`).then(({ data }) => {
        this.related = data
        this.$endLoading('fetching related')
      }).catch(() => this.$endLoading('fetching related'))
    },
    next () {
      this.$refs.slick.next()
    },
    prev () {
      this.$refs.slick.prev()
    }
  }
}
</script>

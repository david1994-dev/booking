<template>
  <div class="news-seciton">
    <div class="tp-title">
      <h2 class="main-title"><a href="#"></a>VIDEO CHỌN LỌC</h2>
      <router-link class="view-more" :to="{ name: 'newcategory', params: { id: 'video' } }">
        <span>xem thêm</span><i class="bz-next"></i>
      </router-link>
    </div>
    <div class="video-section">
      <div class="video-feature" v-if="first">
        <div class="img">
          <a href="javascript:;" data-fancybox data-type="iframe" :data-src="first.video_url">
            <img :src="first.image_url"/>
          </a>
        </div>
        <div class="info">
          <div class="name">
            <a href="javascript:;" data-fancybox data-type="iframe" :data-src="first.video_url">
              {{first.title}}
            </a>
          </div>
          <div class="time">{{ first.category }} - {{ first.created_at}}, đăng bởi {{ first.author }}</div>
        </div>
      </div>
      <div class="list" v-if="news.length > 0">
        <div class="item" v-for="item in news" :key="item.id">
          <div class="img"><a href="javascript:;" data-fancybox data-type="iframe" :data-src="item.video_url">
            <img :src="item.image_url"/>
          </a>
          </div>
          <div class="name"><a href="javascript:;" data-fancybox data-type="iframe" :data-src="item.video_url">
            {{item.title}} <i class="bz-video-camera icon-camera"></i></a>
          </div>
          <div class="time">{{ item.category }} - {{ item.created_at}}, đăng bởi {{ item.author }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@fancyapps/fancybox'
  import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'

  export default {
    name: 'news',
    data () {
      return {
        first: {
          video_url: '',
          image_url: ''
        },
        news: []
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        this.$startLoading('fetching news')
        this.$http.get('news', {params: {limit: 6, topic: 2}}).then(({data}) => {
          const res = data.data
          if (res.length > 0) {
            this.first = res[0]
            console.log(this.first)
            res.shift()
          }
          this.news = res
          this.$endLoading('fetching news')
        }).catch(() => this.$endLoading('fetching news'))
      }
    }
  }
</script>

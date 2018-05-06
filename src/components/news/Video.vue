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
          <a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/6vbFe6F48Uo">
            <img src="https://img.youtube.com/vi/6vbFe6F48Uo/maxresdefault.jpg" />
          </a>
        </div>
        <div class="info">
          <div class="name">
            <a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/6vbFe6F48Uo">Titanium dioxide lại được ví như “cứu tinh chống tia tử ngoại” của mỹ phẩm bảo vệ da</a> </div>
          <div class="time">Beauty - 10 phút trước, đăng bởi Meolun</div>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="img"> <a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8"> <img src="https://img.youtube.com/vi/305ryPvU6A8/mqdefault.jpg" /> </a>
          </div>
          <div class="name"><a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8">[REVIEW] Son MAC thần thánh kiểu tóc nam đang gây sốt <i class="bz-video-camera icon-camera"></i></a>
          </div>
          <div class="time">Beauti - 1h trước</div>
        </div>
        <div class="item">
          <div class="img"> <a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8"> <img src="https://img.youtube.com/vi/305ryPvU6A8/mqdefault.jpg" /> </a>
          </div>
          <div class="name"><a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8">[REVIEW] Son MAC thần thánh kiểu tóc nam đang gây sốt <i class="bz-video-camera icon-camera"></i></a>
          </div>
          <div class="time">Beauti - 1h trước</div>
        </div>
        <div class="item">
          <div class="img"> <a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8"> <img src="https://img.youtube.com/vi/305ryPvU6A8/mqdefault.jpg" /> </a>
          </div>
          <div class="name"><a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8">[REVIEW] Son MAC thần thánh kiểu tóc nam đang gây sốt <i class="bz-video-camera icon-camera"></i></a>
          </div>
          <div class="time">Beauti - 1h trước</div>
        </div>
        <div class="item">
          <div class="img"> <a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8"> <img src="https://img.youtube.com/vi/305ryPvU6A8/mqdefault.jpg" /> </a>
          </div>
          <div class="name"><a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8">[REVIEW] Son MAC thần thánh kiểu tóc nam đang gây sốt <i class="bz-video-camera icon-camera"></i></a>
          </div>
          <div class="time">Beauti - 1h trước</div>
        </div>
        <div class="item">
          <div class="img"> <a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8"> <img src="https://img.youtube.com/vi/305ryPvU6A8/mqdefault.jpg" /> </a>
          </div>
          <div class="name"><a href="javascript:;" data-fancybox data-type="iframe" data-src="https://www.youtube.com/embed/305ryPvU6A8">[REVIEW] Son MAC thần thánh kiểu tóc nam đang gây sốt <i class="bz-video-camera icon-camera"></i></a>
          </div>
          <div class="time">Beauti - 1h trước</div>
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
        this.$http.get('news', { params: { limit: 6, type: 'video' } }).then(({ data }) => {
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

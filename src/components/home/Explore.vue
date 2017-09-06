<template>
<div class="guide-discovery">
  <div class="guide-book tp-box">
    <div class="tp-wrap-title">
      <h3 class="tp-title"><strong>Làm thế nào</strong> để đặt chỗ</h3>
    </div>
    <div class="ofhd">
      <div class="list">
        <div class="item">
          <div class="name">Tìm kiếm</div>
          <div class="content-item">
            <div class="number">1</div>
            <p class="des">Theo tên stylist bạn quen, tên salon hoặc dịch vụ mà bạn đang cần</p>
          </div>
        </div>
        <div class="item">
          <div class="name">Đặt lịch</div>
          <div class="content-item">
            <div class="number">2</div>
            <p class="des">Kiểm tra lịch trống của các salon & kéo slot đó</p>
          </div>
        </div>
        <div class="item">
          <div class="name">Trải nghiệm</div>
          <div class="content-item">
            <div class="number">3</div>
            <p class="des">Tới trước lịch hẹn 5 phút và salon sẽ chào mừng bạn theo cách bạn thích</p>
          </div>
        </div>
        <div class="item">
          <div class="name">Đánh giá</div>
          <div class="content-item">
            <div class="number">4</div>
            <p class="des">Để cùng xây dựng một cộng đồng chất lượng & khách quan, bảo vệ quyền lợi cho nha</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="discovery tp-box">
    <div class="tp-wrap-title">
      <h3 class="tp-title"><strong>Khám phá</strong> các salon</h3>
      <div class="tp-view-more orange"><router-link :to="{ name: 'explore' }">xem thêm</router-link></div>
    </div>
    <div class="ofhd">
      <v-loading loader="fetching showcases">
        <template slot="spinner">
          <div class="text-center">
            <v-loading-spinner height="30px" width="30px" />
          </div>
        </template>

        <div class="tp-discovery" v-if="showcases.length">
          <div class="item" v-for="showcase in showcases" :key="showcase.id">
            <figure><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }"><img :src="showcase.image_url" /></router-link></figure>
            <div class="info">
              <h4><router-link :to="{ name: 'showcase', params: { id: showcase.slug } }">{{ showcase.name }}</router-link></h4>
              <span>1.435 đã đặt</span>
            </div>
          </div>
        </div>
      </v-loading>
    </div>

    <div class="tp-view-more bottom orange"><router-link :to="{ name: 'explore' }">xem thêm</router-link></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Explore',
  data () {
    return {
      showcases: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching showcases')
      this.$http.get('showcases', { params: { limit: 4 } }).then(({ data }) => {
        this.showcases = data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    }
  }
}
</script>

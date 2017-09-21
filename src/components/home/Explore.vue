<template>
<div class="guide-discovery">
  <div class="guide-book tp-box">
    <div class="tp-wrap-title">
      <h3 class="tp-title"><strong>Đẹp hơn</strong> chỉ với 4 bước</h3>
    </div>
    <div class="ofhd">
      <div class="list">
        <div class="item">
          <div class="name">Tìm kiếm</div>
          <div class="content-item">
            <div class="number">1</div>
            <p class="des">Dễ dàng tìm kiếm dịch vụ làm đẹp theo tên spa, stylist và khu vực của bạn</p>
          </div>
        </div>
        <div class="item">
          <div class="name">Đặt lịch</div>
          <div class="content-item">
            <div class="number">2</div>
            <p class="des">Chủ động đặt hẹn với spa phù hợp với lịch của bạn</p>
          </div>
        </div>
        <div class="item">
          <div class="name">Trải nghiệm</div>
          <div class="content-item">
            <div class="number">3</div>
            <p class="des">Tận hưởng dịch vụ chăm sóc chuyên nghiệp cùng với những stylist hàng đầu</p>
          </div>
        </div>
        <div class="item">
          <div class="name">Đánh giá</div>
          <div class="content-item">
            <div class="number">4</div>
            <p class="des">Trực tiếp phản hồi trải nghiệm của bạn đến salon và chia sẻ đến mọi người</p>
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
              <span>{{ showcase.total_booking }} đã đặt</span>
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
      this.$http.get('showcases', { params: { limit: 4, booking_count: 1 } }).then(({ data }) => {
        this.showcases = data
        this.$endLoading('fetching showcases')
      }).catch(() => this.$endLoading('fetching showcases'))
    }
  }
}
</script>

<template>
  <div class="news-seciton">
    <div class="tp-title">
      <h2 class="main-title"><a href="#"></a>{{text}}</h2>
      <router-link class="view-more" :to="{ name: 'newcategory', params: { id: 'makeup' } }">
        <span>xem thêm</span><i class="bz-next"></i>
      </router-link>
    </div>

    <div class="salon-section">
      <div class="feature-ads">
        <div class="video-feature" v-if="items.locations.first">
          <div class="img"><a href="#"><img :src="items.locations.first.image_url"/></a></div>
          <div class="info">
            <div class="name">
              <router-link :to="{ name: 'new', params: { id: items.locations.first.slug } }">
                {{ items.locations.first.name}}
              </router-link>
            </div>
            <div class="address">14 Hàng Bún, Hoàn Kiếm, Hà Nội</div>
            <div class="tp-rate">
              <div class="stars-number">
                <div class="stars star-35">
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                </div>
                <div class="number">8.0 Rất tốt</div>
              </div>
              <div class="dash">-</div>
              <div class="rate-status">2 Đánh giá</div>
            </div>
          </div>
        </div>
        <div class="ads">
          <div class="btn-style order">ĐẶT LỊCH</div>
          <div class="btn-style online">LÀM ĐẸP ONLINE</div>
          <div class="salon-image">
            <div><img src="../../../assets/news/images/salon-image-1.jpg"/></div>
            <div><img src="../../../assets/news/images/salon-image-2.jpg"/></div>
            <div><img src="../../../assets/news/images/salon-image-3.jpg"/></div>
          </div>
          <div class="des">Với hơn 200 salons hàng đầu tại Hà Nội</div>
          <a class="discovery" href="https://dev.bzone.vn/search?q=a">KHÁM PHÁ NGAY</a>
        </div>
      </div>
      <div class="list" v-if="items.locations.length > 0">
        <div class="item" v-for="item in items.locations" :key="item.id">
          <div class="img">
            <router-link :to="{ name: 'new', params: { id: item.slug } }">
              <img :src="item.image_url"/>
            </router-link>
          </div>
          <div class="info">
            <div class="name">
              <router-link :to="{ name: 'new', params: { id: item.slug } }">
                {{ item.name}}
              </router-link>
            </div>
            <div class="address">14 Hàng Bún, Hoàn Kiếm, Hà Nội</div>
            <div class="tp-rate">
              <div class="stars-number">
                <div class="stars star-35">
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                </div>
                <div class="number">8.0 Rất tốt</div>
              </div>
              <div class="dash">-</div>
              <div class="rate-status">2 Đánh giá</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'locationLayout',
    props: {
      text: {
        type: String,
        default: ''
      },
      routeName: {
        type: String,
        default: ''
      },
      routeParams: {
        type: Object,
        default: {}
      },
      items: {
        type: Object,
        default: {
          first: {},
          locations: []
        }
      }
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {}
  }
</script>

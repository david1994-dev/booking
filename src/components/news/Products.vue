<template>
  <div class="news-seciton">
      <div class="tp-title">
        <h2 class="main-title"><a href="#"></a>SẢN PHẨM</h2>
        <router-link class="view-more" :to="{ name: 'newcategory', params: { id: 'product' } }">
              <span>xem thêm</span><i class="bz-next"></i>
        </router-link>
      </div>

      <div class="product-section">
      <div class="product-feature">
        <div class="item first-product">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="des">Titanium dioxide lại được ví như “cứu tinh chống tia tử ngoại” của mỹ phẩm bảo vệ da. bảo vệ da khỏi tia UVA , UVB và không có nguy cơ kích ứng da</div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="des">Titanium dioxide lại được ví như “cứu tinh chống tia tử ngoại” của mỹ phẩm bảo vệ da. bảo vệ da khỏi tia UVA , UVB và không có nguy cơ kích ứng da</div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
      </div>
      <div class="list">
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
        <div class="item">
          <div class="img"><a href="#"><img src="../../assets/news/images/img-place.jpg" /></a></div>
          <div class="info">
            <div class="name"> <a href="#">Protein phục hồi tóc hư nát Sophia platinum hari repair protein</a> </div>
            <div class="time">Product - 1 giờ trước</div>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'makeup',
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
      this.$http.get('news', { params: { limit: 6, type: 'makeup' } }).then(({ data }) => {
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

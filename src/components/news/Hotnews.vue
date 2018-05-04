<template>
<div class="hot-news-ads">
  <div class="news-feature">
    <div class="img"> <a href="#"> <img src="../../assets/news/images/img-thumb-big.jpg" /> </a> </div>
    <div class="name"><a href="#">Justin Mạnh's Collection 2018</a></div>
    <div class="des">Kiểu tóc vốn dĩ đóng một vai trò rất quan trọng trong việc tạo ấn tượng với người ngoài. Vậy những kiểu tóc nam nào hiện đang làm mưa làm gió xứ sở Kim Chi. Cùng nhau tìm hiểu nha!</div>
  </div>
  <div class="ads-1">
    <div class="img"> <a href="#"> <img src="../../assets/news/images/ads-1.jpg" /> </a> </div>
    <div class="name"><a href="#">Hàn Quốc vẫn được biết đến là quốc gia châu Á luôn dẫn đầu các xu hướng thời trang, trang điểm và mẫu tóc trong khu vực.</a></div>
  </div>
  <div class="list">
    <a href="#" class="item" v-for="item in news" :key="item.id">
      <div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
      <div class="info">
        <div class="name">
          <router-link :to="{ name: 'news', params: { id: item.id } }">{{ item.title }}</router-link>
        </div>
        <div class="time">2h trước</div>
      </div>
    </a>
  </div>
  <div class="ads-2"> <a href="#"> <img src="../../assets/news/images/ads-2.jpg" /> </a> </div>
  
</div>
</template>

<script>
export default {
  name: 'hotnews',
  data () {
    return {
      news: []
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching news')
      this.$http.get('news', { params: { limit: 6, type: 'hotnews' } }).then(({ data }) => {
        this.news = data.data
        this.$endLoading('fetching news')
      }).catch(() => this.$endLoading('fetching news'))
    }
  }
}
</script>

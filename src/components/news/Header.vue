<template>
  <header id="header">
		<div class="tp-container">
      <router-link class="main-logo" :to="{ name: 'news'}">
        <img src="../../assets/news/images/logo.png" />
      </router-link>
			<div class="menu">
				<div class="icon-menu">
					<div class="inner-icon">
						<div class="top">
							<span></span>
						</div>
						<div class="bottom">
							<span></span>
						</div>
					</div>
				</div>

				<div class="main-menu-search">
					<div class="search-menu">
						<div class="search-inner">
							<input type="type" class="txt" placeholder="Bạn tìm gì..." />
							<div class="button">
								<input type="submit" value="" />
								<i class="bz-search"></i>
							</div>
						</div>
					</div>
					<div class="title-category">DANH MỤC CHÍNH</div>
					<div class="main-menu">
						<ul>
							<li>
								<router-link class="main-link" :to="{ name: 'newcategory', params: { id: 'hair' } }">Hair</router-link>
							</li>
							<li>
								<router-link class="main-link" :to="{ name: 'newcategory', params: { id: 'nail' } }">Nail</router-link>
							</li>
							<li>
								<router-link class="main-link" :to="{ name: 'newcategory', params: { id: 'beauty' } }">Beauty</router-link>
							</li>
							<li><a class="main-link" href="#">Đặt lịch làm đẹp</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div class="news">
				<div class="icon-txt">NEWS</div>
				<div class="list-news">
					<div class="title-listw">TIN TỨC</div>
					<div class="list">
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
					</div>
					<div class="day-post">03/04/2018</div>
					<div class="list">
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
					</div>
					<div class="day-post">02/04/2018</div>
					<div class="list">
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-1.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
						<a href="#" class="item">
							<div class="img"><img src="../../assets/news/images/img-thumb-2.jpg" /></div>
							<div class="info">
								<div class="name">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</div>
								<div class="time">2h trước</div>
							</div>
						</a>
					</div>
				</div>
			</div>

			<div class="search">
				<div class="search-inner">
					<input type="type" class="txt" placeholder="Tìm kiếm" />
					<div class="button">
						<input type="submit" value="">
						<i class="bz-search"></i>
					</div>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
  name: 'header',
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
      this.$http.get('news', { params: { limit: 6, type: 'hotnews' } }).then(({ data }) => {
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

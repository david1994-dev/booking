<template>
<div>
    <page-header />
	<div id="main-content">
		<div class="left-content">
			<hotnews />
			<div class="ads-full"><a href="#"><img src="../assets/news/images/ads-3.jpg" /></a></div>

			<div class="list-article" v-if="news.length">
				<div class="item" v-for="item in news" :key="item.id">
					<router-link class="img" :to="{ name: 'new', params: { id: item.slug } }">
						<img :src="item.image_url" />
					</router-link>
					<div class="info">
						<div class="name">
							<router-link :to="{ name: 'new', params: { id: item.slug } }">
								{{ item.title}}
							</router-link>
						</div>
						<div class="creat-by">Hair - Tin mới, đăng bởi {{ item.author }}</div>
						<div class="des" v-if="item.intro.length<140">Welcome, {{ item.intro }}</div>
    					<div class="des" v-if="item.intro.length>=140">Welcome, {{ item.intro.substring(0,140)+".." }}</div>
					</div>
				</div>
			</div>
			<pagination  :pagination="pagination" :offset="4"  />
		</div>

		<rightContent />
	</div>

	<div id="ads-list">
		<div class="inner">
			<a href="#"><img src="../assets/news/images/ads-7.jpg" /></a>
			<a href="#"><img src="../assets/news/images/ads-8.jpg" /></a>
			<a href="#"><img src="../assets/news/images/ads-9.jpg" /></a>
			<a href="#"><img src="../assets/news/images/ads-10.jpg" /></a>
		</div>
	</div>

	<footer class="footer">
		<div class="tp-container">
			<div class="savetime-footer">
				<h3>Tích kiệm thời gian, đặt lịch chăm sóc bản thân ngay tại đây</h3>
				<p>là điểm đến trực tuyến cho các chuyên gia chăm sóc sắc đẹp và khách hàng. Chuyên gia có thể giới thiệu công việc của họ, kết nối với khách hàng mới và hiện tại và xây dựng doanh nghiệp của họ. Khách hàng có thể khám phá các dịch vụ và nhà cung cấp dịch vụ mới, đặt hẹn trực tuyến và lấy cảm hứng.</p>
				<div class="full"></div>
				<div class="copyright">©Abby 2017</div>
			</div>
			<div class="instagram">
				<ul>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
					<li><a href="#"><img src="../assets/news/images/image-instagram.jpg" /></a></li>
				</ul>
			</div>
			<div class="links">
				<div class="title">Link</div>
				<ul class="list-link">
					<li><a href="#">Về chúng tôi</a></li>
					<li><a href="#">Hỗ trợ</a></li>
					<li><a href="#">Ảnh</a></li>
					<li><a href="#">Đối tác</a></li>
					<li><a href="#">Liên hệ</a></li>
				</ul>
				<div class="full"></div>
				<ul class="social">
					<li><a href="#"><i class="bz-facebook"></i></a></li>
					<li><a href="#"><i class="bz-instagram"></i></a></li>
				</ul>
			</div>
			<div class="copyright bottom">©Abby 2017</div>
		</div>
	</footer>
</div>
</template>

<script>

const Hotnews = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Hotnews')
const Hair = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Hair')
const Nail = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Nail')
const RightContent = () => import(/* webpackChunkName: "homepage-bundle" */ './news/RightContent')

const Beauty = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Beauty')
const Pagination = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Pagination')

import PageHeader from './news/Header'

import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'news',
  data () {
    return {
      first: null,
      news: [],
      pagination: {}
    }
  },
  created () {
    this.fetchData(this.$route.params.id)
  },
  metaInfo: {
    title: 'Bzone News',
    bodyAttrs: {
      class: null
    }
  },
  components: {
    Hotnews,
    Hair,
    Nail,
    Beauty,
    PageHeader,
    RightContent,
    Pagination
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('clearSearchQuery')
    })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('clearSearchQuery').then(() => next())
  },
  computed: mapState({
    categories: state => state.preloadData.categories || []
  }),
  mounted () {
    this.$nextTick(() => this.menuMobile())
  },

  watch: {
    '$route.params.id': function (id) {
      this.fetchData(id)
    }
  },

  methods: {
    fetchData (id) {
      this.$startLoading('fetching news')
      this.$http.get('news', { params: { limit: 20, type: id } }).then(({ data }) => {
        this.news = data.data
        this.paging = data.meta.pagination
        this.$endLoading('fetching news')
      }).catch(() => this.$endLoading('fetching news'))
    },
    menuMobile () {
      $('.main-header .menu li').each((index, item) => {
        var _this = $(item)
        var count = _this.find('ul').length
        if (count) {
          _this.addClass('bullet')
          $('<i class="bullet-icon bz-down-2"></i>').insertAfter(_this.children('a'))
        }
      })
      $('.main-header .menu .icon, .main-header .menu .overlay, .main-header .menu .close-menu').click(() => {
        $('.main-header .menu').toggleClass('active-menu')
      })

      $('.main-header .menu .bullet-icon').each((index, item) => {
        $(item).click(() => {
          if ($('.main-header .menu.active-menu').length) {
            var parent = $(item).parent()

            if (parent.hasClass('active-down')) {
              $(item).siblings('ul').stop(true, true).slideUp()
            } else {
              $(item).siblings('ul').stop(true, true).slideDown()
            }
            parent.toggleClass('active-down')
          }
        })
      })
    }
  }
}
</script>

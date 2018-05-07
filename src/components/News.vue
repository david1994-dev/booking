<template>
<div>
  	<pageHeader />

	<div id="main-content">
		<div class="left-content">
			<div class="tp-title">
				<h2 class="main-title"><a href="#"></a>HOT NEWS</h2>
			</div>
			<div class="hot-news-ads">
        		<hotnews :ads="ads" />
			</div>

      <Hair />

      <Nail />

      <Beauty />

      <Video/>

      <MakeUp/>

      <Products/>
		</div>
		<rightContent :ads="ads"/>
	</div>


	<div id="ads-list">
		<div class="inner">
			<a v-if="ads.under_1_1" :href="ads.under_1_1.link"><img :src="ads.under_1_1.image_url" /></a>
			<a v-if="ads.under_1_2" :href="ads.under_1_2.link"><img :src="ads.under_1_2.image_url" /></a>
			<a v-if="ads.under_1_3" :href="ads.under_1_3.link"><img :src="ads.under_1_3.image_url" /></a>
			<a v-if="ads.under_1_4" :href="ads.under_1_4.link"><img :src="ads.under_1_4.image_url" /></a>
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
const Beauty = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Beauty')
const RightContent = () => import(/* webpackChunkName: "homepage-bundle" */ './news/RightContent')
const Video = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Video')
const MakeUp = () => import(/* webpackChunkName: "homepage-bundle" */ './news/MakeUp')
const Products = () => import(/* webpackChunkName: "homepage-bundle" */ './news/Products')

import PageHeader from './news/Header'
import { mapState } from 'vuex'
import $ from 'jquery'

export default {
  name: 'news',
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
    RightContent,
    Video,
    MakeUp,
    Products,
    PageHeader
  },
  data () {
    return {
      ads: {
        center_1_1: {},
        center_1_2: {},
        right_1_1: {},
        right_1_2: {},
        right_1_3: {},
        right_1_4: {},
        under_1_1: {},
        under_1_2: {},
        under_1_3: {},
        under_1_4: {}
      }
    }
  },
  created () {
    this.fetchAds()
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
  methods: {
    fetchAds () {
      this.$http.get('ads/home_page').then(({data}) => {
        this.ads = data.data
        this.$endLoading('fetching ads')
        this.fbAsyncInit()
      }).catch(() => this.$endLoading('fetching ads'))
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

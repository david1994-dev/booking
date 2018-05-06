<template>
  <div>
    <pageHeader/>

    <div id="main-content">
      <div class="left-content">

        <div id="news-detail">

          <h1 class="main-title">{{ news.title }}</h1>

          <div class="time">Hair - Đăng bởi {{ news.author }}, {{ news.created_at }}</div>

          <div class="social-detail">
            <div class="social">
              <a href="#"><img src="../assets/news/images/icon-facebook.svg"/></a>
              <a href="#"><img src="../assets/news/images/icon-twitter.svg"/></a>
              <a href="#"><img src="../assets/news/images/icon-linkedin.svg"/></a>
            </div>
            <div class="detail-content">
              <div class="des">{{ news.intro }}</div>
              <div class="list-relate">
                <a href="#">Tổng thống Trump được đề cử giải Nobel Hòa bình</a>
                <a href="#">Thăm Trung Quốc trước thềm cuộc gặp dự kiến với Tổng thống Donald Trump cho thấy ông Kim
                  Jong-un đang tìm cách cân bằng quan hệ với 2 nước lớn.</a>
              </div>
              <div class="main-content" v-html="news.content"></div>
            </div>
          </div>

          <div class="news-relate">

            <div class="title-relate">Tin liên quan:</div>

            <div class="list-relate" v-if="related.length">
              <div class="item" v-for="item in related" :key="item.id">
                <div class="img"><a href="#"><img :src="item.image_url"></a></div>
                <div class="info">
                  <div class="name">
                    <router-link :to="{ name: 'new', params: { id: item.slug } }">{{ item.title }}</router-link>
                  </div>
                  <div class="creat-by">Hair - Tin mới, đăng bởi {{ news.author }}</div>
                  <div class="des">{{ item.intro }}</div>
                </div>
              </div>
            </div>


            <div class="paging">
              <ul>
                <li class="active">1</li>
                <li><a href="">2</a></li>
                <li><a href="">3</a></li>
                <li class="dots">...</li>
                <li><a href="">13</a></li>
                <li class="prev"><a href="#">Prev</a></li>
                <li class="next"><a href="#">Next</a></li>
              </ul>
            </div>

          </div>

        </div>

      </div>
      <div class="right-content">
        <div class="ads-list ads-list-top">
          <a href="#"><img src="../assets/news/images/ads-4.jpg"/></a>
          <a href="#"><img src="../assets/news/images/ads-5.jpg"/></a>
        </div>
        <div class="newest">
          <div class="title-newest">TIN TỨC</div>
          <div class="list-newest">
            <div class="list">
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">6 kiểu túc ngang vai giúp trẻ ra đến chục tuổi đang được hội chị em rất
                    ưa chuộng</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">6 kiểu túc ngang vai giúp trẻ ra đến chục tuổi đang được hội chị em rất
                    ưa chuộng</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">6 kiểu túc ngang vai giúp trẻ ra đến chục tuổi đang được hội chị em rất
                    ưa chuộng</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
            </div>
            <div class="day">04/04/2018</div>
            <div class="list">
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
            </div>
            <div class="day">03/04/2018</div>
            <div class="list">
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
            </div>
            <div class="day">02/04/2018</div>
            <div class="list">
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-1.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
              <div class="item">
                <div class="img"><a href="#"><img src="../assets/news/images/img-thumb-2.jpg"></a></div>
                <div class="info">
                  <div class="name"><a href="#">Cách chăm sóc da mặt đúng cách, bạn đã biết chưa?</a></div>
                  <div class="time">2h trước</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="ads-list ads-list-center">
          <a href="#"><img src="../assets/news/images/ads-6.jpg"/></a>
        </div>
        <div class="like-box">
          <iframe
            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fbzonevn%2F&width=450&layout=standard&action=like&size=small&show_faces=true&share=true&height=80&appId=383977448645867"
            width="309" height="80" style="border:none;overflow:hidden" scrolling="no" frameborder="0"
            allowTransparency="true" allow="encrypted-media"></iframe>
        </div>

        <div class="ads-list ads-list-bottom">
          <a href="#"><img src="../assets/news/images/ads-11.jpg"/></a>
          <a href="#"><img src="../assets/news/images/ads-12.jpg"/></a>
          <a href="#"><img src="../assets/news/images/ads-13.jpg"/></a>
          <a href="#"><img src="../assets/news/images/ads-14.jpg"/></a>
        </div>

      </div>
    </div>


    <div id="ads-list">
      <div class="inner">
        <a href="#"><img src="../assets/news/images/ads-7.jpg"/></a>
        <a href="#"><img src="../assets/news/images/ads-8.jpg"/></a>
        <a href="#"><img src="../assets/news/images/ads-9.jpg"/></a>
        <a href="#"><img src="../assets/news/images/ads-10.jpg"/></a>
      </div>
    </div>

    <footer class="footer">
      <div class="tp-container">
        <div class="savetime-footer">
          <h3>Tích kiệm thời gian, đặt lịch chăm sóc bản thân ngay tại đây</h3>
          <p>là điểm đến trực tuyến cho các chuyên gia chăm sóc sắc đẹp và khách hàng. Chuyên gia có thể giới thiệu công
            việc của họ, kết nối với khách hàng mới và hiện tại và xây dựng doanh nghiệp của họ. Khách hàng có thể khám
            phá các dịch vụ và nhà cung cấp dịch vụ mới, đặt hẹn trực tuyến và lấy cảm hứng.</p>
          <div class="full"></div>
          <div class="copyright">©Abby 2017</div>
        </div>
        <div class="instagram">
          <ul>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
            <li><a href="#"><img src="../assets/news/images/image-instagram.jpg"/></a></li>
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
  import Slick from 'vue-slick'
  import PageHeader from './news/Header'
  import {fbAsyncInit} from '../utils/mixins'

  export default {
    name: 'Blog',
    components: {
      PageHeader,
      Slick
    },
    mixins: [fbAsyncInit],
    computed: {
      url () {
        return `${window.location.protocol}//${window.location.host}${window.location.pathname}`
      }
    },
    data () {
      return {
        news: {
          meta: {}
        },
        related: [],
        slickOptions: {
          speed: 300,
          slidesToShow: 1,
          infinite: false,
          prevArrow: document.getElementById('prevRelate'),
          nextArrow: document.getElementById('nextRelate'),
          responsive: [
            {
              breakpoint: 5000,
              settings: {
                variableWidth: true
              }
            },
            {
              breakpoint: 480,
              settings: {
                variableWidth: false
              }
            }
          ],
          accessibility: false
        }
      }
    },
    metaInfo () {
      return {
        title: `${this.News.title} | Bzone News`
      }
    },
    created () {
      this.fetchData()
    },
    beforeUpdate () {
      if (this.$refs.slick) {
        this.$refs.slick.destroy()
      }
    },
    updated () {
      if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
        this.$refs.slick.create()
      }
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.fetchBlog()
        this.fetchRelated()
      },
      fetchBlog () {
        this.$startLoading('fetching news')
        this.$http.get(`news/${this.$route.params.id}`).then(({data}) => {
          this.news = data
          this.$endLoading('fetching news')
          this.fbAsyncInit()
        }).catch(() => this.$endLoading('fetching news'))
      },
      fetchRelated () {
        this.$startLoading('fetching related')
        this.$http.get(`news/${this.$route.params.id}/related`).then(({data}) => {
          this.related = data.data
          this.$endLoading('fetching related')
        }).catch(() => this.$endLoading('fetching related'))
      },
      next () {
        this.$refs.slick.next()
      },
      prev () {
        this.$refs.slick.prev()
      }
    }
  }
</script>

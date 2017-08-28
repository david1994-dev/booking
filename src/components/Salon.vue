<template>
<div>
  <page-header />
  <div class="detail-page">
    <cover-slider :images="salon.covers" />

    <scrollactive ref="scrollactive"
      class="content"
      active-class="active"
      :offset="58">
      <div class="main-content">
        <div class="wrap-menu">
          <ul class="menu">
            <li><a href="#about" class="scrollactive-item">Giới thiệu</a></li>
            <li><a href="#services" class="scrollactive-item">Dịch vụ</a></li>
            <li><a href="#stylists" class="scrollactive-item">Stylist</a></li>
            <li><a href="#images" class="scrollactive-item">Hình ảnh</a></li>
            <li><a href="#reviews" class="scrollactive-item">Đánh giá</a></li>
          </ul>
        </div>

        <div id="about" >
          <overview :salon="salon"></overview>
        </div>

        <div id="services">
          <services :salon="salon"></services>
        </div>

        <div id="stylists">
          <stylists :salon="salon"></stylists>
        </div>

        <div id="images">
          <gallery :salon="salon"></gallery>
        </div>

        <div id="reviews">
          <reviews :salon="salon"></reviews>
        </div>

        <div class="map-d">
          <div class="title">Bản đồ</div>
          <div class="content-map"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14898.810853108052!2d105.83973442957765!3d21.004550734680084!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x499b8b613889f78a!2zVHLGsOG7nW5nIMSR4bqhaSBo4buNYyBYw6J5IEThu7FuZw!5e0!3m2!1svi!2s!4v1503242496769" width="600" height="280" frameborder="0" style="border:0" allowfullscreen></iframe></div>
        </div>
      </div>

      <cart />
    </scrollactive>
  </div>

  <div class="related">
    <div class="title-related">
      <div class="title">Có thể bạn quan tâm</div>
      <div class="control">
        <div class="prev"></div>
        <div class="next"></div>
      </div>
    </div>

    <!-- <div class="related-slide">
      <div class="slide-inner" draggable>
        <div>
          <div class="tp-salon">
            <div class="img-price">
              <figure><a href="#"><img src="assets/images/image-salons.jpg"></a></figure>
              <div class="price-rate">
                <div class="price">
                  <span>From</span>
                  <strong>324.000 VND</strong>
                </div>
                <div class="rate">
                  <div class="tp-rate">
                    <div class="rate-status">Rất tốt</div>
                    <div class="stars-number">
                      <div class="stars">
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                      </div>
                      <div class="number">158 Đánh giá</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-info">
              <div class="name-address">
                <h3 class="salon-name"><a href="">Tony&Guy Hairdressing</a></h3>
                <p class="address">69 Mạc thị tình, Phường Bến Nghé, Quận 1, HCMC</p>
              </div>
              <div class="wrap-stylist">
                <div class="stylist-img">
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                </div>
                <div class="scrollup"><i class="bz-down-2"></i></div>
              </div>
              <div class="dates">
                <div class="item active">Hôm nay</div>
                <div class="item">12/07</div>
                <div class="item">13/07</div>
                <div class="item calendar"><i class="bz-calendar-day"></i></div>
              </div>
              <div class="wrap-times">
                <div class="times">
                  <div class="item active">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="tp-salon">
            <div class="img-price">
              <figure><a href="#"><img src="assets/images/image-salons.jpg"></a></figure>
              <div class="price-rate">
                <div class="price">
                  <span>From</span>
                  <strong>324.000 VND</strong>
                </div>
                <div class="rate">
                  <div class="tp-rate">
                    <div class="rate-status">Rất tốt</div>
                    <div class="stars-number">
                      <div class="stars">
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                      </div>
                      <div class="number">158 Đánh giá</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-info">
              <div class="name-address">
                <h3 class="salon-name"><a href="">Tony&Guy Hairdressing</a></h3>
                <p class="address">69 Mạc thị tình, Phường Bến Nghé, Quận 1, HCMC</p>
              </div>
              <div class="wrap-stylist">
                <div class="stylist-img">
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                </div>
                <div class="scrollup"><i class="bz-down-2"></i></div>
              </div>
              <div class="dates">
                <div class="item active">Hôm nay</div>
                <div class="item">12/07</div>
                <div class="item">13/07</div>
                <div class="item calendar"><i class="bz-calendar-day"></i></div>
              </div>
              <div class="wrap-times">
                <div class="times">
                  <div class="item active">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="tp-salon">
            <div class="img-price">
              <figure><a href="#"><img src="../assets/images/image-salons.jpg"></a></figure>
              <div class="price-rate">
                <div class="price">
                  <span>From</span>
                  <strong>324.000 VND</strong>
                </div>
                <div class="rate">
                  <div class="tp-rate">
                    <div class="rate-status">Rất tốt</div>
                    <div class="stars-number">
                      <div class="stars">
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                        <i class="bz-star"></i>
                      </div>
                      <div class="number">158 Đánh giá</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="wrap-info">
              <div class="name-address">
                <h3 class="salon-name"><a href="">Tony&Guy Hairdressing</a></h3>
                <p class="address">69 Mạc thị tình, Phường Bến Nghé, Quận 1, HCMC</p>
              </div>
              <div class="wrap-stylist">
                <div class="stylist-img">
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                  <div class="item">
                    <figure><a href="#"><img src="../assets/images/image-stylist.jpg"></a></figure>
                    <div class="info">
                      <h3><a href="#">Sơn Đẹp Trai</a></h3>
                      <span>34 Salon có dịch vụ</span>
                    </div>
                  </div>
                </div>
                <div class="scrollup"><i class="bz-down-2"></i></div>
              </div>
              <div class="dates">
                <div class="item active">Hôm nay</div>
                <div class="item">12/07</div>
                <div class="item">13/07</div>
                <div class="item calendar"><i class="bz-calendar-day"></i></div>
              </div>
              <div class="wrap-times">
                <div class="times">
                  <div class="item active">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                  <div class="item">8:30</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</div>
</template>

<script>
import { stickyClassMixin } from '@/utils/mixins'
import PageHeader from './layout/Header'
const CoverSlider = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Covers')
const Overview = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Overview')
const Services = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Services')
const Stylists = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Stylists')
const Gallery = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Gallery')
const Reviews = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Reviews')
const Cart = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Cart')

export default {
  name: 'Salon',
  components: {
    PageHeader,
    CoverSlider,
    Overview,
    Services,
    Stylists,
    Gallery,
    Reviews,
    Cart
  },
  mixins: [stickyClassMixin],
  data () {
    return {
      salon: {}
    }
  },
  metaInfo () {
    return {
      title: this.salon.name
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('clearSearchQuery')
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.dispatch('clearCart').then(() => next())
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('clearCart').then(() => next())
  },
  created () {
    this.fetchSalon()
  },
  mounted () {
    this.initSticky()
  },
  watch: {
    '$route': 'fetchSalon'
  },
  methods: {
    fetchSalon () {
      this.$startLoading('fetching salon')
      this.$http.get(`salons/${this.$route.params.id}`, { params: { includes: 'covers,services.category' } }).then(({ data }) => {
        this.salon = data
        this.$endLoading('fetching salon')
      }).catch(() => this.$endLoading('fetching salon'))
    },
    initSticky () {
      this.$nextTick(() => {
        setTimeout(() => {
          this.addStickyClass('.wrap-menu')
        }, 1000)
      })
    }
  }
}
</script>

<template>
<div class="related">
  <div class="title-related">
    <div class="title">Có thể bạn quan tâm</div>
    <div class="control">
      <div class="tp-control small">
        <div class="btn prev" id="prevRelate" @click="prev"></div>
        <div class="btn next" id="nextRelate" @click="next"></div>
      </div>
    </div>
  </div>

  <div class="related-slide" v-if="salons.length">
    <slick class="slide-inner" ref="slick" :options="slickOptions">
      <div v-for="salon in salons" :key="salon.id">
        <div class="tp-salon">
          <div class="img-price">
            <figure><router-link :to="{ name: 'salon', params: { id: salon.slug } }"><img :src="salon.image_url"></router-link></figure>
            <div class="price-rate">
              <div class="price">
                <span>From</span>
                <strong>324.000 VND</strong>
              </div>
              <div class="rate">
                <div class="tp-rate">
                  <div class="rate-status">{{ salon.rating_summary }}</div>
                  <stars :rating="salon.average_rating">
                    <div class="number">{{ salon.review_count }} Đánh giá</div>
                  </stars>
                </div>
              </div>
            </div>
          </div>
          <div class="wrap-info">
            <div class="name-address">
              <h3 class="salon-name"><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h3>
              <p class="address">{{ salon.address }}</p>
            </div>
            <div class="wrap-stylist">
              <div class="stylist-img">
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
                  <div class="info">
                    <h3><a href="#">Sơn Đẹp Trai</a></h3>
                    <span>34 Salon có dịch vụ</span>
                  </div>
                </div>
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
                  <div class="info">
                    <h3><a href="#">Sơn Đẹp Trai</a></h3>
                    <span>34 Salon có dịch vụ</span>
                  </div>
                </div>
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
                  <div class="info">
                    <h3><a href="#">Sơn Đẹp Trai</a></h3>
                    <span>34 Salon có dịch vụ</span>
                  </div>
                </div>
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
                  <div class="info">
                    <h3><a href="#">Sơn Đẹp Trai</a></h3>
                    <span>34 Salon có dịch vụ</span>
                  </div>
                </div>
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
                  <div class="info">
                    <h3><a href="#">Sơn Đẹp Trai</a></h3>
                    <span>34 Salon có dịch vụ</span>
                  </div>
                </div>
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
                  <div class="info">
                    <h3><a href="#">Sơn Đẹp Trai</a></h3>
                    <span>34 Salon có dịch vụ</span>
                  </div>
                </div>
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
                  <div class="info">
                    <h3><a href="#">Sơn Đẹp Trai</a></h3>
                    <span>34 Salon có dịch vụ</span>
                  </div>
                </div>
                <div class="item">
                  <figure><a href="#"><img src="../../assets/images/image-stylist.jpg"></a></figure>
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
              <div class="item calendar-btn"><i class="bz-calendar-day"></i></div>
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
    </slick>
  </div>
</div>
</template>

<script>
import Slick from 'vue-slick'
import Stars from '../partials/StarRating'

export default {
  name: 'SalonRelated',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  components: {
    Slick,
    Stars
  },
  data () {
    return {
      salons: [],
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        infinite: false,
        draggable: false,
        swipe: false,
        // autoplay: true,
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
        ]
      }
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
    'salon': 'fetchData'
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching related')
      this.$http.get(`salons/${this.salon.id}/related`).then(({ data }) => {
        this.salons = data
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

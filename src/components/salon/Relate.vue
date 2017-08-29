<template>
<div class="related">
  <div class="title-related">
    <div class="title">Có thể bạn quan tâm</div>
    <div class="control">
      <div class="tp-control small">
        <div class="btn prev" id="prevRelate"></div>
        <div class="btn next" id="nextRelate"></div>
      </div>
    </div>
  </div>

  <div class="related-slide">
    <slick class="slide-inner" ref="slick" :options="slickOptions">
      <div>
        <div class="tp-salon">
          <div class="img-price">
            <figure><a href="#"><img src="../../assets/images/image-salons.jpg"></a></figure>
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
            <figure><a href="#"><img src="../../assets/images/image-salons.jpg"></a></figure>
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
            <figure><a href="#"><img src="../../assets/images/image-salons.jpg"></a></figure>
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
    </slick>
  </div>
</div>
</template>

<script>
import Slick from 'vue-slick'

export default {
  name: 'SalonRelate',
  components: {
    Slick
  },
  data () {
    return {
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
  }
}
</script>

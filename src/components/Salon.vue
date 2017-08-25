<template>
<div>
  <page-header />
  <div class="detail-page">
    <cover-slider />

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
            <li><a href="#rate" class="scrollactive-item">Đánh giá</a></li>
          </ul>
        </div>
        <div class="about-d" id="about">
          <div class="title-address">
            <h1 class="title">{{ salon.name }}</h1>
            <p class="address">{{ salon.address }}</p>
          </div>
          <div class="rate">
            <div class="tp-rate">
              <div class="stars-number">
                <div class="stars">
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                  <i class="bz-star"></i>
                </div>
                <div class="number">{{ salon.review_count }} Đánh giá</div>
              </div>
            </div>
          </div>

          <div class="link">
            <div class="name">Liên kết</div>
            <ul>
              <li><a href=""><i class="bz-facebook"></i></a></li>
              <li><a href=""><i class="bz-instagram"></i></a></li>
            </ul>
          </div>

          <div class="time-since">
            <div class="item"> <i class="bz-clock"></i> 09:00 - 21:00 <span class="main-color">-</span> Các ngày trong tuần</div>
            <div class="item"> <i class="bz-calendar"></i> Thành lập ngày 17 tháng 5 2013</div>
            <div class="item"> <i class="bz-hair-spray"></i> Hoá chất sư dụng: Davines, Moroccan Oil, Tony & Guy, L’Oreal</div>
          </div>

          <div class="des" v-if="salon.description">
            <p>{{ salon.description }}</p>
          </div>
        </div>

        <div class="service-d" id="services">
          <div class="title">Chọn dịch vụ</div>
          <div class="list">
            <div class="item">
              <div class="tp-checkbox"><input type="checkbox" /><span></span></div>
              <div class="name-price"><strong>Cắt tóc nam</strong><div class="fl-full"></div><span class="brace">(</span><span>589.000 VNĐ - 45 phút</span><span class="brace">)</span></div>
            </div>
            <div class="item">
              <div class="tp-checkbox"><input type="checkbox" /><span></span></div>
              <div class="name-price"><strong>Cắt tóc nam</strong><div class="fl-full"></div><span class="brace">(</span><span>589.000 VNĐ - 45 phút</span><span class="brace">)</span></div>
            </div>
            <div class="item">
              <div class="tp-checkbox"><input type="checkbox" /><span></span></div>
              <div class="name-price"><strong>Cắt tóc nam</strong><div class="fl-full"></div><span class="brace">(</span><span>589.000 VNĐ - 45 phút</span><span class="brace">)</span></div>
            </div>
            <div class="item">
              <div class="tp-checkbox"><input type="checkbox" /><span></span></div>
              <div class="name-price"><strong>Cắt tóc nam</strong><div class="fl-full"></div><span class="brace">(</span><span>589.000 VNĐ - 45 phút</span><span class="brace">)</span></div>
            </div>
          </div>
        </div>

        <div class="stylist-d" id="stylists">
          <div class="title">Stylist</div>
          <div class="list">
            <div class="item active">
              <figure><a href=""><img src="../assets/images/image-stylist.jpg" /></a></figure>
            </div>
            <div class="item">
              <figure><a href=""><img src="../assets/images/image-stylist.jpg" /></a></figure>
            </div>
            <div class="item">
              <figure><a href=""><img src="../assets/images/image-stylist.jpg" /></a></figure>
            </div>
            <div class="item">
              <figure><a href=""><img src="../assets/images/image-stylist.jpg" /></a></figure>
            </div>
            <div class="item">
              <figure><a href=""><img src="../assets/images/image-stylist.jpg" /></a></figure>
            </div>
            <div class="item">
              <figure><a href=""><img src="../assets/images/image-stylist.jpg" /></a></figure>
            </div>
            <div class="item">
              <figure><a href=""><img src="../assets/images/image-stylist.jpg" /></a></figure>
            </div>
          </div>
        </div>

        <div class="times-d">
          <div class="title">Chọn thời gian</div>
          <div class="dates-times">
            <div class="tp-datetime">
              <div class="dates">
                <div class="item active">Hôm nay</div>
                <div class="item">12/07</div>
                <div class="item">13/07</div>
                <div class="item">14/07</div>
                <div class="item calendar"><i class="bz-calendar-day"></i>calendar</div>
              </div>
              <div class="times">
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

        <div class="images-d" id="images">
          <div class="title">336 Hình ảnh</div>
          <div class="list">
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item"><img src="../assets/images/image-instagram.jpg" /></div>
            <div class="item">
              <span class="number"><span>+336</span></span>
              <img src="../assets/images/image-instagram.jpg" />
            </div>
          </div>
        </div>

        <div class="rate-d" id="rate">
          <div class="title">
            <div class="name">336 Đánh giá</div>
            <div class="stars">
              <i class="bz-star"></i>
              <i class="bz-star"></i>
              <i class="bz-star"></i>
              <i class="bz-star"></i>
              <i class="bz-star"></i>
            </div>
          </div>
          <div class="list">
            <div class="item">
              <div class="info-rate">
                <figure><img src="../assets/images/image-stylist.jpg"></figure>
                <div class="info">
                  <div class="name">Trương Hồ Quỳnh Nga</div>
                  <div class="date-stars">
                    <div class="date">Hôm qua</div>
                    <div class="stars">
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-rate">
                Diện tích để xe cũng không nhiều, những hôm salon đông khách thiệt tình là không biết để xe đâu luôn nên mình toàn phải bảo anh Mỹ đưa mình qua. Được cái bên này cắt rất đẹp, rất ưng.
              </div>
            </div>
            <div class="item">
              <div class="info-rate">
                <figure><img src="../assets/images/image-stylist.jpg"></figure>
                <div class="info">
                  <div class="name">Trương Hồ Quỳnh Nga</div>
                  <div class="date-stars">
                    <div class="date">Hôm qua</div>
                    <div class="stars">
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-rate">
                Diện tích để xe cũng không nhiều, những hôm salon đông khách thiệt tình là không biết để xe đâu luôn nên mình toàn phải bảo anh Mỹ đưa mình qua. Được cái bên này cắt rất đẹp, rất ưng.
              </div>
            </div>
            <div class="item">
              <div class="info-rate">
                <figure><img src="../assets/images/image-stylist.jpg"></figure>
                <div class="info">
                  <div class="name">Trương Hồ Quỳnh Nga</div>
                  <div class="date-stars">
                    <div class="date">Hôm qua</div>
                    <div class="stars">
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-rate">
                Diện tích để xe cũng không nhiều, những hôm salon đông khách thiệt tình là không biết để xe đâu luôn nên mình toàn phải bảo anh Mỹ đưa mình qua. Được cái bên này cắt rất đẹp, rất ưng.
              </div>
            </div>
            <div class="item">
              <div class="info-rate">
                <figure><img src="../assets/images/image-stylist.jpg"></figure>
                <div class="info">
                  <div class="name">Trương Hồ Quỳnh Nga</div>
                  <div class="date-stars">
                    <div class="date">Hôm qua</div>
                    <div class="stars">
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                      <i class="bz-star"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div class="content-rate">
                Diện tích để xe cũng không nhiều, những hôm salon đông khách thiệt tình là không biết để xe đâu luôn nên mình toàn phải bảo anh Mỹ đưa mình qua. Được cái bên này cắt rất đẹp, rất ưng.
              </div>
            </div>
          </div>

          <div class="paging">
            <ul>
              <li class="active">1</li>
              <li><a href="">2</a></li>
              <li><a href="">3</a></li>
              <li>...</li>
              <li><a href="">13</a></li>
              <li class="next"><a href="">Next</a></li>
            </ul>
          </div>
        </div>

        <div class="map-d">
          <div class="title">Bản đồ</div>
          <div class="content-map"><iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14898.810853108052!2d105.83973442957765!3d21.004550734680084!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x499b8b613889f78a!2zVHLGsOG7nW5nIMSR4bqhaSBo4buNYyBYw6J5IEThu7FuZw!5e0!3m2!1svi!2s!4v1503242496769" width="600" height="280" frameborder="0" style="border:0" allowfullscreen></iframe></div>
        </div>
        <!-- <v-loading loader="fetching salon">
          <template slot="spinner">
            <div class="text-center">
              <v-loading-spinner height="30px" width="30px" />
            </div>
          </template>

          loaded
        </v-loading> -->
      </div>

      <div class="cart">
        <div class="inner-cart">
          <div class="service-c">
            <div class="title-service">Dịch vụ</div>
            <div class="list">
              <div class="tp-choice-service">
                <div class="bullet"></div>
                <div class="info">
                  <div class="name"><span class="delete"></span>Cắt tóc nam</div>
                  <div class="time-price">
                    <div class="time">30 phút</div>
                    <div class="price">589.000 VNĐ</div>
                  </div>
                </div>
              </div>
              <div class="tp-choice-service">
                <div class="bullet"></div>
                <div class="info">
                  <div class="name"><span class="delete"></span>Cắt tóc nam</div>
                  <div class="time-price">
                    <div class="time">30 phút</div>
                    <div class="price">589.000 VNĐ</div>
                  </div>
                </div>
              </div>
              <div class="tp-choice-service">
                <div class="bullet"></div>
                <div class="info">
                  <div class="name"><span class="delete"></span>Cắt tóc nam</div>
                  <div class="time-price">
                    <div class="time">30 phút</div>
                    <div class="price">589.000 VNĐ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="stylist-c">
            <div class="title-stylist">Stylist</div>
            <div class="wrap">
              <figure><span class="delete"></span><img src="../assets/images/image-stylist.jpg"></figure>
              <div class="info">
                <strong>Lê Văn Triệu</strong>
                <span>Lê Văn Triệu</span>
              </div>
            </div>
          </div>

          <div class="time-c">
            <strong>Thời gian</strong>
            <span>9:30 ngày 11 tháng 7</span>
          </div>

          <div class="price-book-c">
            <div class="price-c">
              <div class="tp-price-total">
                <div class="price">
                  <span>Cộng</span>
                  <span>2.436.000 VNĐ</span>
                </div>
                <div class="time">
                  <span>Thời gian thực hiện</span>
                  <span>2 tiếng 25 phút</span>
                </div>
              </div>
            </div>
            <div class="tp-btn-book btn-book"><i class="bz-book"></i>Đặt lịch hẹn</div>
          </div>

          <div class="no-service-c">
            <a class="tp-btn choice-service red" href="#service">Chọn dịch vụ</a>
            <p>Bạn chưa chọn dịch vụ</p>
          </div>
        </div>
      </div>

      <div class="cart-mobile">

        <div class="no-choice-service">
          <a href="#service">Chọn dịch vụ</a>
          <p>Bạn chưa chọn dịch vụ</p>
        </div>

        <div class="wrap-book">
          <div class="title-book">
            <span>Đặt lịch</span>
            <i class="bz-close close"></i>
          </div>

          <div class="content-book">

            <div class="service-stylist">
              <div class="list-service">
                <div class="tp-choice-service">
                  <div class="bullet"></div>
                  <div class="info">
                    <div class="name"><span class="delete"></span>Cắt tóc nam</div>
                    <div class="time-price">
                      <div class="time">30 phút</div>
                      <div class="price">589.000 VNĐ</div>
                    </div>
                  </div>
                </div>
                <div class="tp-choice-service">
                  <div class="bullet"></div>
                  <div class="info">
                    <div class="name"><span class="delete"></span>Cắt tóc nam</div>
                    <div class="time-price">
                      <div class="time">30 phút</div>
                      <div class="price">589.000 VNĐ</div>
                    </div>
                  </div>
                </div>
                <div class="tp-choice-service">
                  <div class="bullet"></div>
                  <div class="info">
                    <div class="name"><span class="delete"></span>Cắt tóc nam</div>
                    <div class="time-price">
                      <div class="time">30 phút</div>
                      <div class="price">589.000 VNĐ</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="list-stylist">
                <div class="name">Stylist</div>
                <div class="list">
                  <div class="item active"><img src="../assets/images/image-stylist.jpg"></div>
                  <div class="item"><img src="../assets/images/image-stylist.jpg"></div>
                  <div class="item"><img src="../assets/images/image-stylist.jpg"></div>
                  <div class="item"><img src="../assets/images/image-stylist.jpg"></div>
                  <div class="item"><img src="../assets/images/image-stylist.jpg"></div>
                  <div class="item"><img src="../assets/images/image-stylist.jpg"></div>
                  <div class="item"><img src="../assets/images/image-stylist.jpg"></div>
                  <div class="item"><img src="../assets/images/image-stylist.jpg"></div>
                </div>
              </div>
              <div class="choice-time">
                <div class="name">Thời gian</div>
                <div class="btn-time">Chọn thời gian</div>
              </div>
            </div>

            <div class="btn-book">
              <div class="tp-btn-book">
                <i class="bz-book"></i>Đặt lịch hẹn
              </div>
            </div>

            <div class="price-time">
              <div class="tp-price-total">
                <div class="price">
                  <span>Cộng</span>
                  <span>2.436.000 VNĐ</span>
                </div>
                <div class="time">
                  <span>Thời gian thực hiện</span>
                  <span>2 tiếng 25 phút</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import $ from 'jquery'
import { stickyClassMixin } from '@/utils/mixins'
import PageHeader from './layout/Header'
const CoverSlider = () => import(/* webpackChunkName: "salon-bundle" */ './salon/Slider')

export default {
  name: 'Salon',
  components: {
    PageHeader,
    CoverSlider
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
  created () {
    this.fetchSalon()
  },
  watch: {
    '$route': 'fetchSalon'
  },
  methods: {
    fetchSalon () {
      this.$startLoading('fetching salon')
      this.$http.get(`salons/${this.$route.params.id}`).then(({ data }) => {
        this.salon = data
        this.$endLoading('fetching salon')

        this.addStickyClass('.wrap-menu')
        this.stickyCart()
      })
    },

    stickyCart () {
      const $cart = $('.detail-page .content .cart')
      const $cartInner = $('.detail-page .content .cart .inner-cart')
      const $window = $(window)

      if (!$cart.length) {
        return
      }

      const frameHandler = () => {
        if ($window.width() <= 1050) {
          $cart.removeClass('fixed')
          return
        }

        const offsetTop = $cart.offset().top
        const scrollTop = $window.scrollTop()
        const marginTop = 25

        if (scrollTop > (offsetTop - marginTop)) {
          $cart.addClass('fixed')
          if (scrollTop > (offsetTop + $cart.height() - $cartInner.height()) - marginTop) {
            $cart.addClass('fixed_bottom')
            $cartInner.css('top', '')
          } else {
            $cart.removeClass('fixed_bottom')
          }
        } else {
          $cart.removeClass('fixed fixed_bottom')
          $cartInner.css('top', '')
        }
      }
      const scrollHandler = () => {
        requestAnimationFrame(frameHandler)
      }

      $window.scroll(scrollHandler)

      scrollHandler()
    }
  }
}
</script>

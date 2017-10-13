<template>
<div class="sub-container">
  <div class="container-inner">
    <div class="title-filter">Bộ lọc:</div>
    <div class="list-filter">
      <div class="item-filter" :class="{ active: active === 'salons' }">
        <div class="selected" @click="toggleActive('salons')">
          <div class="name">Hair Salons</div>
          <i class="bz-down-2"></i>
        </div>
        <div class="content-item">
          <filter-items :items="{ test1: 'Test 1', test2: 'Test 2' }" />
          <div class="action">
            <span class="cancel" @click="active = ''">Hủy bỏ</span>
            <span class="search" @click="submit">Tìm kiếm</span>
          </div>
        </div>
      </div>
      <div class="item-filter" :class="{ active: active === 'popularity' }">
        <div class="selected" @click="toggleActive('popularity')">
          <div class="name">Tính phổ biến</div>
          <i class="bz-down-2"></i>
        </div>
        <div class="content-item">
          <filter-items :items="popularity" />
          <div class="action">
            <span class="cancel" @click="active = ''">Hủy bỏ</span>
            <span class="search" @click="submit">Tìm kiếm</span>
          </div>
        </div>
      </div>
      <div class="item-filter" :class="{ active: active === 'amenities' }">
        <div class="selected" @click="toggleActive('amenities')">
          <div class="name">Tiện ích</div>
          <i class="bz-down-2"></i>
        </div>
        <div class="content-item">
          <amenity-filters />
          <div class="action">
            <span class="cancel" @click="active = ''">Hủy bỏ</span>
            <span class="search">Tìm kiếm</span>
          </div>
        </div>
      </div>
      <div class="item-filter" :class="{ active: active === 'price' }">
        <div class="selected" @click="toggleActive('price')">
          <div class="name">Giá dịch vụ</div>
          <i class="bz-down-2"></i>
        </div>
        <div class="content-item">
          <div class="list">
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
          </div>
          <div class="action">
            <span class="cancel" @click="active = ''">Hủy bỏ</span>
            <span class="search">Tìm kiếm</span>
          </div>
        </div>
      </div>
      <div class="item-filter" :class="{ active: active === 'rating' }">
        <div class="selected" @click="toggleActive('rating')">
          <div class="name">Đánh giá của khách hàng</div>
          <i class="bz-down-2"></i>
        </div>
        <div class="content-item">
          <div class="list">
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
            <label class="item">
              <div class="tp-checkbox"><input type="checkbox"><span></span></div>
              <div class="name">Khu vui chơi giải trí (25)</div>
            </label>
          </div>
          <div class="action">
            <span class="cancel" @click="active = ''">Hủy bỏ</span>
            <span class="search">Tìm kiếm</span>
          </div>
        </div>
      </div>
      <div class="item-filter view-more" :class="{ active: active === 'more' }">
        <div class="selected" @click="toggleActive('more')">
          <div class="name">Xem thêm</div>
          <i class="bz-down-2"></i>
        </div>
        <div class="content-item">
          <div class="inner-viewmore">
            <div class="list-viewmore">
              <div class="title-item">Tính phổ biến</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>

            <div class="list-viewmore">
              <div class="title-item">Tiện ích</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>

            <div class="list-viewmore">
              <div class="title-item">Giá dịch vụ</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>
            <div class="list-viewmore">
              <div class="title-item">Đánh giá của khách hàng</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>

            <div class="list-viewmore">
              <div class="title-item">Tính phổ biến 2</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>

            <div class="list-viewmore">
              <div class="title-item">Xếp hạng salon</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>

            <div class="list-viewmore">
              <div class="title-item">Tiện ích</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>

            <div class="list-viewmore">
              <div class="title-item">Hóa chất sử dụng</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>

            <div class="list-viewmore">
              <div class="title-item">Tính phổ biến 3</div>
              <div class="list">
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
                <label class="item">
                  <div class="tp-checkbox"><input type="checkbox"><span></span></div>
                  <div class="name">Khu vui chơi giải trí (25)</div>
                </label>
              </div>
              <div class="view-all-wrap">
                <div class="view-all expand"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
                <div class="view-all collapse"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
              </div>
            </div>
          </div>
          <div class="action">
            <span class="cancel" @click="active = ''">Hủy bỏ</span>
            <span class="search">Tìm kiếm</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
const FilterItems = () => import(/* webpackChunkName: "search-bundle" */ './FilterItems')
const AmenityFilters = () => import(/* webpackChunkName: "search-bundle" */ './filters/Amenities')

const POPULARITY = {
  most_favorite: 'Được yêu thích nhất',
  most_booking: 'Được booking nhiều nhất',
  best_deal: 'Có yêu đãi lớn nhất',
  nearest: 'Gần bạn nhất',
  best_rating: 'Được review tốt nhất'
}

// const AMENITIES = {
//   wifi: 'Wifi miễn phí',
//   credit_card: 'Chấp nhận thanh toán thẻ',
//   pet_section: 'Chỗ chơi cho pet',
//   no_smoking: 'Không hút thuốc',
//   air_conditioner: 'Điều hòa, máy lạnh',
//   shopping_mall: 'Gần trung tâm mua sắm',
//   no_foods: 'Cấm mang đồ ăn, uống',
//   waiting_room: 'Có phòng chờ cho khách',
//   all_day: 'Phục vụ tới 24h'
// }

export default {
  name: 'SearchFilter',
  components: {
    FilterItems,
    AmenityFilters
  },
  computed: mapGetters(['searchFilters']),
  data () {
    return {
      active: '',
      popularity: POPULARITY
    }
  },
  methods: {
    toggleActive (active) {
      if (!this.active || this.active !== active) {
        this.active = active
      } else {
        this.active = ''
      }
    },
    submit () {
      console.log(this.searchFilters)
    }
  }
}
</script>

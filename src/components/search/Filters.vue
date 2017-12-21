<template>
<div class="sub-container">
  <div class="container-inner">
    <div class="title-filter">Bộ lọc:</div>
    <div class="list-filter">
      <search-filter name="Hoá chất"
        :class="{ active: active === 'chemicals', 'has-filter': filter.chemicals.length }"
        @toggle="toggleActive('chemicals')"
        @submit="submit"
        @cancel="removeFilter({ chemicals: [] })">
        <div class="list">
          <label class="item" v-for="chemical in chemicals"
            :key="chemical.id">
            <div class="tp-checkbox"><input type="checkbox" v-model="filter.chemicals" :value="chemical.id"><span></span></div>
            <div class="name">{{ chemical.name }}</div>
          </label>
        </div>
      </search-filter>

      <search-filter name="Tiện ích"
        :class="{ active: active === 'amenities', 'has-filter': filter.amenities.length }"
        @toggle="toggleActive('amenities')"
        @submit="submit"
        @cancel="removeFilter({ amenities: [] })">
        <div class="list">
          <label class="item" v-for="amenity in amenities"
            :key="amenity.id">
            <div class="tp-checkbox"><input type="checkbox" v-model="filter.amenities" :value="amenity.id"><span></span></div>
            <div class="name">{{ amenity.name }}</div>
          </label>
        </div>
      </search-filter>

      <search-filter name="Giá dịch vụ"
        :class="{ active: active === 'price', 'has-filter': hasPriceFilter }"
        @toggle="toggleActive('price')"
        @submit="submit"
        @cancel="removeFilter({ price: [0, 300] })">
        <div class="price-filter">
          <vue-slider ref="priceRange" v-model="filter.price"
            :height="4"
            :max="1000"
            :dot-size="32"
            :formatter="formatPrice"
            :bg-style="{
              'backgroundColor': '#d8d8d8',
            }"
            :slider-style="[
              {
                'border': '1px solid #9ad9d6',
                'backgroundColor': '#fff'
              },
              {
                'border': '1px solid #1b7470',
                'backgroundColor': '#fff'
              }
            ]"
            :tooltip-style="[
              {
                'backgroundColor': '#9ad9d6',
                'borderColor': '#9ad9d6'
              },
              {
                'backgroundColor': '#1b7470',
                'borderColor': '#1b7470'
              }
            ]"
            :process-style="{
              'backgroundImage': '-webkit-linear-gradient(left, #9ad9d6, #1b7470)'
            }"></vue-slider>
        </div>
      </search-filter>

      <search-filter name="Đánh giá của khách hàng"
        :class="{ active: active === 'rating', 'has-filter': filter.rating }"
        @toggle="toggleActive('rating')"
        @submit="submit"
        @cancel="removeFilter({ rating: '' })">
        <div class="list">
          <label class="item" v-for="(name, value) in ratings">
            <div class="tp-checkbox"><input type="radio" v-model="filter.rating" :value="value"><span></span></div>
            <div class="name">{{ name }}</div>
          </label>
        </div>
      </search-filter>

      <!-- <div class="item-filter view-more" :class="{ active: active === 'more' }">
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
      </div> -->
    </div>
  </div>
</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { isArray, merge } from 'lodash'
import { default as numeral } from 'numeral'
import VueSlider from 'vue-slider-component'
const SearchFilter = () => import(/* webpackChunkName: "search-bundle" */ './Filter')
const FilterItems = () => import(/* webpackChunkName: "search-bundle" */ './FilterItems')

const RATINGS = {
  lt1: 'Rất tồi: dưới 1 điểm',
  gte1_lt2: 'Kém: 1 điểm trờ lên',
  gte2_lt3: 'Tạm được: 2 điểm trở lên',
  gte3_lt4: 'Tốt: 3 điểm trở lên',
  gte4_lt5: 'Tuyệt vời: 4 điểm trở lên',
  null: 'Chưa có đánh giá'
}

export default {
  name: 'SearchFilters',
  components: {
    SearchFilter,
    FilterItems,
    VueSlider
  },
  computed: {
    ...mapGetters(['searchFilters']),
    ...mapState({
      amenities: state => state.preloadData.amenities || [],
      chemicals: state => state.preloadData.chemicals || []
    }),
    hasPriceFilter () {
      return ((this.$route.query.min_price > -1) && (this.$route.query.max_price > 0))
    }
  },
  data () {
    return {
      active: '',
      ratings: RATINGS,
      filter: {
        amenities: [],
        chemicals: [],
        rating: '',
        price: []
      }
    }
  },
  mounted () {
    this.updateFilter()
  },
  watch: {
    '$route': 'updateFilter'
  },
  methods: {
    toggleActive (active) {
      if (!this.active || this.active !== active) {
        this.active = active
      } else {
        this.active = ''
      }

      this.$nextTick(() => this.$refs.priceRange.refresh())
    },
    removeFilter (filter) {
      this.filter = merge(this.filter, filter)
      this.submit()
      this.active = ''
    },
    updateFilter () {
      let minPrice = this.$route.query.min_price || 0
      let maxPrice = this.$route.query.max_price || 300

      this.filter.amenities = this.normalizeArrayFilter(this.$route.query.amenities)
      this.filter.chemicals = this.normalizeArrayFilter(this.$route.query.chemicals)
      this.filter.rating = this.$route.query.rating || ''
      this.filter.price = [minPrice, maxPrice]
    },
    normalizeArrayFilter (value) {
      if (!value) {
        return []
      }

      return isArray(value) ? value : Array(value)
    },
    submit () {
      // const query = merge(this.$route.query, this.filter)
      const query = this.filter
      const [minPrice, maxPrice] = this.filter.price
      delete query.price

      if (minPrice > -1) {
        query.min_price = minPrice
      }
      if (maxPrice > -1) {
        query.max_price = maxPrice
      }
      if (this.$route.query.q) {
        query.q = this.$route.query.q
      }
      if (this.$route.query.l) {
        query.l = this.$route.query.l
      }
      if (this.$route.query.city_id) {
        query.city_id = this.$route.query.city_id
      } else if (this.$route.query.area_id) {
        query.area_id = this.$route.query.area_id
      }
      if (this.$route.query.category_id) {
        query.category_id = this.$route.query.category_id
      }

      this.$bus.$emit('searchSubmitted')
      this.$bus.$emit('advanceSearchSubmitted')

      this.$router.push({ name: 'search', query })
      this.active = ''
    },
    formatPrice (value) {
      const price = value * 10000
      return `${numeral(price).format('0,0')} đ`
    }
  }
}
</script>

<style scoped>
.price-filter {
  padding: 50px 15px;
}
</style>

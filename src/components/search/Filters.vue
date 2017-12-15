<template>
<div class="sub-container">
  <div class="container-inner">
    <div class="title-filter">Bộ lọc:</div>
    <div class="list-filter">
      <search-filter name="Hoá chất"
        :class="{ active: active === 'chemicals' }"
        @toggle="toggleActive('chemicals')"
        @submit="submit"
        @cancel="active = ''">
        <label class="item" v-for="chemical in chemicals"
          :key="chemical.id">
          <div class="tp-checkbox"><input type="checkbox" v-model="filter.chemicals" :value="chemical.id"><span></span></div>
          <div class="name">{{ chemical.name }}</div>
        </label>
      </search-filter>

      <search-filter name="Tiện ích"
        :class="{ active: active === 'amenities' }"
        @toggle="toggleActive('amenities')"
        @submit="submit"
        @cancel="active = ''">
        <label class="item" v-for="amenity in amenities"
          :key="amenity.id">
          <div class="tp-checkbox"><input type="checkbox" v-model="filter.amenities" :value="amenity.id"><span></span></div>
          <div class="name">{{ amenity.name }}</div>
        </label>
      </search-filter>

      <search-filter name="Giá dịch vụ"
        :class="{ active: active === 'price' }"
        @toggle="toggleActive('price')"
        @submit="submit"
        @cancel="active = ''">
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
      </search-filter>

      <search-filter name="Đánh giá của khách hàng"
        :class="{ active: active === 'rating' }"
        @toggle="toggleActive('rating')"
        @submit="submit"
        @cancel="active = ''">
        <label class="item" v-for="(name, value) in ratings">
          <div class="tp-checkbox"><input type="radio" v-model="filter.rating" :value="value"><span></span></div>
          <div class="name">{{ name }}</div>
        </label>
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
// import { merge } from 'lodash'
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
    FilterItems
  },
  computed: {
    ...mapGetters(['searchFilters']),
    ...mapState({
      amenities: state => state.preloadData.amenities || [],
      chemicals: state => state.preloadData.chemicals || []
    })
  },
  data () {
    return {
      active: '',
      ratings: RATINGS,
      filter: {
        amenities: [],
        chemicals: [],
        rating: ''
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
    },
    updateFilter () {
      this.filter.amenities = this.$route.query.amenities || []
      this.filter.chemicals = this.$route.query.chemicals || []
      this.filter.rating = this.$route.query.rating || ''
    },
    submit () {
      // const query = merge(this.$route.query, this.filter)
      const query = this.filter

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
    }
  }
}
</script>

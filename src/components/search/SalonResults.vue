<template>
<div class="salons" v-if="salons.length">
  <div class="sub-container">
    <div class="ofhd">
      <div class="list">
        <div class="item" v-for="salon in salons" :key="salon.id"
          :class="{ unverified: !salon.verified }">
          <div class="tp-img-slide">
            <div v-if="salon.verified"  class="slide-salon">
              <div><router-link :to="{ name: 'salon', params: { id: salon.slug } }"><img :src="salon.image_url" /></router-link></div>
            </div>
            <div v-else class="slide-salon">
              <div><img src="../../assets/images/verified.jpg"></div>
            </div>
            <div class="utilities" v-if="salon.verified && salon.amenities">
              <i v-for="amenity in salon.amenities" :key="amenity.id"
                :class="amenity.icon"
                v-b-tooltip.hover.auto :title="amenity.name"></i>
            </div>
          </div>
          <div class="info">
            <div class="name-adress">
              <h3><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></h3>
              <p>{{ salon.address }}</p>
              <div class="tp-view">
                <div class="viewing"><i class="bz-check"></i><span>Đang có 10 người xem</span></div>
                <div class="viewed"><i class="bz-eye"></i><span>688</span></div>
              </div>
            </div>
            <div class="price-rate">
              <div class="price" :class="{ 'sale-off': false }">
                <span>From <b v-if="false">290.000 VND</b></span>
                <strong>{{ salon.min_price.formatted_price }}</strong>
              </div>
              <div class="rate" v-if="salon.verified">
                <div class="tp-rate">
                  <stars :rating="salon.average_rating">
                    <div class="number" v-if="salon.average_rating">{{ salon.average_rating | numberFormat('0.0') }} - {{ salon.rating_summary }}</div>
                  </stars>
                  <div class="rate-status">{{ salon.review_count }} Đánh giá</div>
                </div>
              </div>
              <div v-if="!salon.verified" class="action-unverified">
                <div class="btn-action">
                  <i class="bz-phone2"></i>
                  <span>Gọi salon</span>
                </div>
              </div>
              <div v-if="!salon.verified" class="action-unverified">
                <div class="btn-action">
                  <i class="bz-like"></i>
                  <span>1.240 Votes</span>
                </div>
              </div>
              <div v-if="!salon.verified" class="action-unverified">
                <div class="btn-action">
                  <i class="bz-note"></i>
                  <span>Bạn là chủ salon?</span>
                </div>
              </div>
              <div v-if="!salon.verified" class="tp-unverified">
                <div class="child">
                  <div class="des"><strong>Gọi trực tiếp</strong> cho salon để book lịch hẹn.</div>
                  <div class="btn-action">
                    <i class="bz-phone2"></i>
                    <span>Gọi salon</span>
                  </div>
                </div>
                <div class="child">
                  <div class="des">Bạn thích thương hiệu này? <strong>Vote</strong> để ủng hộ thương hiệu nào!</div>
                  <div class="btn-action">
                    <i class="bz-like"></i>
                    <span>1.240</span>
                  </div>
                </div>
                <div class="child">
                  <div class="des">Đây là thương hiệu của bạn? Có <strong>1.204</strong> người đang quan tâm tới bạn. Kết nối ngay thôi</div>
                  <div class="btn-action">
                    <i class="bz-note"></i>
                    <span>Đăng ký</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <infinite-loading
        @infinite="onInfinite"
        spinner="waveDots"
        ref="infiniteLoading">
        <span slot="no-more">
          Không tìm thấy thêm kết quả
        </span>
        <span slot="no-results">
          Không tìm thấy thêm kết quả
        </span>
      </infinite-loading>
    </div>
  </div>
</div>
</template>

<script>
import { merge } from 'lodash'
import InfiniteLoading from 'vue-infinite-loading'
import Stars from '../partials/StarRating'

export default {
  name: 'SalonResults',
  components: {
    InfiniteLoading,
    Stars
  },
  data () {
    return {
      salons: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  mounted () {
    this.fetchData({}, ({ data }) => {
      this.salons = data.data
      this.meta = data.meta
    })
  },
  watch: {
    $route () {
      this.fetchData({}, ({ data }) => {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        this.salons = data.data
        this.meta = data.meta
      })
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params = merge(query, params)
      this.$http.get('search/salons', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite ($state) {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.salons = this.salons.concat(data.data)
        this.meta = data.meta
        if (data.data.length) {
          $state.loaded()
        } else {
          $state.complete()
        }
      })
    }
  }
}
</script>

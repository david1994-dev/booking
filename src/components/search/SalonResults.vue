<template>
<div class="salons" v-if="salons.length">
  <div class="sub-container">
    <div class="ofhd">
      <div class="list">
        <div class="item" v-for="salon in salons" :key="salon.id">
          <figure><router-link :to="{ name: 'salon', params: { id: salon.slug } }"><img :src="salon.image_url" /></router-link></figure>
          <div class="info">
            <div class="name-adress">
              <h3><figure><router-link :to="{ name: 'salon', params: { id: salon.slug } }">{{ salon.name }}</router-link></figure></h3>
              <p>{{ salon.address }}</p>
            </div>
            <div class="price-rate">
              <div class="price">
                <span>From</span>
                <strong>324.000 VND</strong>
              </div>
              <div class="rate">
                <div class="tp-rate">
                  <div class="rate-status">{{ salon.rating_summary }}</div>
                  <stars :rating="salon.average_rating">
                    <div class="number">{{ salon.rating_count }} Đánh giá</div>
                  </stars>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <infinite-loading
        :on-infinite="onInfinite"
        spinner="waveDots"
        ref="infiniteLoading">
        <span slot="no-more">
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
    onInfinite () {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.salons = this.salons.concat(data.data)
        this.meta = data.meta
        this.$refs.infiniteLoading.$emit(data.data.length ? '$InfiniteLoading:loaded' : '$InfiniteLoading:complete')
      })
    }
  }
}
</script>

<template>
<div class="salons">
  <div class="sub-container">
    <div class="ofhd">
      <div class="list">
        <div class="item" v-for="salon in salons">
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
                  <div class="rate-status">Rất tốt</div>
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
            </div>
          </div>
        </div>
      </div>
      <infinite-loading
        :on-infinite="onInfinite"
        spinner="waveDots"
        ref="infiniteLoading"></infinite-loading>
    </div>
  </div>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
import { merge } from 'lodash'

export default {
  name: 'SalonResults',
  components: { InfiniteLoading },
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
  watch: {
    $route () {
      this.fetchData({}, ({ data }) => {
        this.$nextTick(() => {
          this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
        })
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

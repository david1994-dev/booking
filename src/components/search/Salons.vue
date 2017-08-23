<template>
<div class="searchsalon-page">
  <div class="box-salons">
    <div class="tp-salon" v-for="salon in salons">
      <div class="img-price">
        <figure><a href="#"><img :src="salon.image_url"></a></figure>
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
      <salon :salon="salon" />
    </div>
    <infinite-loading
      :on-infinite="onInfinite"
      spinner="waveDots"
      ref="infiniteLoading"></infinite-loading>
  </div>

  <div class="wrap-maps">
    <div class="maps">
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14898.810853108052!2d105.83973442957765!3d21.004550734680084!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x499b8b613889f78a!2zVHLGsOG7nW5nIMSR4bqhaSBo4buNYyBYw6J5IEThu7FuZw!5e0!3m2!1svi!2s!4v1503242496769" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
    </div>
  </div>
</div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
const Salon = () => import(/* webpackChunkName: "search-bundle" */ './Salon')
import { merge } from 'lodash'

export default {
  name: 'SearchSalons',
  components: {
    Salon,
    InfiniteLoading
  },
  data () {
    return {
      salons: [],
      meta: {
        pagination: {}
      }
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData (query, cb, errCb) {
      // Error here
      const routeQuery = Object.assign({}, this.$route.query)
      const params = merge(query, routeQuery)
      params._meta = 1
      this.$http.get('search', { params })
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

<style scoped>
.times-placeholder {
  padding: 0 19px 0;
}
</style>

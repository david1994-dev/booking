<template>
<div>
  <page-header />
  <div class="stylists-page">
    <div class="tp-bigcontainer">
      <h1 class="tp-pagetitle">Stylist</h1>
      <div class="content-page">
        <div class="stylists">
          <div class="stylist-item" v-for="stylist in stylists" :key="stylist.id">
            <div class="avata-info">
              <figure> <a href="#"><img :src="stylist.avatar_url"></a> </figure>
              <div class="info">
                <h2><a href="#">{{ stylist.name }}</a></h2>
                <div class="salon-name">Salon tóc dài</div>
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
            <div class="images">
              <!-- Thay images-stylist-id bằng id (images-stylist-123) của stylist để dùng thư viện fancybox -->
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big.jpg"><img src="../assets/images/image-stylists.jpg"></a></figure>
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big-2.jpg"><img src="../assets/images/image-stylists-2.jpg"></a></figure>
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big.jpg"><img src="../assets/images/image-stylists.jpg"></a></figure>
              <figure><a data-fancybox="images-stylist-id" href="../assets/images/image-stylists-big-2.jpg"><img src="../assets/images/image-stylists-2.jpg"></a></figure>
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
</div>
</template>

<script>
import { merge } from 'lodash'
import { parseSearchQuery } from '@/utils/mixins'
import InfiniteLoading from 'vue-infinite-loading'
import PageHeader from './layout/Header'

export default {
  name: 'Stylists',
  components: {
    PageHeader,
    InfiniteLoading
  },
  mixins: [parseSearchQuery],
  metaInfo: {
    title: 'Stylists'
  },
  mounted () {
    this.setSearchData()
  },
  watch: {
    '$route': 'setSearchData'
  },
  data () {
    return {
      stylists: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = this.$route.query
      params._meta = 1
      params.limit = 6
      params = merge(query, params)
      this.$http.get('search/stylists', { params })
        .then(response => cb(response))
        .catch(error => errCb ? errCb(error) : null)
    },
    onInfinite () {
      this.fetchData({ page: parseInt(this.meta.pagination.current_page) + 1 }, ({ data }) => {
        this.stylists = this.stylists.concat(data.data)
        this.meta = data.meta
        this.$refs.infiniteLoading.$emit(data.data.length ? '$InfiniteLoading:loaded' : '$InfiniteLoading:complete')
      })
    }
  }
}
</script>

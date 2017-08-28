<template>
<div class="rate-d">
  <div class="title">
    <div class="name">{{ salon.review_count }} Đánh giá</div>
    <div class="stars">
      <i class="bz-star"></i>
      <i class="bz-star"></i>
      <i class="bz-star"></i>
      <i class="bz-star"></i>
      <i class="bz-star"></i>
    </div>
  </div>
  <v-loading loader="fetching reviews">
    <template slot="spinner">
      <div class="text-center">
        <v-loading-spinner height="30px" width="30px" />
      </div>
    </template>

    <div class="list">
      <div class="item" v-for="review in reviews" :key="review.id">
        <div class="info-rate">
          <figure><img src="../../assets/images/image-stylist.jpg"></figure>
          <div class="info">
            <div class="name">{{ review.user.name }}</div>
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
        <div class="content-rate">{{ review.review.content }}</div>
      </div>
    </div>
  </v-loading>

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
</template>

<script>
import { merge } from 'lodash'

export default {
  name: 'SalonReviews',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      reviews: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      }
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchData({}, ({ data }) => {
      this.reviews = data.data
      this.meta = data.meta
    })
  },
  created () {
    this.fetchData({}, ({ data }) => {
      this.reviews = data.data
      this.meta = data.meta
    })
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = merge(query, params)
      params._meta = 1
      this.$startLoading('fetching reviews')
      this.$http.get(`salons/${this.salon.id}/reviews`, { params })
        .then(response => {
          this.$endLoading('fetching reviews')
          cb(response)
        })
        .catch(error => {
          this.$endLoading('fetching reviews')
          errCb ? errCb(error) : null
        })
    }
  }
}
</script>

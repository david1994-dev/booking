<template>
<div class="rate-d">
  <div class="title">
    <div class="name">{{ salon.review_count }} Đánh giá</div>
    <div class="tp-rate">
      <stars v-if="salon.average_rating" :rating="salon.average_rating" />
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
              <div class="tp-rate">
                <stars :rating="review.review.rating" />
              </div>
            </div>
          </div>
        </div>
        <div class="content-rate">{{ review.review.content }}</div>
      </div>
    </div>
  </v-loading>

  <div class="paging">
    <paginate
      :click-handler="paginateReviews"
      :page-count="meta.pagination.total_pages"
      prev-class="prev"
      next-class="prev">
    </paginate>
  </div>
</div>
</template>

<script>
import { merge } from 'lodash'
import Stars from '../partials/StarRating'
import Paginate from 'vuejs-paginate'

export default {
  name: 'SalonReviews',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  components: {
    Stars,
    Paginate
  },
  data () {
    return {
      reviews: [],
      meta: {
        pagination: {
          current_page: 0,
          total_pages: 0
        }
      },
      paginate: ['reviews']
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.fetchData({}, ({ data }) => {
      this.reviews = data.data
      this.meta = data.meta
    })
  },
  mounted () {
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
      this.$http.get(`salons/${this.$route.params.id}/reviews`, { params })
        .then(response => {
          this.$endLoading('fetching reviews')
          cb(response)
        })
        .catch(error => {
          this.$endLoading('fetching reviews')
          errCb ? errCb(error) : null
        })
    },
    paginateReviews (page) {
      this.fetchData({ page }, ({ data }) => {
        this.reviews = data.data
        this.meta = data.meta
      })
    }
  }
}
</script>

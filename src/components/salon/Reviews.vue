<template>
<div class="rate-d">
  <div class="title">
    <div class="name">{{ $t('common.rates',{'rates':salon.review_count}) }}</div>
    <div class="tp-rate">
      <stars v-if="salon.average_rating" :rating="salon.average_rating_rounded" />
    </div>
  </div>
  <v-loading loader="fetching reviews">
    <template slot="spinner">
      <div class="text-center">
        <v-loading-spinner height="30px" width="30px" />
      </div>
    </template>

    <div class="list">
      <review  v-for="review in reviews"
      :key="review.id"
      :review="review"></review>
    </div>
  </v-loading>

  <div class="paging" v-if="reviews.length">
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
const Review = () => import(/* webpackChunkName: "salon-bundle" */ '../partials/Review')
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
    Review,
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
  mounted () {
    this.fetchData({}, ({ data }) => {
      this.reviews = data.data
      this.meta = data.meta
    })
  },
  watch: {
    salon () {
      this.fetchData({}, ({ data }) => {
        this.reviews = data.data
        this.meta = data.meta
      })
    }
  },
  methods: {
    fetchData (query, cb, errCb) {
      let params = merge(query, params)
      params._meta = 1
      params.limit = 5
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
    },
    paginateReviews (page) {
      this.fetchData({ page }, ({ data }) => {
        this.reviews = data.data
        this.meta = data.meta
        document.getElementById('mennu-reviews').click()
      })
    }
  }
}
</script>

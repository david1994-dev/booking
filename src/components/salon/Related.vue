<template>
<div class="related">
  <div class="title-related">
    <div class="title">Có thể bạn quan tâm</div>
    <div class="control">
      <div class="tp-control small">
        <div class="btn prev" id="prevRelate" @click="prev"></div>
        <div class="btn next" id="nextRelate" @click="next"></div>
      </div>
    </div>
  </div>

  <div class="related-slide" v-if="salons.length">
    <slick class="slide-inner" ref="slick" :options="slickOptions">
      <div v-for="salon in salons" :key="salon.id">
        <salon :salon="salon" :category="randomCategory(salon.services)" />
      </div>
    </slick>
  </div>
</div>
</template>

<script>
import { head } from 'lodash'
import Slick from 'vue-slick'
import store from 'store2'
import Stars from '../partials/StarRating'
const Salon = () => import(/* webpackChunkName: "salon-bundle" */ '../partials/SalonCard')

export default {
  name: 'SalonRelated',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  components: {
    Slick,
    Stars,
    Salon
  },
  data () {
    return {
      salons: [],
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        infinite: false,
        draggable: false,
        swipe: false,
        // autoplay: true,
        prevArrow: document.getElementById('prevRelate'),
        nextArrow: document.getElementById('nextRelate'),
        responsive: [
          {
            breakpoint: 5000,
            settings: {
              variableWidth: true
            }
          },
          {
            breakpoint: 480,
            settings: {
              variableWidth: false
            }
          }
        ],
        accessibility: false
      }
    }
  },
  created () {
    this.fetchData()
  },
  beforeUpdate () {
    if (this.$refs.slick) {
      this.$refs.slick.destroy()
    }
  },
  updated () {
    if (this.$refs.slick && !this.$refs.slick.$el.classList.contains('slick-initialized')) {
      this.$refs.slick.create()
    }
  },
  watch: {
    'salon': 'fetchData'
  },
  methods: {
    fetchData () {
      const categories = this.getCategory()
      const params = {
        includes: 'services,stylists'
      }

      if (categories) {
        params.categories = categories
      }

      this.$startLoading('fetching related')
      this.$http.get(`salons/${this.salon.id}/related`, { params }).then(({ data }) => {
        this.salons = data
        this.$endLoading('fetching related')
      }).catch(() => this.$endLoading('fetching related'))
    },
    getCategory () {
      const cart = store.get('cart', {})
      return parseInt(cart.category)
    },
    randomCategory (services) {
      const categories = this.getCategory()

      if (categories) {
        return categories
      }

      if (services.length) {
        return head(services).category_id
      }

      return 0
    },
    next () {
      this.$refs.slick.next()
    },
    prev () {
      this.$refs.slick.prev()
    }
  }
}
</script>

<template>
<div class="slide">
  <slick class="slide-inner" ref="slick" :options="slickOptions">
    <div v-for="image in images" :key="image.id"><img :src="image.url" /></div>
    <!-- <div><img src="../../assets/images/image-slide.jpg" /></div>
    <div><img src="../../assets/images/image-slide.jpg" /></div>
    <div><img src="../../assets/images/image-slide.jpg" /></div> -->
  </slick>
  <div class="control">
    <div class="tp-control">
      <div class="btn prev" id="prevCover" @click="prev"></div>
      <div class="btn next" id="nextCover" @click="next"></div>
    </div>
  </div>
</div>
</template>

<script>
import Slick from 'vue-slick'

export default {
  name: 'SalonCovers',
  props: {
    images: {
      type: Array,
      default () { return [] }
    }
  },
  components: {
    Slick
  },
  watch: {
    images () {
      this.$refs.slick.reSlick()
    }
  },
  data () {
    return {
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        infinite: false,
        // autoplay: true,
        prevArrow: document.getElementById('prevCover'),
        nextArrow: document.getElementById('nextCover')
        // prevArrow: $('#prevCover'),
        // nextArrow: $('#nextCover')
      }
    }
  },
  methods: {
    next () {
      this.$refs.slick.next()
    },
    prev () {
      this.$refs.slick.prev()
    }
  }
}
</script>

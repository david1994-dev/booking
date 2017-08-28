<template>
<div class="slide">
  <slick class="slide-inner" ref="slick" :options="slickOptions">
    <!-- <div v-for="image in images"><img :src="image.url" /></div> -->
    <div><img src="../../assets/images/image-slide.jpg" /></div>
    <div><img src="../../assets/images/image-slide.jpg" /></div>
  </slick>
  <div class="control">
    <div class="prev" ref="prevCover" id="prevCover"></div>
    <div class="next" ref="nextCover" id="nextCover"></div>
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
  data () {
    return {
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        infinite: true,
        // autoplay: true,
        prevArrow: document.getElementById('prevCover'),
        nextArrow: document.getElementById('nextCover')
        // prevArrow: this.$refs.prevCover,
        // nextArrow: this.$refs.nextCover
      }
    }
  }
}
</script>

<template>
<div class="slide">
  <slick class="slide-inner" ref="slick" @init="$bus.$emit('coverSliderInit')" :options="slickOptions">
    <div v-for="image in photos"
      :key="image.id"><img :src="image.url" /></div>
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
const IMAGES = [{
  id: -1,
  url: require('../../assets/images/image-slide.jpg')
}]

export default {
  name: 'SalonCovers',
  props: {
    images: {
      type: Array,
      default () { return IMAGES }
    }
  },
  components: {
    Slick
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
    images (value) {
      if (!value.length) {
        this.photos = IMAGES
      } else {
        this.photos = value
      }
    }
  },
  data () {
    return {
      photos: this.images.length ? this.images : IMAGES,
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        // autoplay: true,
        prevArrow: document.getElementById('prevCover'),
        nextArrow: document.getElementById('nextCover')
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

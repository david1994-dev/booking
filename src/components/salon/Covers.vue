<template>
<div class="slide">
  <slick class="slide-inner" ref="slick" @init="$bus.$emit('coverSliderInit')" :options="slickOptions">
    <div v-for="image in images"
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
  data () {
    return {
      slickOptions: {
        speed: 300,
        slidesToShow: 1,
        // autoplay: true,
        prevArrow: document.getElementById('prevCover'),
        nextArrow: document.getElementById('nextCover'),
        accessibility: false
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

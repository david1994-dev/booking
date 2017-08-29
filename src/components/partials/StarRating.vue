<template>
<div class="stars-number">
  <div class="stars" v-show="ratingClass" :class="ratingClass">
    <i class="bz-star"></i>
    <i class="bz-star"></i>
    <i class="bz-star"></i>
    <i class="bz-star"></i>
    <i class="bz-star"></i>
  </div>
  <slot></slot>
</div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    rating: Number
  },
  computed: {
    ratingClass () {
      if (this.rating === undefined) {
        return ''
      }

      const rating = Math.ceil(this.rating * 10)

      return `star-${rating}`
    }
  }
}
</script>

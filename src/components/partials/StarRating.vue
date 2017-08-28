<template>
<div class="stars" :class="ratingClass">
  <i class="bz-star"></i>
  <i class="bz-star"></i>
  <i class="bz-star"></i>
  <i class="bz-star"></i>
  <i class="bz-star"></i>
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
      if (!this.rating) {
        return ''
      }

      const rating = Math.ceil(this.rating * 10)

      return `star-${rating}`
    }
  }
}
</script>

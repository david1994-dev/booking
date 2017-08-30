<template>
<div class="images-d" v-if="salon.gallery">
  <div class="title">{{ salon.gallery.length }} Hình ảnh</div>
  <div class="list">
    <div class="item images-more" v-for="(image, index) in items"
      :key="image.id">
        <!-- <span class="number">+336</span> -->
      <img :src="image.thumb" @click="$preview.open(index, items, options)"
        class="preview-img" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SalonGallery',
  props: {
    salon: {
      type: Object,
      required: true
    }
  },
  computed: {
    items () {
      const items = []
      this.salon.gallery.map(image => {
        items.push({
          id: image.id,
          w: image.width,
          h: image.height,
          src: image.url,
          msrc: image.template_url.replace('{size}', 'large'),
          thumb: image.template_url.replace('{size}', 'square128')
        })
      })

      return items
    }
  },
  data () {
    return {
      options: {
        fullscreenEl: true,
        zoomEl: true,
        shareEl: false
      }
    }
  },
  methods: {
    //
  }
}
</script>

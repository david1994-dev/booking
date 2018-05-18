<template>
<div class="images-d" v-if="salon.gallery">
  <div class="title text-uppercase">{{ $t('salon.salon_photos',{'photos':salon.gallery.length}) }}</div>
  <div class="list">
    <div class="item pointer" v-for="(image, index) in items"
      :key="image.id">
        <!-- <span class="number">+336</span> -->
      <img :src="image.thumb" @click="$photoswipe.open(index, items, options)"
        class="preview-img" />
      <div class="time">{{ image.created_at | dateFormat('MMM DD, YYYY') }}</div>
    </div>
  </div>
</div>
</template>

<script>
import $ from 'jquery'

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
          thumb: image.template_url.replace('{size}', 'square128'),
          created_at: image.created_at
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
  mounted () {
    this.$nextTick(() => {
      this.collapseImages()
    })
  },
  methods: {
    collapseImages () {
      const $list = $('.images-d .list')
      const addActive = () => {
        const wrapWidth = $list.width()
        const itemWidth = $list.find('.item').outerWidth()
        const $items = $list.find('.item')
        let active = parseInt(wrapWidth / itemWidth) * 2

        $items.removeClass('images-more')
        $items.find('.number').remove()

        if ($items.length > active) {
          $items.eq(active - 1).addClass('images-more').prepend('<div class="number">+' + ($items.length - active + 1) + '</div>')
        }

        $.each($items, (key, val) => {
          if (key < active) {
            $(val).show()
          } else {
            $(val).hide()
          }
        })
      }

      $(window).resize(() => addActive())
      addActive()
    }
  }
}
</script>

<template>
<div class="item">
  <div class="info-rate">
    <figure><img :src="review.user.avatar_url"></figure>
    <div class="info">
      <div class="name">{{ review.user.name }}</div>
      <div class="date-stars">
        <div class="date">{{ review.review.created_at | dateFormat('HH:mm DD-MM-YYYY') }}</div>
        <div class="tp-rate">
          <stars :rating="parseFloat(review.review.rating)" />
        </div>
      </div>
    </div>
  </div>
  <div class="content-rate">{{ review.review.content }}</div>
  <a class="pointer" style="color:#54B2B0;font-size: 12px;" @click="translateLang(review.review.content, $event)">{{ $t('salon.see_translations') }}</a>
  <p v-if="translateText" class="translation-text" style="font-size: 14px; margin-top: 5px;">{{ translateText }}</p>
</div>
</template>

<script>
import Stars from '../partials/StarRating'

export default {
  props: {
    review: {
      required: true,
      type: Object
    }
  },
  components: {
    Stars
  },
  data () {
    return {
      translateText: ''
    }
  },
  methods: {
    translateLang (text, event) {
      this.$http.post('translate', { text: text }).then(({ data }) => {
        event.target.style.display = 'none'
        this.translateText = data.translation
      })
    }
  }
}
</script>

<template>
<div class="tp-blogitem">
  <figure><router-link :to="{ name: 'blog', params: { id: blog.slug } }"><img :src="blog.image_url" /></router-link></figure>
  <div class="info">
    <h2><router-link :to="{ name: 'blog', params: { id: blog.slug } }">{{ blog.title }}</router-link> </h2>
    <div class="des">{{ blog.intro }}</div>
    <div class="view-more"><router-link :to="{ name: 'blog', params: { id: blog.slug } }">{{ $t('common.see_more') }}</router-link></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'BlogCard',
  props: {
    blog: {
      type: Object,
      required: true
    }
  }
}
</script>

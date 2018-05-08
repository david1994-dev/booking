<template>
  <div class="video-feature-list" v-if="item.title">
    <div class="img" v-if="item.image_url">
      <a href="javascript:;" data-fancybox="" data-type="iframe" :data-src="item.video_url">
        <img :src="item.image_url">
      </a>
    </div>
    <div class="name">
      <a href="javascript:;" data-fancybox="" data-type="iframe" :data-src="item.video_url">
        {{item.title}}
      </a>
    </div>
    <div class="time">{{item.category}} - {{item.created_at}}, đăng bởi {{item.author}}</div>
  </div>
</template>

<script>
  export default {
    name: 'hotVideo',
    props: {
      item: {
        type: Object,
        default: {
          video_url: null,
          image_url: null,
          title: null,
          author: null,
          created_at: null,
          category: null
        }
      }
    }
  }
</script>

<template>
  <div>
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
      <div class="time"><span class="text-capitalize">{{item.category}}</span> - {{ moment(item.created_at).fromNow() }}, đăng bởi {{item.author}}</div>
    </div>

    <div class="ads-full" v-if="ads.center_1_1">
      <a :href="ads.center_1_1.link"><img :src="ads.center_1_1.image_url"/></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hotVideo',
    props: {
      ads: {
        type: Object,
        default: {}
      },
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
    },
    data () {
      return {}
    },
    created () {

    },
    watch: {
      items: function (val) { // tried to watch currPost for changes
        console.log('never triggered', val)
      }
    },
    methods: {}
  }
</script>

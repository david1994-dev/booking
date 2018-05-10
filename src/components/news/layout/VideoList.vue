<template>
  <div class="news-seciton">
    <div class="tp-title">
      <h2 class="main-title"><a href="#"></a>{{text || ''}}</h2>
      <router-link class="view-more" :to="{ name: routeName , params: routeParams }">
        <span>xem thêm</span><i class="bz-next"></i>
      </router-link>
    </div>
    <div class="video-section">
      <div class="video-feature" v-if="items.first">
        <div class="img">
          <a href="javascript:;" v-if="items.first.video_url"  data-fancybox data-type="iframe" :data-src="items.first.video_url">
            <img :src="items.first.image_url"/>
          </a>
        </div>
        <div class="info">
          <div class="name">
            <a href="javascript:;" v-if="items.first.title"  data-fancybox data-type="iframe" :data-src="items.first.video_url">
              {{items.first.title}}
            </a>
          </div>
          <div class="time" v-if="items.first.category">{{ items.first.category }} - {{ moment(items.first.created_at).fromNow() }}, đăng bởi {{ items.first.author }}</div>
        </div>
      </div>
      <div class="list" v-if="items.items && items.items.length > 0">
        <div class="item" v-for="item in items.items" :key="item.id">
          <div class="img"><a href="javascript:;" data-fancybox data-type="iframe" :data-src="item.video_url">
            <img :src="item.image_url"/>
          </a>
          </div>
          <div class="name"><a href="javascript:;" data-fancybox data-type="iframe" :data-src="item.video_url">
            {{item.title}} <i class="bz-video-camera icon-camera"></i></a>
          </div>
          <div class="time">{{ item.category }} - {{ moment(item.created_at).fromNow() }}, đăng bởi {{ item.author }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import '@fancyapps/fancybox'
  import '@fancyapps/fancybox/dist/jquery.fancybox.min.css'

  export default {
    name: 'videoList',
    props: {
      text: {
        type: String,
        default: ''
      },
      routeName: {
        type: String,
        default: ''
      },
      routeParams: {
        type: Object,
        default: {}
      },
      items: {
        type: Object,
        default: {
          first: {},
          news: []
        }
      }
    },
    data () {
      return {

      }
    },
    created () {

    },
    methods: {

    }
  }
</script>

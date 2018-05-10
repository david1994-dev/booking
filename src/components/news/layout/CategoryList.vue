<template>
  <div class="news-seciton" v-if="items.first">
    <div class="tp-title">
      <h2 class="main-title"><a href="#"></a>{{text || ''}}</h2>
      <router-link class="view-more" :to="{ name: routeName, params: routeParams }">
        <span>xem thêm</span><i class="bz-next"></i>
      </router-link>
    </div>

    <div class="cate-feature" v-if="items.first && items.first">
      <div class="img">
        <router-link :to="{ name: 'new', params: { id: items.first.slug } }">
          <img :src="items.first.image_url"/>
        </router-link>
      </div>
      <div class="info">
        <div class="name">
          <router-link :to="{ name: 'new', params: { id: items.first.slug } }">
            {{ items.first.title}}
          </router-link>
        </div>
        <div class="creat-by">{{items.first.category}} - {{ moment(items.first.created_at).fromNow() }}, đăng bởi {{ items.first.author}}</div>
        <div class="des" v-if="items.first.intro.length<190">Welcome, {{ items.first.intro }}</div>
        <div class="des" v-if="items.first.intro.length>=190">Welcome, {{ items.first.intro.substring(0,190)+".." }}
        </div>
      </div>
    </div>
    <div class="tp-list" v-if="items.items && items.items.length > 0">
      <router-link v-for="item in items.items" :key="item.id" :to="{ name: 'new', params: { id: item.slug } }">
        {{ item.title}}
      </router-link>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'categoryList',
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
    methods: {}
  }
</script>

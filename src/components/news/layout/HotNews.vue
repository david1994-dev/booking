<template>
  <div class="hot-news-ads">
    <div class="news-feature" v-if="items.first">
      <div class="img">
        <router-link :to="{ name: 'new', params: { id: items.first.slug } }">
          <img :src="items.first.image_url"/>
        </router-link>
      </div>
      <div class="name">
        <router-link :to="{ name: 'new', params: { id: items.first.slug } }">
          {{ items.first.title}}
        </router-link>
      </div>
      <div class="des" v-if="items.first.intro.length<200">Welcome, {{ items.first.intro }}</div>
      <div class="des" v-if="items.first.intro.length>=200">Welcome, {{ items.first.intro.substring(0,200)+".." }}</div>
    </div>
    <div class="ads-1" v-if="items.second">
      <div class="img">
        <router-link :to="{ name: 'new', params: { id: items.second.slug } }">
          <img :src="items.second.second_image_url"/>
        </router-link>
      </div>
      <div class="name">
        <router-link :to="{ name: 'new', params: { id: items.second.slug } }">
          {{ items.second.title}}
        </router-link>
      </div>
    </div>
    <div class="list" v-if="items.items.length > 0">
      <router-link class="item" v-for="item in items.items" :key="item.id" :to="{ name: 'new', params: { id: item.slug } }">
        <div class="img"><img src="../../../assets/news/images/img-thumb-1.jpg"/></div>
        <div class="info">
          <div class="name">
            {{ item.title }}
          </div>
          <!--<div class="time">2h trước</div>-->
        </div>
      </router-link>
    </div>
    <div class="ads-2" v-if="ads.center_1_2"> <a :href="ads.center_1_2.link"><img :src="ads.center_1_2.image_url"/></a></div>

    <div class="ads-full" v-if="ads.center_1_1">
      <a :href="ads.center_1_1.link"><img :src="ads.center_1_1.image_url"/></a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'hotNews',
    props: {
      ads: {
        type: Object,
        default: {}
      },
      items: {
        type: Object,
        default: {
          first: {},
          second: {},
          items: []
        }
      }
    },
    data () {
      return {
      }
    },
    created () {

    },
    watch: {
      items: function (val) { // tried to watch currPost for changes
        console.log('never triggered', val)
      }
    },
    methods: {

    }
  }
</script>

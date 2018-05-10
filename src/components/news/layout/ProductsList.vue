<template>
  <div class="news-seciton">
    <div class="tp-title">
      <h2 class="main-title"><a href="#"></a>{{text}}</h2>
      <router-link class="view-more" :to="{ name: 'newcategory', params: { id: 'product' } }">
        <span>xem thêm</span><i class="bz-next"></i>
      </router-link>
    </div>
    <div class="product-section">
      <div class="product-feature">
        <div class="item first-product" v-if="items.first">
          <div class="img"><a href="#"><img :src="items.first.image_url"/></a></div>
          <div class="info">
            <div class="name">
              <router-link :to="{ name: 'new', params: { id: items.first.slug } }">
                {{ items.first.title}}
              </router-link>
            </div>
            <div class="des" v-if="items.first.intro">{{ items.first.intro}}</div>
            <div class="time" v-if="items.first.category">{{ items.first.category}} - {{ items.first.created_at}}</div>
          </div>
        </div>
        <div class="item" v-if="items.second">
          <div class="img"><a href="#"><img :src="items.second.image_url"/></a></div>
          <div class="info">
            <div class="name"><a href="#">{{ items.second.title }}</a></div>
            <div class="des" v-if="items.second.intro">{{ items.second.intro}}</div>
            <div class="time" v-if="items.second.category">{{ items.second.category}} - {{ items.second.created_at}}</div>
          </div>
        </div>
      </div>
      <div class="list" v-if="items.items.length > 0">
        <div class="item" v-for="item in items.items" :key="item.id">
          <div class="img"><a href="#"><img :src="item.image_url"/></a></div>
          <div class="info">
            <div class="name">
              <router-link :to="{ name: 'new', params: { id: item.slug } }">
                {{ item.title}}
              </router-link>
            </div>
            <div class="time">{{ item.category}} - {{ moment(item.created_at).fromNow() }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'productsLayout',
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
          second: {},
          items: []
        }
      }
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {}
  }
</script>

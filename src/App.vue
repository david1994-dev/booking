<template>
  <div id="app">
    <div id="fb-root"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { facebook } from './config'

export default {
  name: 'App',
  metaInfo: {
    title: 'Beauty booking',
    titleTemplate: '%s | Bzone',
    script: [
      // { id: 'facebook-jssdk', src: `//connect.facebook.net/${facebook.locale}/sdk.js#xfbml=1&version=${facebook.version}&appId=${facebook.appId}` }
      { id: 'facebook-jssdk', src: `//connect.facebook.net/${facebook.locale}/sdk.js` }
    ]
  },
  created () {
    this.fetchPreloadData()
  },
  methods: {
    fetchPreloadData () {
      this.$http.get('bootstrap').then(({ data }) => {
        this.$store.dispatch('setPreloadData', data)
      })
    }
  }
}
</script>

<style lang="scss" src="./assets/sass/app.scss"></style>

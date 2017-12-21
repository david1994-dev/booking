<template>
  <div id="app">
    <div id="fb-root"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { facebook } from './config'
import MobileDetect from 'mobile-detect'

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
    this.$bus.$on('locale::change', locale => {
      this.fetchPreloadData()
    })

    const md = new MobileDetect(window.navigator.userAgent)
    if (md.is('iOS') && parseInt(md.version('iOS')) >= 11) {
      this.applyIosCarretFix()
    }
  },
  methods: {
    fetchPreloadData () {
      this.$http.get('bootstrap').then(({ data }) => {
        this.$store.dispatch('setPreloadData', data)
      })
    },
    applyIosCarretFix () {
      var top = 0

      window.addEventListener('scroll', () => {
        top = window.pageYOffset || document.documentElement.scrollTop
      })

      this.$root.$on('bv::shown::modal', bvEvt => {
        document.body.style.top = `${top * -1}px`
        document.body.classList.add('modal-ios-fix')
      }).$on('bv::hidden::modal', bvEvt => {
        document.body.style.top = '0px'
        document.body.classList.remove('modal-ios-fix')
      })
    }
  }
}
</script>

<style lang="scss" src="./assets/sass/app.scss"></style>

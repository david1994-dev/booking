<template>
  <div id="app">
    <div id="fb-root"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import {facebook} from './config'
  import MobileDetect from 'mobile-detect'

  export default {
    name: 'App',
    metaInfo: {
      title: 'Beauty booking',
      titleTemplate: '%s | Bzone',
      script: [
        // { id: 'facebook-jssdk', src: `//connect.facebook.net/${facebook.locale}/sdk.js#xfbml=1&version=${facebook.version}&appId=${facebook.appId}` }
        {id: 'facebook-jssdk', src: `//connect.facebook.net/${facebook.locale}/sdk.js`}
      ]
    },
    created () {
      this.fetchPreloadData()
      this.$bus.$on('locale::change', locale => {
        this.fetchPreloadData()
      })
      // this.getCurrentPosition()
      const md = new MobileDetect(window.navigator.userAgent)
      if (md.is('iOS') && parseInt(md.version('iOS')) >= 11) {
        this.applyCarretFix()
      }
    },
    mounted () {
      // this.getCurrentPosition()
    },
    watch: {
      $route (to, from) {
        // this.getCurrentPosition()
      }
    },
    methods: {
      ...mapActions(['setSelectedCity', 'setSelectedArea']),
      fetchPreloadData () {
        this.$http.get('bootstrap').then(({data}) => {
          this.$store.dispatch('setPreloadData', data)
        })
      },
      applyCarretFix () {
        var top = 0

        window.addEventListener('scroll', () => {
          top = window.pageYOffset || document.documentElement.scrollTop
        })

        this.$root.$on('bv::modal::shown', bvEvt => {
          document.body.style.top = `${top * -1}px`
          document.body.classList.add('modal-ios-fix')
        }).$on('bv::modal::hidden', bvEvt => {
          document.body.classList.remove('modal-ios-fix')
          const t = parseInt(document.body.style.top) * -1
          document.documentElement.scrollTop = t
          document.body.style.top = ''
        })
      }
    }
  }
</script>

<style lang="scss" src="./assets/sass/app.scss"></style>

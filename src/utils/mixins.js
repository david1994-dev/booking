import $ from 'jquery'
import { facebook } from '@/config'

export const stickyClassMixin = {
  methods: {
    addStickyClass (container, width = 0, className = 'fixed') {
      const $container = $(container)
      const $window = $(window)

      if (!$container.length) {
        return
      }

      const frameHandler = () => {
        const offsetTop = $container.offset().top
        const scrollTop = $window.scrollTop()

        if (width) {
          if ($window.width() <= width) {
            $container.removeClass(className)
            return
          }
        }

        if (scrollTop > offsetTop) {
          $container.addClass(className)
        } else {
          $container.removeClass(className)
        }
      }

      const scrollHandler = () => {
        requestAnimationFrame(frameHandler)
      }

      $window.scroll(scrollHandler)

      scrollHandler()
    }
  }
}

export const parseSearchQuery = {
  methods: {
    setSearchData () {
      if (this.$route.query.q) {
        this.$store.dispatch('setKeyword', this.$route.query.q)
      }
      if (this.$route.query.category_id) {
        this.$store.dispatch('findAndSetService', this.$route.query.category_id)
      }
      if (this.$route.query.area_id) {
        this.$store.dispatch('findAndSetArea', this.$route.query.area_id)
      }
    }
  }
}

export const fbAsyncInit = {
  methods: {
    fbAsyncInit () {
      /* eslint-disable no-undef */
      if (!window.fbAsyncInit) {
        window.fbAsyncInit = () => {
          if (typeof (FB) !== 'undefined' && FB !== null) {
            FB.init({
              appId: facebook.appId,
              autoLogAppEvents: true,
              xfbml: true,
              version: facebook.version
            })
            FB.AppEvents.logPageView()
          }
        }
      } else {
        window.fbAsyncInit()
      }

      // FB.XFBML.parse()
    }
  }
}

import $ from 'jquery'

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

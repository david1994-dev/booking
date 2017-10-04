<template>
<!-- Root element of PhotoSwipe. Must have class pswp. -->
<div aria-hidden="true" class="pswp" role="dialog" tabindex="-1">
  <!-- Background of PhotoSwipe.
      It's a separate element as animating opacity is faster than rgba(). -->
  <div class="pswp__bg"></div>

  <!-- Slides wrapper with overflow:hidden. -->
  <div class="pswp__scroll-wrap">
    <!-- Container that holds slides.
        PhotoSwipe keeps only 3 of them in the DOM to save memory.
        Don't modify these 3 pswp__item elements, data is added later on. -->
    <div class="pswp__container">
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
      <div class="pswp__item"></div>
    </div>

    <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
    <div class="pswp__ui pswp__ui--hidden">
      <div class="pswp__top-bar">
        <!--  Controls are self-explanatory. Order can be changed. -->
        <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
        <button class="pswp__button pswp__button--share" title="Share"></button>
        <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
        <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

        <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
        <!-- element will get class pswp__preloader==active when preloader is running -->
        <div class="pswp__preloader">
          <div class="pswp__preloader__icn">
            <div class="pswp__preloader__cut">
              <div class="pswp__preloader__donut"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
        <div class="pswp__share-tooltip"></div>
      </div>

      <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
      <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>

      <div class="pswp__caption">
        <div class="pswp__caption__center"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import UI from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'

const closest = (el, fn) => {
  return el && (fn(el) ? el : closest(el.parentNode, fn))
}

const onThumbnailsClick = (e) => {
  e = e || window.event
  e.preventDefault ? e.preventDefault() : e.returnValue = false
  const eTarget = e.target || e.srcElement
  // find root element of slide
  const clickedListItem = closest(eTarget, el => {
    return (el.tagName && el.className.indexOf('previewImgWrap') !== -1)
  })
  if (!clickedListItem) {
    return
  } else {
    return clickedListItem
  }
}

export default {
  methods: {
    open (index, list, params = {
      captionEl: false,
      fullscreenEl: false,
      history: false,
      shareEl: false,
      tapToClose: true
    }, event) {
      const clickedListItem = onThumbnailsClick(event)
      const options = Object.assign({
        index: index,
        getThumbBoundsFn (index) {
          const thumbnail = clickedListItem ? clickedListItem.querySelectorAll('.preview-img')[0] : document.querySelectorAll('.preview-img')[index]
          const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          const rect = thumbnail.getBoundingClientRect()
          return {
            x: rect.left,
            y: rect.top + pageYScroll,
            w: rect.width
          }
        }
      }, params)
      this.photoswipe = new PhotoSwipe(this.$el, UI, list, options)
      this.photoswipe.init()
    },
    close () {
      this.photoswipe.close()
    }
  }
}
</script>

import PhotoSwipeComponent from '../components/PhotoSwipe'

export default function install (Vue) {
  let $vm
  if (!$vm) {
    const PhotoSwipe = Vue.extend(PhotoSwipeComponent)
    $vm = new PhotoSwipe({el: document.createElement('div')})
    document.body.appendChild($vm.$el)
  }

  Vue.$photoswipe = {
    open (index, items, options) {
      $vm.open(index, items, options)
    },
    close () {
      $vm.close()
    }
  }

  Vue.mixin({
    created () {
      this.$photoswipe = Vue.$photoswipe
    }
  })
}

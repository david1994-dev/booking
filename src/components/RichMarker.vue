<template>
<div>
  <div ref="markerContent">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { clone } from 'lodash'
// import propsBinder from 'vue2-google-maps/src/utils/propsBinder'
import eventsBinder from 'vue2-google-maps/src/utils/eventsBinder'
import getPropsValuesMixin from 'vue2-google-maps/src/utils/getPropsValuesMixin'
import MapElementMixin from 'vue2-google-maps/src/components/mapElementMixin'
import m from 'googlemaps-js-rich-marker'

const props = {
  options: {
    type: Object,
    required: false,
    default () {
      return {}
    }
  },
  position: {
    type: Object,
    twoWay: true
  },
  zIndex: {
    type: Number,
    twoWay: true
  }
}

const events = [
  'domready',
  'ready',
  'click'
]

export default {
  mixins: [MapElementMixin, getPropsValuesMixin],
  replace: false,
  props: props,

  mounted () {
    const el = this.$refs.markerContent
    el.parentNode.removeChild(el)
  },

  destroyed () {
    if (!this.$markerObject) {
      return
    }

    this.$markerObject.setMap(null)
  },

  deferredReady () {
    const options = clone(this.options)
    options.content = this.$refs.markerContent
    /* eslint-disable no-undef */
    options.position = new google.maps.LatLng(this.position.lat, this.position.lng)
    options.map = this.$map

    this.createMarker(options)
  },

  methods: {
    createMarker (options) {
      this.$markerObject = new m.RichMarker(options)
      // propsBinder(this, this.$markerObject, omit(props, ['options']))
      eventsBinder(this, this.$markerObject, events)
    }
  }
}
</script>

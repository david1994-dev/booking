<template>
<div>
  <div ref="markerContent">
    <slot></slot>
  </div>
</div>
</template>

<script>
import { clone } from 'lodash'
import { DeferredReadyMixin } from 'vue2-google-maps/src/utils/deferredReady'
// import propsBinder from 'vue2-google-maps/src/utils/propsBinder'
import eventsBinder from 'vue2-google-maps/src/utils/eventsBinder'
import getPropsValuesMixin from 'vue2-google-maps/src/utils/getPropsValuesMixin'
import MapElementMixin from 'vue2-google-maps/src/components/mapElementMixin'
// import { RichMarker } from '../utils/richmarker'

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
  mixins: [DeferredReadyMixin, MapElementMixin, getPropsValuesMixin],
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
    const search = this.$findAncestor(ans => {
      return ans.$mapCreated
    })
    search.$mapCreated.then(() => {
      this.createMarker(options)
    })
  },

  methods: {
    createMarker (options) {
      const { RichMarker } = require('../utils/richmarker')
      this.$markerObject = new RichMarker(options)
      // propsBinder(this, this.$markerObject, omit(props, ['options']))
      eventsBinder(this, this.$markerObject, events)
    }
  }
}
</script>

<template>
<div class="modal-stylist" v-if="show">
  <div class="modal-title">
    <div class="title">Nhân viên tại Salon</div>
    <i class="bz-close close" @click="show = false"></i>
  </div>
  <div class="wrap-content" v-if="stylists.length">
    <div class="stylist-img">
      <div class="item" v-for="stylist in stylists"
        :key="stylist.id"
        :class="{ active: selectedStylist.id === stylist.id }">
        <figure>
          <a @click="setSelectedStylist(stylist)"><img :src="stylist.avatar_url"></a>
        </figure>
        <div class="info">
          <h3><a @click="setSelectedStylist(stylist)">{{ stylist.name }}</a></h3>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'StylistPicker',
  data () {
    return {
      show: false,
      stylists: [],
      selectedStylist: {}
    }
  },
  metaInfo () {
    return {
      htmlAttrs: {
        class: this.show ? 'ofhd' : null
      }
    }
  },
  mounted () {
    this.$bus.$on('stylistPicker::show', () => {
      this.show = true
    })

    this.$bus.$on('stylistPicker::hide', () => {
      this.show = false
    })

    this.$bus.$on('stylistPicker::toggle', show => {
      this.show = show
    })

    this.$bus.$on('stylistPicker::init', ({ stylists, selected }) => {
      this.stylists = stylists
      this.selectedStylist = selected
    })
  },
  methods: {
    setSelectedStylist (stylist) {
      this.selectedStylist = stylist
      this.$bus.$emit('stylistPicker::selected', stylist)
      this.show = false
    }
  }
}
</script>

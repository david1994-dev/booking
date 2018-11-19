<template>
    <div class="styles-d">
        <div class="verified">
            <div class="icon-txt">
                <i class="bz-correct"></i>
                <span>{{ $t('salon.verified_style') }}</span>
            </div>
            <i class="bz-information-button note-verified" data-toggle="tooltip" data-placement="top" title="Tooltip on top"></i>
        </div>
        <div class="notes" v-html="$t('salon.tooltip_tab_style')"></div>
        <v-loading loader="fetching verified">
            <template slot="spinner">
                <div class="text-center">
                    <v-loading-spinner height="30px" width="30px" />
                </div>
            </template>
            <div class="list">
                <div class="item" v-for="style in styles" :key="salon.tag" @click="setSelectedStyle(style)" :class="{active: style.tag == selectedItem.tag}">
                    <i class="icon bz-heart"></i>
                    <div>
                        <img :src="style.image.url" />
                    </div>
                    <div class="hashtag">#{{ style.tag }}</div>
                </div>

            </div>
        </v-loading>
    </div>
</template>

<script>
  export default {
    name: 'Verified',
    props: {
      salon: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        styles: [],
        index: -1,
        selectedItem: ''
      }
    },
    mounted () {
      // this.setSelectedService()
      this.fetchStyles()
      this.$bus.$on('locale::change', locale => {
        this.fetchStyles()
      })
    },
    watch: {
      salon: 'fetchStyles'
    },
    methods: {
      fetchStyles () {
        this.$startLoading('fetching verified')
        this.$http.get(`salons/${this.salon.id}/tags`).then(({ data }) => {
          this.styles = data.data
          this.$endLoading('fetching verified')
        }).catch(() => this.$endLoading('fetching verified'))
      },
      setSelectedStyle (item) {
        console.log(item)
        this.selectedItem = item
        this.$store.dispatch('setVerifyStyle', item)
      }
    }
  }
</script>

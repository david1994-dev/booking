<template>
<div :class="wrapperClass">
  <div class="wrap-input key-type">
    <div class="input">
      <i class="bz-search"></i>
      <input placeholder="Dịch vụ, Stylist, Salon..."
        type="search"
        @keyup.enter="submit"
        v-model="search">
    </div>
    <div class="tp-search-result">
      <suggestion-results />
    </div>
  </div>
  <div class="wrap-input location">
    <div class="input">
      <i class="bz-location"></i>
      <input placeholder="Thành phố bạn ở"
        @keyup.enter="submit"
        v-model="areaName"
        type="text">
    </div>
    <div class="tp-search-result-2">
      <location-results />
    </div>
  </div>
  <input class="btn-search"
    type="submit"
    value="Tìm kiếm"
    :disabled="!canSubmit"
    @click="submit">
</div>
</template>

<script>
import { mapGetters } from 'vuex'
const LocationResults = () => import(/* webpackChunkName: "search-bundle" */ '../partials/LocationResults')
const SuggestionResults = () => import(/* webpackChunkName: "search-bundle" */ '../partials/SuggestionResults')

export default {
  name: 'Search',
  props: {
    wrapperClass: {
      type: String,
      default: 'search'
    }
  },
  components: {
    LocationResults,
    SuggestionResults
  },
  computed: {
    ...mapGetters(['selectedService', 'selectedArea']),
    search: {
      get () {
        return this.$store.state.search.keyword
      },
      set (value) {
        this.$store.dispatch('setKeyword', value)
      }
    },
    areaName: {
      get () {
        return this.selectedArea.name
      },
      set (value) {
        if (!value) {
          this.$store.dispatch('setSelectedArea', {})
        }
      }
    },
    canSubmit () {
      return this.search
    }
  },
  methods: {
    submit () {
      if (!this.canSubmit) {
        return
      }

      const query = { q: this.search }
      if (this.selectedArea.id) {
        query.area_id = this.selectedArea.id
      }
      if (this.selectedService.id) {
        query.category_id = this.selectedService.id
      }

      this.$router.push({ name: 'search', query })
    }
  }
}
</script>

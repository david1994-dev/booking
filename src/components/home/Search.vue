<template>
<div class="search">
  <div class="wrap-input key-type">
    <div class="input">
      <i class="bz-search"></i>
      <input placeholder="{{ $t('home.search_bar.input_service') }}..."
        type="search"
        @keyup.enter="submit"
        v-model.lazy="search">
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
        :value="selectedArea.name"
        type="text">
    </div>
    <div class="tp-search-result not-sub">
      <location-results />
    </div>
  </div>
  <input class="btn-search" type="submit" value="{{ $t('common.search') }}" @click="submit">
</div>
</template>

<script>
import { mapGetters } from 'vuex'
const LocationResults = () => import(/* webpackChunkName: "search-bundle" */ '../partials/LocationResults')
const SuggestionResults = () => import(/* webpackChunkName: "search-bundle" */ '../partials/SuggestionResults')

export default {
  name: 'HomeSearch',
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
    }
  },
  methods: {
    submit () {
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

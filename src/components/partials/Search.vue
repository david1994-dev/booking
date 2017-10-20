<template>
<div :class="wrapperClass">
  <div class="wrap-input key-type">
    <div class="input">
      <i class="bz-search"></i>
      <input :placeholder="$t('home.search_bar.input_service')"
        type="search"
        @keyup.enter="submit"
        v-model="keyword"
        @focus="selectAndShowSuggestions"
        @blur="hideSugesstions">
    </div>
    <div v-show="showSuggestions">
      <suggestion-results />
    </div>
  </div>
  <div class="wrap-input location">
    <div class="input">
      <i class="bz-location" :class="{ 'bounce': $isLoading('geolocation') }"></i>
      <input :placeholder="$t('home.search_bar.input_location')"
        @keyup.enter="submit"
        type="search"
        v-model="location"
        @focus="showLocations = true"
        @blur="hideLocations">
    </div>
    <div v-show="showLocations">
      <location-results />
    </div>
  </div>
  <input class="btn-search"
    type="submit"
    :value="$t('common.search')"
    :class="{ disabled: !canSubmit }"
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
    ...mapGetters(['selectedService', 'selectedCity', 'selectedArea']),
    keyword: {
      get () {
        return this.$store.state.search.keyword
      },
      set (value) {
        this.$store.dispatch('setKeyword', value)
      }
    },
    location: {
      get () {
        return this.$store.state.search.location
      },
      set (value) {
        this.$store.dispatch('setLocation', value)
      }
    },
    canSubmit () {
      return this.keyword
    }
  },
  watch: {
    location () {
      if (this.$isLoading('geolocation')) {
        this.$endLoading('geolocation')
      }
    }
  },
  data () {
    return {
      showSuggestions: false,
      showLocations: false
    }
  },
  methods: {
    submit () {
      if (!this.canSubmit) {
        return
      }

      const query = { q: this.keyword }
      if (this.location) {
        query.l = this.location
      }
      if (this.selectedCity.id) {
        query.city_id = this.selectedCity.id
      } else if (this.selectedArea.id) {
        query.area_id = this.selectedArea.id
      }
      if (this.selectedService.id) {
        query.category_id = this.selectedService.id
      }

      this.$bus.$emit('searchSubmitted')

      this.$router.push({ name: 'search', query })
    },
    selectAndShowSuggestions ($event) {
      $event.target.select()
      this.showSuggestions = true
    },
    hideSugesstions () {
      setTimeout(() => {
        this.showSuggestions = false
      }, 200)
    },
    hideLocations () {
      setTimeout(() => {
        this.showLocations = false
      }, 200)
    }
  }
}
</script>

<style scoped>

@keyframes bounce {
  from, 20%, 53%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -12px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
    transform: translate3d(0, -6px, 0);
  }

  90% {
    transform: translate3d(0, -2px, 0);
  }
}

.bounce {
  animation-name: bounce;
  animation-duration: 1.4s;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  transform-origin: center bottom;
}
</style>

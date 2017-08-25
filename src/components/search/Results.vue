<template>
<div class="searchfull-page">
  <stylists />
  <services />
  <salons />
</div>
</template>

<script>
const Stylists = () => import(/* webpackChunkName: "search-bundle" */ './StylistResults')
const Services = () => import(/* webpackChunkName: "search-bundle" */ './ServiceResults')
const Salons = () => import(/* webpackChunkName: "search-bundle" */ './SalonResults')

export default {
  name: 'SearchResults',
  components: {
    Stylists,
    Services,
    Salons
  }
}
</script>

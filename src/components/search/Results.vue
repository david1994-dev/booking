<template>
<div>
  <!-- <div class="search-filter searchfull-filter">
    <search-filter />
  </div> -->
  <div class="searchfull-page">
    <stylists />
    <services />
    <salons-new />
    <salons />
  </div>
</div>
</template>

<script>
const Stylists = () => import(/* webpackChunkName: "search-bundle" */ './StylistResults')
const Services = () => import(/* webpackChunkName: "search-bundle" */ './ServiceResults')
const Salons = () => import(/* webpackChunkName: "search-bundle" */ './SalonResults')
const SalonsNew = () => import(/* webpackChunkName: "search-bundle" */ './SalonNewResults')
const SearchFilter = () => import(/* webpackChunkName: "search-bundle" */ './Filters')

export default {
  name: 'SearchResults',
  components: {
    SearchFilter,
    Stylists,
    Services,
    Salons,
    SalonsNew
  }
}
</script>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    this.fetchPreloadData()
  },
  methods: {
    fetchPreloadData () {
      this.$http.get('bootstrap').then(({ data }) => {
        this.$store.dispatch('setPreloadData', data)
      })
    }
  }
}
</script>

<style lang="scss" src="./assets/sass/app.scss"></style>

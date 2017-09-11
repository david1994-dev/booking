<template>

</template>

<script>
export default {
  name: 'Stylist',
  data () {
    return {
      stylist: {}
    }
  },
  metaInfo () {
    return {
      title: `${this.stylist.name} | Nhân viên`
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$startLoading('fetching stylist')
      this.$http.get(`stylists/${this.$route.params.id}`, { params: { includes: 'salon' } }).then(({ data }) => {
        this.stylist = data
        this.redirect()
        this.$endLoading('fetching stylist')
      }).catch(() => this.$endLoading('fetching stylist'))
    },
    redirect () {
      if (this.stylist.salon) {
        this.$router.push({ name: 'salon', params: { id: this.stylist.salon.slug } })
      } else {
        this.$router.push({ name: 'home' })
      }
    }
  }
}
</script>

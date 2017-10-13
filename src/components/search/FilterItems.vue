<template>
<div class="list">
  <label class="item" v-for="(name, value) in items" :key="value">
    <div class="tp-checkbox"><input type="checkbox" @change="updateFilter(value, $event.target.checked)"><span></span></div>
    <div class="name">{{ name }}</div>
  </label>
</div>
</template>

<script>
export default {
  name: 'FilterItems',
  props: {
    items: {
      required: true
    }
  },
  methods: {
    updateFilter (value, checked) {
      if (checked) {
        this.$store.dispatch('addFilter', value)
      } else {
        this.$store.dispatch('removeFilter', value)
      }
    }
  }
}
</script>

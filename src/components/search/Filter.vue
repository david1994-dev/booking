<template>
<div class="item-filter">
  <div class="selected" @click="toggle">
    <slot name="heading">
      <div class="name">{{ name }}</div>
      <i class="bz-down-2"></i>
    </slot>
  </div>
  <div class="content-item">
    <slot></slot>
    <div class="action">
      <slot name="action">
        <span class="cancel" @click="cancel">Hủy bỏ</span>
        <span class="search" @click="submit">Tìm kiếm</span>
      </slot>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchFilter',
  props: {
    name: {
      required: true,
      type: String
    }
  },
  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.$emit('submit')
    },
    toggle () {
      this.$emit('toggle', this.name)
      this.$bus.$emit('toggleFilter', this.name)
    }
  }
}
</script>

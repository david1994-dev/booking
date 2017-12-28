<template>
<div class="list-viewmore" :class="{ active: expand }">
  <slot name="heading">
    <div class="title-item">{{ name }}</div>
  </slot>
  <slot></slot>
  <div class="view-all-wrap">
    <slot name="action">
      <div class="view-all expand" @click="expand = true"><span>Xem tất cả</span> <i class="bz-down-2"></i></div>
      <div class="view-all collapse" @click="expand = false"><span>Thu gọn</span> <i class="bz-up-2"></i></div>
    </slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'SearchFilterMore',
  props: {
    name: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      expand: false
    }
  },
  methods: {
    //
  }
}
</script>

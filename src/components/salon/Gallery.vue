<template>
<div class="images-d" id="images">
  <div class="title">336 Hình ảnh</div>
  <div class="list">
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item"><img src="../../assets/images/image-instagram.jpg" /></div>
    <div class="item">
      <span class="number"><span>+336</span></span>
      <img src="../../assets/images/image-instagram.jpg" />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'SalonGallery',
  props: {
    salon: {
      type: Object,
      required: true
    }
  }
}
</script>

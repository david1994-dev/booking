<template>
<div class="guide-book tp-box">
  <div class="tp-wrap-title">
    <h3 class="tp-title"><strong>{{ $t('home.steps.to_be_beautiful') }}</strong> {{ $t('home.steps.in_4_steps') }}</h3>
  </div>
  <div class="ofhd">
    <div class="list">
      <div class="item">
        <div class="name">{{ $t('home.steps.step1') }}</div>
        <div class="content-item">
          <div class="number">1</div>
          <p class="des">{{ $t('home.steps.step1_detail') }}</p>
        </div>
      </div>
      <div class="item">
        <div class="name">{{ $t('home.steps.step2') }}</div>
        <div class="content-item">
          <div class="number">2</div>
          <p class="des">{{ $t('home.steps.step2_detail') }}</p>
        </div>
      </div>
      <div class="item">
        <div class="name">{{ $t('home.steps.step3') }}</div>
        <div class="content-item">
          <div class="number">3</div>
          <p class="des">{{ $t('home.steps.step3_detail') }}</p>
        </div>
      </div>
      <div class="item">
        <div class="name">{{ $t('home.steps.step4') }}</div>
        <div class="content-item">
          <div class="number">4</div>
          <p class="des">{{ $t('home.steps.step4_detail') }}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Guide'
}
</script>
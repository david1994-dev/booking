<template>
    <div class="item">
        <div class="img-info">
            <router-link :to="{ name: 'search', query: { q: featureTag.tag, tab_id: 0 } }">
                <img :src="featureTag.image" />
            </router-link>
        </div>
        <div class="info-style">
            <h4><router-link :to="{ name: 'search', query: { q: featureTag.tag, tab_id: 0 } }">#{{ featureTag.tag }}</router-link></h4>
            <span>{{ $t('home.feature.num_booked',{'num':featureTag.number_booking}) }}</span>
            <span>{{ $t('home.feature.num_salon',{'num':featureTag.number_salon})}}</span>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'FeatureTag',
    props: {
      featureTag: {
        type: Object,
        required: true
      }
    }
  }
</script>

<template>
<div class="tp-account-lang">
  <div class="account" @click="$root.$emit('bv::show::modal', 'modal-choice-account')">Đăng ký</div>
  <!-- <div class="lang" :class="{ active: active }" @click="active = !active">
    <div class="selected">{{ selectedLanguage }}</div>
    <ul>
      <li v-for="(language, locale) in languages"
        v-show="locale !== selected">
        <a @click="setLocale(locale)" class="pointer">{{ language }}</a>
      </li>
    </ul>
   </div> -->
</div>
</template>

<script>
const LANG = {
  'vi': 'VN',
  'en': 'EN'
}

export default {
  computed: {
    selectedLanguage () {
      return this.languages[this.selected]
    }
  },
  data () {
    return {
      active: false,
      languages: LANG,
      selected: 'vi'
    }
  },
  methods: {
    setLocale (locale) {
      this.selected = locale
    }
  }
}
</script>

<template>
<div class="tp-account-lang">
  <div class="account" @click="$root.$emit('bv::show::modal', 'modal-choice-account')">{{ $t('auth.register') }}</div>
  <div class="lang" :class="{ active: active }" @click="active = !active">
    <div class="selected">{{ selectedLanguage }}</div>
    <ul>
      <li v-for="(language, locale) in languages"
        v-show="locale !== selected">
        <a @click="setLocale(locale)" class="pointer">{{ language }}</a>
      </li>
    </ul>
   </div>
</div>
</template>

<script>
const LANG = {
  'vi': 'VN',
  'en': 'EN'
}

import { setLocaleLang } from '../../utils/http'

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
      selected: this.getLocale()
    }
  },
  methods: {
    setLocale (locale) {
      this.selected = locale
      localStorage.setItem('lang', locale)
      setLocaleLang(locale)
      location.reload()
    },
    getLocale () {
      if (localStorage.getItem('lang')) {
        return localStorage.getItem('lang')
      }
      return 'vi'
    }
  }
}
</script>

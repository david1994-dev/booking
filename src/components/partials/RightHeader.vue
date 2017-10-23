<template>
<div class="tp-account-lang">
  <div class="lang" :class="{ active: active }" @click="active = !active">
    <div class="selected">{{ selectedLanguage }}</div>
    <ul>
      <li v-for="(language, locale) in languages"
        v-show="locale !== selected">
        <a @click="setLocale(locale)" class="pointer">{{ language }}</a>
      </li>
    </ul>
  </div>
  <div class="account" @click="$root.$emit('bv::show::modal', 'modal-choice-account')">
    <span>{{ $t('auth.register') }}</span>
    <i class="bz-profile-user"></i>
  </div>
</div>
</template>

<script>
import { setLocale as setLocaleHeader } from '../../utils/http'
import store from 'store2'

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
      selected: this.$i18n.locale
    }
  },
  methods: {
    setLocale (locale) {
      this.selected = locale
      this.$i18n.locale = locale
      setLocaleHeader(locale)
      store.set('locale', locale)
    }
  }
}
</script>

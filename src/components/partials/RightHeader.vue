<template>
<div class="tp-account-lang">
  <div class="lang" :class="{ active: active }">
    <div class="selected" v-on-clickaway="hide" @click="active = !active">{{ selectedLanguage }}</div>
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
import { mixin as clickaway } from 'vue-clickaway'
import { setLocale as setLocaleHeader } from '../../utils/http'
import { languages } from '@/config'
import store from 'store2'
import moment from 'moment'

export default {
  mixins: [clickaway],
  computed: {
    selectedLanguage () {
      return this.languages[this.selected]
    }
  },
  data () {
    return {
      active: false,
      selected: this.$i18n.locale,
      languages
    }
  },
  methods: {
    hide () {
      this.active = false
    },
    setLocale (locale) {
      this.selected = locale
      this.$i18n.locale = locale
      this.$validator.localize(locale)
      moment.locale(locale)
      setLocaleHeader(locale)
      store.set('locale', locale)
      this.$bus.$emit('locale::change', locale)
    }
  }
}
</script>

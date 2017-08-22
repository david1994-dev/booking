<template>
<div class="search">
  <div class="wrap-input key-type">
    <div class="input">
      <i class="bz-search"></i> <input placeholder="Dịch vụ, Stylist, Salon..." type="search" v-model="search">
    </div>
    <div class="tp-search-result">
      <ul>
        <li>
          <a href="#">Dịch vụ</a>
          <ul>
            <li>
              <a href="#">Cắt tóc nam</a>
              <ul>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Cắt tóc nam</a>
              <ul>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">Cắt tóc nam</a>
              <ul>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
                <li>
                  <a href="#">Cắt tóc nam</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Stylist</a>
          <ul>
            <li>
              <a href="#">Cắt tóc nam</a>
            </li>
            <li>
              <a href="#">Cắt tóc nam</a>
            </li>
            <li>
              <a href="#">Cắt tóc nam</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">Salon</a>
          <ul>
            <li>
              <a href="#">Cắt tóc nam</a>
            </li>
            <li>
              <a href="#">Cắt tóc nam</a>
            </li>
            <li>
              <a href="#">Cắt tóc nam</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
  <div class="wrap-input location">
    <div class="input">
      <i class="bz-location"></i> <input placeholder="Thành phố bạn ở" type="text">
    </div>
    <div class="tp-search-result not-sub">
      <location-results />
    </div>
  </div>
  <input class="btn-search" type="submit" value="Tìm kiếm" @click="submit">
</div>
</template>

<script>
const LocationResults = () => import(/* webpackChunkName: "search-bundle" */ '../partials/LocationResults')

export default {
  name: 'HomeSearch',
  components: { LocationResults },
  data () {
    return {
      search: ''
    }
  },
  methods: {
    submit () {
      this.$router.push({ name: 'search', query: { q: this.search } })
    }
  }
}
</script>

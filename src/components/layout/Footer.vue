<template>
<footer class="footer">
  <div class="tp-container">
    <div class="savetime-footer">
      <h3>Bạn biết không?</h3>
      <p>Thông qua việc kết nối với các salon và các chuyên gia làm đẹp trên toàn quốc, BZONE hi vọng có thể đem lại cho bạn cơ hội để thể hiện bản thân theo nhiều cách khác nhau. Không dừng lại ở đó, chúng tôi còn là một cộng đồng làm đẹp nơi bạn có thể kết nối với những tâm hồn yêu cái đẹp và có thể truyền cảm hứng cho những người xung quanh.</p>
      <div class="full"></div>
      <div class="copyright">
        &copy;BZONE 2017
      </div>
    </div>
    <div class="instagram">
      <ul>
        <li v-for="(media, i) in instagram" :key="media.id" v-if="i < 9">
          <a :href="media.link" target="_blank" :alt="media.caption.text"><img :src="media.images.low_resolution.url"></a>
        </li>
      </ul>
    </div>
    <div class="links">
      <div class="title">
        Link
      </div>
      <ul class="list-link">
        <li>
          <router-link :to="{ name: 'about' }">Về chúng tôi</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'faq' }">Câu hỏi thường gặp</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'partner' }">Hợp tác với BZONE</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'contact' }">Liên hệ</router-link>
        </li>
      </ul>
      <div class="full"></div>
      <ul class="social">
        <li>
          <a href="https://www.facebook.com/Bzone.vn" target="_blank"><i class="bz-facebook"></i></a>
        </li>
        <li>
          <a href="https://www.instagram.com/bzone.vn" target="_blank"><i class="bz-instagram"></i></a>
        </li>
      </ul>
    </div>
    <div class="copyright bottom">
      ©Abby 2017
    </div>
  </div>
</footer>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Footer',
  computed: mapState({
    instagram: state => state.preloadData.instagram || []
  })
}
</script>

<template>
<div>
  <page-header />
  <div class="contact-page">
    <div class="tp-container">
      <div class="content-page">
        <div class="address-info">
          <div class="adress">
            Collaboratively administrate chanels whereas virtual.
            Objectively seize scalable metrics whereas proactive e-
            services
          </div>
          <div class="info">
            <div class="item">
              <div class="icon"><i class="bz-phone"></i></div>
              <div class="name-value">
                <div class="name">Phone</div>
                <div class="value">(123) 123-456</div>
              </div>
            </div>
            <div class="item">
              <div class="icon"><i class="bz-fax"></i></div>
              <div class="name-value">
                <div class="name">Fax</div>
                <div class="value">(123) 123-456</div>
              </div>
            </div>
            <div class="item">
              <div class="icon"><i class="bz-global"></i></div>
              <div class="name-value">
                <div class="name">Web</div>
                <div class="value">www.apple.com</div>
              </div>
            </div>
            <div class="item">
              <div class="icon"><i class="bz-email"></i></div>
              <div class="name-value">
                <div class="name">E-Mail</div>
                <div class="value">office@example.com</div>
              </div>
            </div>
          </div>
        </div>

        <div class="wrap-form">
          <div class="title-form">Contact Form</div>
          <form method="post">
            <div class="name-email">
              <input class="txt-field" type="text" placeholder="Your Name" />
              <input class="txt-field" type="email" placeholder="Email" />
            </div>
            <input class="txt-field" type="text" placeholder="Subject" />
            <textarea rows="7" placeholder="Content" class="txt-field tae-field"></textarea>
            <input class="tp-btn btn-submit" type="submit" value="Submit message" />
          </form>
        </div>

      </div>
    </div>
  </div>
</div>
</template>

<script>
import PageHeader from './layout/Header'

export default {
  name: 'Contact',
  components: {
    PageHeader
  },
  metaInfo: {
    title: 'Liên hệ'
  }
}
</script>

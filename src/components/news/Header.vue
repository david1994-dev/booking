<template>
  <header :id="'header'">
    <div class="tp-container">
      <router-link class="main-logo" :to="{ name: 'news'}">
        <img src="../../assets/news/images/logo.png"/>
      </router-link>
      <div class="menu">
        <div class="icon-menu">
          <div class="inner-icon">
            <div class="top" >
              <span></span>
            </div>
            <div class="bottom">
              <span></span>
            </div>
          </div>
        </div>

        <div class="main-menu-search">
          <div class="search-menu">
            <div class="search-inner">
              <input type="text" class="txt" placeholder="Bạn tìm gì..."/>
              <div class="button">
                <input type="submit" value=""/>
                <i class="bz-search"></i>
              </div>
            </div>
          </div>
          <div class="title-category">DANH MỤC CHÍNH</div>
          <div class="main-menu">
            <ul>
              <li>
                <router-link class="main-link" :to="{ name: 'categories' , params:{ category: 'hair'} }">Hair
                </router-link>
              </li>
              <li>
                <router-link class="main-link" :to="{name: 'categories' , params:{ category: 'nail'} }">Nail
                </router-link>
              </li>
              <li>
                <router-link class="main-link" :to="{ name: 'categories' , params:{ category: 'beauty'} }">Beauty
                </router-link>
              </li>
              <li><a class="main-link" href="https://dev.bzone.vn/search?q=a">Đặt lịch làm đẹp</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="news">
        <div class="icon-txt">NEWS</div>
        <div class="list-news">
          <div class="title-listw">TIN TỨC</div>
          <listNews/>
        </div>
      </div>

      <div class="search">
        <div class="search-inner">
          <input type="type" class="txt" placeholder="Tìm kiếm"/>
          <div class="button">
            <input type="submit" value="">
            <i class="bz-search"></i>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import $ from 'jquery'
  import listNews from './layout/ListNews'

  export default {
    name: 'headerNews',
    data () {
      return {
        first: null,
        news: []
      }
    },
    components: {
      listNews
    },
    created () {

    },
    mounted: function () {
      (function ($) {
        'use strict'

        function Menu () {
          $('#header .menu .icon-menu').click(function () {
            $('body').toggleClass('active-menu')
            $('body').removeClass('active-news')
          })
          $('#header .news .icon-txt').click(function () {
            $('body').toggleClass('active-news')
            $('body').removeClass('active-menu')
          })

          $('#header .menu .main-menu li').each(function () {
            var _this = $(this)

            var count = _this.find('ul').length
            if (count) {
              _this.addClass('bullet')
              $('<i class="bullet-icon bz-down"></i>').insertAfter(_this.children('a'))
            }
          })

          $('#header .menu .main-menu .bullet-icon').click(function () {
            if ($('#header .menu .icon-menu').not(':visible')) {
              var parent = $(this).parent()

              if (parent.hasClass('active-down')) {
                $(this).siblings('ul').stop(true, true).slideUp()
              } else {
                $(this).siblings('ul').stop(true, true).slideDown()
              }
              parent.toggleClass('active-down')
            }
          })
        }

        function Lightbox () {
          if (typeof $.fancybox === 'function') {
            $().fancybox({
              selector: '[data-fancybox]',
              loop: false
            })
          }
        }

        $(document).ready(function () {
          Menu()
          Lightbox()
        })

        $(window).on('load', function () {})
      })($)
    },
    methods: {
      bodyClass: () => {

      }
    }
  }
</script>

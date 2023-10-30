<template>
  <div>
    <div class="benefits__pagination benefits-pag"></div>
    <swiper
        ref="benefitsSwiper"
        :pagination="pagination"
        :autoplay="true"
        :slides-per-view="1"
        :modules="modules"
        :options="swiperOption"
        :space-between="20"
        :loop="isLoop || false"
        :lazy="swiperOption.lazy"
        :auto-height="true"
        :navigation="{
          prevEl: '.swiper__nav--benefits-left',
          nextEl: '.swiper__nav--benefits-right',
        }"
    >
        <slot></slot>
    </swiper>
    <span class="swiper__nav swiper__nav--benefits-left swiper__nav--left"></span>
    <span class="swiper__nav swiper__nav--benefits-right swiper__nav--right"></span>
  </div>
  </template>
  <script>
    import { Navigation, Lazy, Pagination } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    export default {
      components: {
        Swiper, SwiperSlide, Pagination
      },
      props: {
        menuList: Array,
        isLoop: Boolean
      },
      data() {
        return {
          swiperOption: {
            autoHeight: true,
            lazy: {
              loadPrevNext: true,
            }
          },
          pagination: {
            el: '.benefits__pagination',
            clickable: true,
            renderBullet: (index, className) => {
              return '<span class="benefits-pag__item ' + className + '">' + this.menuList[index] + "</span>";
            },
          },
        }
      },
      setup() {
        return {
          modules: [Lazy, Navigation, Pagination],
        };
      },
    };
  </script>
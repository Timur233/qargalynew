<template>
    <swiper
        :modules="modules"
        :autoplay="true"
        :slides-per-view="1"
        :space-between="20"
        :lazy="true"
        :auto-height="true"
        :navigation="{
          prevEl: '.swiper__nav--discount-left',
          nextEl: '.swiper__nav--discount-right',
        }"
    >
        <slot></slot>
    </swiper>

    <span class="swiper__nav swiper__nav--discount-left swiper__nav--left"></span>
    <span class="swiper__nav swiper__nav--discount-right swiper__nav--right"></span>
  </template>
  <script>
    import { Lazy, Navigation } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
    export default {
      components: {
        Swiper, SwiperSlide
      },
      setup() {
        return {
          modules: [Lazy, Navigation],
        };
      },
    };
  </script>
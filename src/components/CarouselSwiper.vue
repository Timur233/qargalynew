<template>
    <div>
      <swiper
        :modules="modules"
        :options="swiperOption"
        :slides-per-view="perView"
        :space-between="20"
        :loop="isLoop ?? false"
        :lazy="swiperOption.lazy"
        :auto-height="true"
        :navigation="{
          prevEl: '.swiper__nav--carousel-' + randomId + '-left',
          nextEl: '.swiper__nav--carousel-' + randomId + '-right',
        }"
        :breakpoints="breakpoints"
      >
          <slot></slot>
      </swiper>
      <span :class="'swiper__nav swiper__nav--carousel-' + randomId +  '-left swiper__nav--left'"></span>
      <span :class="'swiper__nav swiper__nav--carousel-' + randomId +  '-right swiper__nav--right'"></span>
    </div>
  </template>
  <script>
    import { Lazy, Navigation } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';

    export default {
      components: {
        Swiper, SwiperSlide
      },
      props: {
        perView: Number,
        isLoop: Boolean,
        breakpoints: Object,
      },
      data() {
        return {
          swiperOption: {
            autoHeight: true,
            lazy: {
              loadPrevNext: true,
            }
          },
          randomId: 0,
        }
      },
      created() {
        this.randomId = Math.random().toString().replaceAll('.', '');
      },
      setup() {
        return {
          modules: [Lazy, Navigation],
        };
      },
    };
  </script>
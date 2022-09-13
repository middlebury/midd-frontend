import { Navigation, A11y, SwiperOptions } from 'swiper';
import Superclamp from 'superclamp';

import createCardCarousel from './card-carousel';
import { $, $$ } from './utils/dom';
import config from './config';
import $clamp from 'clamp-js-main';

// const cards = document.querySelectorAll('.dispatches-item__body');

// cards.forEach((elem: HTMLElement) => {
//   $clamp(elem, { clamp: 'auto' });
// });

// Enable superclamp to clamp overflow text on cards
// Superclamp.register(
//   document.querySelectorAll('.dispatches-item__body')
// );

let dispatchesSwiperConfig: SwiperOptions = {
  modules: [Navigation, A11y],
  a11y: {},
  slidesPerView: 1,
  grabCursor: true,
  breakpoints: {
    [config.breakpoints.sm]: {
      slidesPerView: 3
    },
    [config.breakpoints.lg]: {
      slidesPerView: 4
    }
  }
};

const dispatches = $$('.js-dispatches');

dispatches.forEach((el: HTMLElement) => {
  // window.addEventListener('load', Superclamp.reclampAll);
  dispatchesSwiperConfig = {...dispatchesSwiperConfig, navigation: {
    nextEl: $('.js-dispatches-next-button', el) as HTMLElement,
    prevEl: $('.js-dispatches-prev-button', el) as HTMLElement,
    disabledClass: 'button--disabled'
  }};
  
  createCardCarousel(el, dispatchesSwiperConfig);
});
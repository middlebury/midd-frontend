import { Navigation, A11y, SwiperOptions } from 'swiper';

import createCardCarousel from './card-carousel';
import { $, $$ } from './utils/dom';
import config from './config';
import Superclamp from 'superclamp';

class Dispatches {
  elem: HTMLElement;
  delay: number;
  timeout: NodeJS.Timeout;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.delay = 250;

    this.init();
  }

  init() {
    this.addListeners();
  }

  registerSuperclamp() {
    Superclamp.register(document.querySelectorAll(`.dispatches-item__body`));
    Superclamp.reclampAll();
  }

  addListeners() {
    // Enable superclamp to clamp overflow text on cards
    document.addEventListener('readystatechange', (e) => {
      if (document.readyState !== 'loading') {
        this.registerSuperclamp();
      }
    });
    window.addEventListener('resize', () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.registerSuperclamp, this.delay);
    });
  }
}

const dispatchesCards = $$('.dispatches__container');

dispatchesCards.forEach((elem) => new Dispatches(elem));

let dispatchesSwiperConfig: SwiperOptions = {
  modules: [Navigation, A11y],
  a11y: {},
  slidesPerView: 1,
  grabCursor: true,
  breakpoints: {
    [config.breakpoints.sm]: {
      slidesPerView: 3,
      spaceBetween: 4
    },
    [config.breakpoints.lg]: {
      slidesPerView: 4,
      spaceBetween: 4
    }
  }
};

const dispatches = $$('.js-dispatches');

dispatches.forEach((el: HTMLElement) => {
  dispatchesSwiperConfig = {
    ...dispatchesSwiperConfig,
    navigation: {
      nextEl: $('.js-dispatches-next-button', el) as HTMLElement,
      prevEl: $('.js-dispatches-prev-button', el) as HTMLElement,
      disabledClass: 'button--disabled'
    }
  };

  createCardCarousel(el, dispatchesSwiperConfig);
});

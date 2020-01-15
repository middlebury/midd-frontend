import { Swiper, Navigation } from 'swiper/dist/js/swiper.esm';

import { $, $$ } from './utils/dom';
import config from './config';

Swiper.use([Navigation]);

function randomizeChildren(elem) {
  for (let i = elem.children.length; i >= 0; i--) {
    elem.appendChild(elem.children[(Math.random() * i) | 0]);
  }
}

function createCardCarousel(elem) {
  const swiperWrapper = $('.js-swiper-wrapper', elem);
  const randomize = elem.hasAttribute('data-randomize');

  if (!swiperWrapper || !swiperWrapper.firstChild) {
    // do nothing if no swiper wrapper
    return;
  }

  if (randomize) {
    randomizeChildren(swiperWrapper);
  }

  const swiperConfig = {
    slidesPerView: 1,
    grabCursor: true,
    navigation: {
      nextEl: $('.js-card-carousel-next-button', elem),
      prevEl: $('.js-card-carousel-prev-button', elem),
      disabledClass: 'button--disabled'
    },
    // use min-width approach to match our css
    breakpointsInverse: true,
    breakpoints: {
      [config.breakpoints.lg]: {
        slidesPerView: 2
      },
      [config.breakpoints.xl]: {
        slidesPerView: 3
      }
    }
  };

  const swiperContainer = $('.js-swiper-container', elem);

  return new Swiper(swiperContainer, swiperConfig);
}

const carousels = $$('.js-card-carousel');

carousels.forEach(el => createCardCarousel(el));

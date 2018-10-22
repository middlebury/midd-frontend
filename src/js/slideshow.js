import Swiper from 'swiper';

import { $, $$, hide, on } from './utils/dom';

class Slideshow {
  constructor(elem) {
    this.elem = elem;

    this.slideshowCaption = $('.js-slideshow-caption', elem);
    this.nextEl = $('.js-slideshow-next', elem);
    this.prevEl = $('.js-slideshow-prev', elem);
    this.pagers = $('.js-slideshow-pagination', elem);

    this.captions = $$('figcaption', elem);

    this.slideshow = null;

    this.init();
  }

  init() {
    this.slideshow = new Swiper(this.elem, {
      pagination: {
        el: this.pagers,
        type: 'fraction'
      },
      navigation: {
        nextEl: this.nextEl,
        prevEl: this.prevEl,
        disabledClass: 'is-disabled'
      },
      a11y: true,
      autoHeight: true,
      init: false
    });

    this.slideshow.on('slideChangeTransitionEnd', () => {
      const activeSlide = $('.swiper-slide-active', this.elem);
      const caption = $('figcaption', activeSlide);
      this.setSlideshowCaption(this.slideshowCaption, caption);
    });

    this.setSlideshowCaption(this.slideshowCaption, this.captions[0]);

    this.captions.forEach(hide);

    this.slideshow.init();

    this.nextEl.removeAttribute('role');
    this.prevEl.removeAttribute('role');
  }

  setSlideshowCaption(targetElem, captionElem) {
    if (captionElem && captionElem.textContent) {
      targetElem.innerHTML = captionElem.textContent.trim();
    }
  }
}

const elems = $$('.js-slideshow');

elems.forEach(elem => {
  const slide = new Slideshow(elem);

  on(window, 'load', () => {
    slide.init();
  });
});

export default Slideshow;

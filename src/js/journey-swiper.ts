import {
  Swiper,
  SwiperOptions,
  Navigation,
  Pagination,
  HashNavigation
} from 'swiper';
import { $, $$, checkElement } from './utils/dom';

class JourneySwiper {
  swiperEl: Swiper;
  elem: HTMLElement;
  swiperClass: string;
  paginationEl: HTMLElement;
  paginationClass: string;
  paginationDotEls: HTMLElement[];
  currentEl: HTMLElement;
  swiperParentEl: HTMLElement;
  swiperParentWrapperEl: HTMLElement;
  swiperConfig: SwiperOptions;
  translate: number;
  halfWindowWidth: number;
  hiddenWidth: number;
  timeout: NodeJS.Timeout;

  constructor(el: HTMLElement) {
    this.elem = el;
    this.swiperClass = '.mySwiper';
    this.paginationClass = '.swiper-pagination';
    this.paginationEl = $(this.paginationClass);
    this.swiperParentEl = $('.journey-modal__pagination');
    this.swiperParentWrapperEl = $('.journey-modal__pagination-wrapper');
    this.translate = 0;
    this.halfWindowWidth = window.innerWidth / 2;

    this.swiperUpdate = this.swiperUpdate.bind(this);
    this.resetNavigation = this.resetNavigation.bind(this);
    this.init();
  }

  init() {
    this.addListeners();
    this.swiperConfig = {
      modules: [Navigation, Pagination, HashNavigation],
      hashNavigation: {
        watchState: true
      },
      navigation: {
        nextEl: '.js-journey-next-button',
        prevEl: '.js-journey-prev-button'
      },
      pagination: {
        el: this.paginationClass,
        bulletClass: 'journey-modal__cb-link',
        clickable: true,
        renderBullet: function (index, className) {
          const labels = [
            'The Liberal Arts',
            'History of Middlebury',
            'Principles and Values',
            'Looking to the Future',
            'Vermont',
            'California',
            'World',
            'Engagement',
            'Justice',
            'Sustainability',
            'Culture'
          ];
          return `
            <a class="journey-modal__cb-link ${className}" href="#" role="button">
              <span class="cb-link__text">
                ${labels[index]}
              </span>
              <span class="cb-link__circle-wrapper">
                <span class="cb-link__circle inner"></span>
                <span class="cb-link__circle outer"></span>
              </span>
            </a>`;
        }
      },
      on: {
        paginationUpdate: () => {
          this.swiperUpdate();
        },
        slideNextTransitionStart: (swiper) => {
          swiper.allowSlideNext = false;
        },
        slideNextTransitionEnd: (swiper) => {
          swiper.allowSlideNext = true;
        },
        slidePrevTransitionStart: (swiper) => {
          swiper.allowSlidePrev = false;
        },
        slidePrevTransitionEnd: (swiper) => {
          swiper.allowSlidePrev = true;
        },
        hashSet: (swiper) => {
          console.log(window.location.hash);
        }
      }
    };

    this.swiperEl = new Swiper(this.swiperClass, this.swiperConfig);
  }

  addListeners() {
    checkElement('.journey-modal__cb-link').then((selector) => {
      this.paginationDotEls = $$(selector);
      this.paginationDotEls.forEach((el) => {
        el.addEventListener('mouseenter', (e) => {
          this.handleMouseEvent(e);
        });
        el.addEventListener('mouseleave', (e) => {
          this.handleMouseEvent(e);
        });
      });
    });

    window.addEventListener('resize', (e) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.resetNavigation, 250);
    });
  }

  resetNavigation() {
    this.halfWindowWidth = window.innerWidth / 2;
    this.swiperUpdate();
  }

  handleMouseEvent(e: MouseEvent) {
    const parentElem = (e.target as HTMLInputElement).parentElement;
    if (e.type === 'mouseenter') {
      parentElem.classList.add('show-label');
    } else if (e.type === 'mouseleave') {
      parentElem.classList.remove('show-label');
    }
  }

  /**
   * Case 1: Dot is on the right side of the center. Logic for this is:
   * 1. While pressing next, check if element is past the middle:
   *     i. if it is then move it to the center
   *     ii. if it is not, then don't do anything
   *     iii. if the element is past the middle, but it is the last or second last element, don't do anything
   * 2. While pressing prev, check if the element is past the middle to the left"
   *     i. if it is then move it to the center
   *     ii. if it is not, then don't do anything
   *     iii. if the element is past the middle, but it is the first or second last element, don't do anything
   */

  swiperUpdate() {
    this.currentEl = $('.swiper-pagination-bullet-active', this.paginationEl);

    this.hiddenWidth =
      this.swiperParentEl.scrollWidth - this.swiperParentWrapperEl.clientWidth;

    const currentElLeft = this.currentEl?.getBoundingClientRect().left;

    if (this.currentEl) {
      this.translate =
        this.translate + (this.halfWindowWidth - currentElLeft - 16);

      if (this.translate > 0) {
        this.translate = 0;
      }

      if (Math.abs(this.translate) > this.hiddenWidth) {
        this.translate = -this.hiddenWidth;
      }

      if (this.translate <= 0 && Math.abs(this.translate) <= this.hiddenWidth) {
        this.swiperParentEl.style.transform = `translateX(${this.translate}px)`;
      }
    }
  }
}

const swiper = $$('.mySwiper');

swiper.forEach((elem) => new JourneySwiper(elem));

export default JourneySwiper;

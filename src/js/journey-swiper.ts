import {
  Swiper,
  SwiperOptions,
  Navigation,
  A11y,
  Pagination,
  HashNavigation
} from 'swiper';
import { $, $$, checkElement } from './utils/dom';
import VideoSwap from './video';

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
  // videoElems: VideoSwap[];
  translate: number;
  halfWindowWidth: number;
  hiddenWidth: number;
  timeout: NodeJS.Timeout;
  activeVideoClass: string;

  constructor(el: HTMLElement) {
    this.elem = el;
    this.swiperClass = '.mySwiper';
    this.paginationClass = '.swiper-pagination';
    this.paginationEl = $(this.paginationClass);
    this.swiperParentEl = $('.journey-modal__pagination');
    this.swiperParentWrapperEl = $('.journey-modal__pagination-wrapper');
    this.activeVideoClass = 'has-video';
    this.translate = 0;
    this.halfWindowWidth = window.innerWidth / 2;

    this.swiperUpdate = this.swiperUpdate.bind(this);
    this.resetNavigation = this.resetNavigation.bind(this);
    this.init();
  }

  init() {
    this.addListeners();
    this.swiperConfig = {
      modules: [Navigation, Pagination, HashNavigation, A11y],
      autoHeight: true,
      hashNavigation: {
        replaceState: true,
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
          // this.resetVideoElem();
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
        }
      }
    };

    checkElement('.journey-modal--block.is-open').then(() => {
      this.swiperEl = new Swiper(this.swiperClass, this.swiperConfig);

      // Initialize video elements with VideoSwap class to enable showing/hiding videos
      this.initVideoElems();
    });
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

  initVideoElems() {
    // this.videoElems = [];

    // if (this.swiperEl.slides) {
    //   this.swiperEl.slides.forEach((elem: HTMLElement, id: number) => {
    //     if (elem.classList.contains('video-slide')) {
    //       this.videoElems.push(new VideoSwap($('.js-expand-video', elem)));
    //     } else {
    //       this.videoElems.push(null);
    //     }
    //   });
    // }
    $$('.js-expand-video', this.elem).forEach((elem) => new VideoSwap(elem));
  }

  // resetVideoElem() {
  //   let previousIndex = this.swiperEl?.previousIndex;

  //   if (
  //     previousIndex !== undefined &&
  //     this.videoElems[previousIndex] !== null
  //   ) {
  //     this.videoElems[previousIndex].hideVideo();
  //     this.videoElems[previousIndex] = new VideoSwap(
  //       $('.js-expand-video', this.swiperEl.slides[previousIndex])
  //     );
  //   }
  // }

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

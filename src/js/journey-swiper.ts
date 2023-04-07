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
  translate: number;
  halfWindowWidth: number;
  hiddenWidth: number;
  timeout: NodeJS.Timeout;
  activeVideoClass: string;

  constructor(el: HTMLElement) {
    this.elem = el;
    this.swiperClass = '.journey-swiper';
    this.paginationClass = '.swiper-pagination';
    this.paginationEl = $(this.paginationClass);
    this.swiperParentEl = $('.journey-modal__pagination');
    this.swiperParentWrapperEl = $('.journey-modal__pagination-wrapper');
    this.activeVideoClass = 'has-video';
    this.translate = 0;
    this.halfWindowWidth = window.innerWidth / 2;

    this.swiperInit = this.swiperInit.bind(this);
    this.swiperUpdate = this.swiperUpdate.bind(this);
    this.handleHashChange = this.handleHashChange.bind(this);
    this.resetNavigation = this.resetNavigation.bind(this);
    this.init();
  }

  elementOnLoad(cn: string, cb: (...args: any[]) => void) {
    checkElement(cn).then((selector) => {
      cb(selector);
    });
  }

  init() {
    this.swiperConfig = {
      autoHeight: true,
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
            'Why Middlebury',
            'Mentor-Student Partnerships',
            'Immersive Environments',
            'Alumni in the World',
            'Faculty in the News',
            'Students in Motion',
            '"Connected" Middlebury',
            'Middlebury College',
            'Graduate and Professional Schools'
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

    this.elementOnLoad('.journey-modal--block.is-open', () => {
      this.swiperInit();
    });
    this.addListeners();
  }

  swiperInit() {
    const modules = [Navigation, Pagination, A11y, HashNavigation];
    Swiper.use(modules);
    this.swiperEl = new Swiper(this.swiperClass, this.swiperConfig);

    // Initialize video elements with VideoSwap class to enable showing/hiding videos
    this.initVideoElems();
  }

  addListeners() {
    this.elementOnLoad('.journey-modal__cb-link', (selector) => {
      this.paginationDotEls = $$(selector);
      this.paginationDotEls.forEach((el) => {
        if (window.matchMedia('(min-width: 1024px)').matches) {
          el.addEventListener('mouseenter', (e) => {
            this.handleMouseEvent(e);
          });
          el.addEventListener('mouseleave', (e) => {
            this.handleMouseEvent(e);
          });
        }
      });
    });

    window.addEventListener('resize', (e) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.resetNavigation, 250);
    });

    window.addEventListener('hashchange', (e) => {
      this.elementOnLoad(
        '.journey-modal--block.is-open',
        this.handleHashChange
      );
    });
  }

  handleHashChange() {
    const hash = parseInt(window.location.hash.replace('#slide', ''));
    const { MicroModal } = window;

    if (isNaN(hash)) {
      MicroModal?.close();
    }
    if (hash !== this.swiperEl.activeIndex) {
      this.swiperEl.slideTo(hash, 350, false);
    }
    this.swiperUpdate();
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
    $$('.js-expand-video', this.elem).forEach((elem) => new VideoSwap(elem));
  }

  swiperUpdate() {
    this.currentEl = $('.swiper-pagination-bullet-active', this.paginationEl);
    let scrollWidth = this.swiperParentEl.scrollWidth;

    // Check if the scrolling distance exceeds the element width,
    // if it does set it to the element width so that it doesn't
    // scroll past the width
    if (scrollWidth > this.swiperParentEl.offsetWidth) {
      scrollWidth = this.swiperParentEl.offsetWidth;
    }

    this.hiddenWidth = scrollWidth - this.swiperParentWrapperEl.offsetWidth;

    const currentElLeft = this.currentEl?.getBoundingClientRect().left;
    const currentElX = this.currentEl?.getBoundingClientRect().x;
    const currentElRight = this.currentEl?.getBoundingClientRect().right;

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

export default JourneySwiper;

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
    this.swiperClass = '.mySwiper';
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

  init() {
    this.addListeners();
    this.swiperConfig = {
      // modules: [Navigation, Pagination, HashNavigation, A11y],
      autoHeight: true,
      hashNavigation: {
        // replaceState: true
        // watchState: true
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
        paginationUpdate: (swiper) => {
          this.swiperUpdate();
          // console.log(swiper);
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

    this.elementOnLoad('.journey-modal--block.is-open', this.swiperInit);
  }

  swiperInit() {
    const modules = [Navigation, Pagination, A11y, HashNavigation];
    Swiper.use(modules);
    this.swiperEl = new Swiper(this.swiperClass, this.swiperConfig);

    // Initialize video elements with VideoSwap class to enable showing/hiding videos
    this.initVideoElems();
  }

  elementOnLoad(cn: string, cb: (...args: any[]) => void) {
    checkElement(cn).then(() => {
      cb();
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

import MicroModal from 'micromodal';
import lozad from 'lozad';
import anime from 'animejs';

import { $, $$, on, off, addClass, removeClass } from './utils/dom';
import onscroll from './utils/onscroll';
import SmoothScroll from './smooth-scroll';

import { LEFT_ARROW_KEY, RIGHT_ARROW_KEY } from './constants';

class Lightbox {
  constructor(el) {
    this.el = el;

    this.nextBtn = $('[data-lightbox-next]', el);
    this.prevBtn = $('[data-lightbox-prev]', el);
    this.count = $('[data-lightbox-count]', el);
    this.closeBtn = $('[data-lightbox-close]', el);
    this.items = $$('[data-lightbox-item]', el);
    this.images = $$('[data-lightbox-item] img', el);
    this.thumbs = $$('[data-lightbox-thumb]', el);
    this.thumbsList = $('[data-lightbox-thumbs]', el);

    this.center = el.offsetHeight / 2;

    this.index = 0;
    this.total = this.items.length;
    this.isAnimating = false;
    this.isAnimatingThumb = false;

    this.observer = null;

    this.smoothScroller = null;

    this.init();
  }

  init() {
    this.addListeners();
    this.updateCount(this.index);

    setTimeout(() => {
      this.closeBtn.focus();
    }, 100);
  }

  updateCount(index) {
    this.count.innerHTML = `${index + 1}/${this.total}`;
  }

  destroy() {
    off(this.el, 'keyup', this.handleKeyUp);
    off(this.nextBtn, 'click', this.next);
    off(this.prevBtn, 'click', this.prev);

    this.smoothScroller.destroy();
    this.scrollRaf.destroy();
  }

  addListeners() {
    on(this.el, 'keyup', this.handleKeyUp);
    on(this.nextBtn, 'click', this.next);
    on(this.prevBtn, 'click', this.prev);

    this.scrollRaf = onscroll(this.el, this.handleScroll);

    this.smoothScroller = new SmoothScroll(this.thumbs, {
      container: this.el,
      scrollTop: (el, scrollPos) => {
        const rect = el.getBoundingClientRect();
        const centerEl = rect.height / 2;
        // vertically center the target in the middle of the lightbox
        const top = rect.top + scrollPos + centerEl - this.center;

        return top;
      },

      // set animating flag so we can skip updating active one when scrolling
      begin: () => {
        this.isAnimating = true;
      },

      // unset the animating flag when done
      complete: () => {
        this.isAnimating = false;
      }
    });

    // init lazy loaded images
    const lazyThumbs = lozad(
      '[data-lightbox-item] img, [data-lightbox-thumb] img'
    );
    lazyThumbs.observe();
  }

  handleScroll = () => {
    this.images.forEach((el, i) => {
      const rect = el.getBoundingClientRect();

      // if top of image is above center point
      // and bottom of image is below center point we can
      // assume it's the 'active' image in view

      // also do nothing if navigating to the already active image
      if (
        rect.top <= this.center &&
        rect.bottom >= this.center &&
        this.index !== i
      ) {
        this.setActive(i);
      }
    });
  };

  scrollThumbIntoView(index) {
    const thumb = this.thumbs[index];
    const rect = thumb.getBoundingClientRect();
    const listTop = this.thumbsList.offsetTop;
    const listHeight = this.thumbsList.offsetHeight;

    // if thumb top is more than the thumblist top
    // and thumb bottom is less than thumblist height + listtop
    // we can assume the thumb is in view already
    if (
      (rect.top >= listTop && rect.bottom <= listTop + listHeight) ||
      this.isAnimatingThumb
    ) {
      return;
    }

    // Use same animation settings as smooth scroller
    const { easing, elasticity, duration } = this.smoothScroller.config;

    anime({
      targets: this.thumbsList,
      scrollTop: thumb.offsetTop - this.thumbsList.scrollTop,
      easing,
      duration,
      elasticity,
      begin: () => {
        this.isAnimatingThumb = true;
      },
      complete: () => {
        this.isAnimatingThumb = false;
      }
    });
  }

  setActive(index) {
    const id = this.items[index].id;
    const link = $(`a[href="#${id}"]`, this.thumbsList);

    this.thumbs.forEach(el => {
      removeClass(el.closest('li'), 'active');
    });

    addClass(link.closest('li'), 'active');

    this.scrollThumbIntoView(index);

    this.index = index;

    this.updateCount(index);
  }

  handleKeyUp = event => {
    const { keyCode } = event;

    if (keyCode === RIGHT_ARROW_KEY) {
      this.next();
    } else if (keyCode === LEFT_ARROW_KEY) {
      this.prev();
    }
  };

  next = () => {
    this.scrollToImage(this.index + 1);
  };

  prev = () => {
    this.scrollToImage(this.index - 1);
  };

  scrollToImage(index) {
    // skip if animating, trying to go back from first item, or already at end of list
    if (this.isAnimating || index === -1 || index === this.total) {
      return;
    }

    const target = this.items[index];

    // use thumbnail smooth scroller instance to scroll to image with same animation
    // it already changes animating flag and has offset from initializes
    this.smoothScroller.scrollTo(target);
  }
}

MicroModal.init({
  openTrigger: 'data-lightbox-open',
  closeTrigger: 'data-lightbox-close',
  onShow: (modal, event) => {
    event.preventDefault();
    if (modal.hasAttribute('data-lightbox')) {
      modal.lightbox = new Lightbox(modal);
    }
  },
  onClose: modal => {
    if (modal.lightbox) {
      modal.lightbox.destroy();

      /**
       * Unset hidden overflow on body until fix is merged for ie11
       * https://github.com/ghosh/micromodal/pull/102
       **/
      document.body.style.height = '';
      document.body.style.overflow = '';
    }
  },
  disableScroll: true
});

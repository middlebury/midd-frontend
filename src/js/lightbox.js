import MicroModal from 'micromodal';
import lozad from 'lozad';

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

    // offset from top of screen, extra space to match design needs
    // TODO: either get this via js or change css so there's no need for it.
    this.offset = 128;

    this.index = 0;
    this.total = this.items.length;
    this.animating = false;

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
      complete: () => {
        this.animating = false;
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
      if (rect.top < this.center && rect.top + rect.height > this.center) {
        this.setActive(i);
      }
    });
  };

  setActive(index) {
    const id = this.items[index].id;
    const link = $(`a[href="#${id}"]`, this.thumbsList);

    this.thumbs.forEach(el => {
      removeClass(el.closest('li'), 'active');
    });

    addClass(link.closest('li'), 'active');

    link.scrollIntoView();

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
    console.log('scroll to', this.index, index);
    if (this.animating || index === -1 || index === this.total) {
      return;
    }

    this.animating = true;

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

import MicroModal from 'micromodal';
import lozad from 'lozad';

import { $, $$, on, off, addClass, removeClass } from './utils/dom';
import SmoothScroll from './smooth-scroll';

import { LEFT_ARROW_KEY, RIGHT_ARROW_KEY } from './constants';

class Lightbox {
  constructor(el) {
    this.el = el;

    // this.nextBtn = $('[data-lightbox-next]', el);
    // this.prevBtn = $('[data-lightbox-prev]', el);
    // this.count = $('[data-lightbox-count]', el);
    this.closeBtn = $('[data-lightbox-close]', el);
    this.items = $$('[data-lightbox-item]', el);
    this.thumbs = $$('[data-lightbox-thumb]', el);
    this.thumbsList = $('[data-lightbox-thumbs]', el);

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
    // this.updateCount(this.index);

    setTimeout(() => {
      this.closeBtn.focus();
    }, 100);
  }

  // updateCount(index) {
  //   this.count.innerHTML = `${index + 1}/${this.total}`;
  // }

  destroy() {
    off(this.el, 'keyup', this.handleKeyUp);
    // off(this.nextBtn, 'click', this.next);
    // off(this.prevBtn, 'click', this.prev);

    this.smoothScroller.destroy();

    this.items.forEach(item => {
      this.observer.unobserve(item);
    });
  }

  addListeners() {
    on(this.el, 'keyup', this.handleKeyUp);
    // on(this.nextBtn, 'click', this.next);
    // on(this.prevBtn, 'click', this.prev);

    this.smoothScroller = new SmoothScroll(this.thumbs, {
      container: this.el,
      offset: this.offset,
      complete: () => {
        this.animating = false;
      }
    });

    const options = {
      // margin: '0% 0% -50% 0%',
      // threshold: [0, 1]
      margin: '0% 0%',
      threshold: 1
    };

    this.observer = new IntersectionObserver(
      this.handleObserverChange,
      options
    );

    this.items.forEach(item => {
      this.observer.observe(item);
    });

    // init lazy loaded images
    const lazyThumbs = lozad(
      '[data-lightbox-item] img, [data-lightbox-thumb] img'
    );
    lazyThumbs.observe();
  }

  handleObserverChange = entries => {
    // reverse() so first item becomes highlighted
    entries.reverse().forEach(entry => {
      const link = $(`a[href="#${entry.target.id}"]`);
      const index = [].indexOf.call(this.thumbs, link);

      if (entry.intersectionRatio === 1) {
        this.thumbs.forEach(el => {
          removeClass(el.closest('li'), 'active');
        });

        addClass(link.closest('li'), 'active');

        link.scrollIntoView();

        this.index = index;

        // this.updateCount(index);
      }
    });
  };

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
  onShow: modal => {
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
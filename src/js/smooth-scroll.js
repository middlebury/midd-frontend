import anime from 'animejs';

import { $, $$, on, off } from './utils/dom';

/**
 * applies smooth scroll effect to a container of anchor (links with onpage targets) links
 */
class SmoothScroll {
  constructor(
    els,
    {
      offset = 0,
      scrollTop,
      container,
      easing = 'easeInCubic',
      duration = 300,
      elasticity = 500,
      ...rest
    } = {}
  ) {
    this.elems = typeof els === 'string' ? $$(els) : els;

    this.offset = offset;
    this.scrollTop = scrollTop;

    this.container = container;

    this.config = {
      duration,
      easing,
      elasticity,
      ...rest
    };

    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    this.elems.forEach(el => on(el, 'click', this.handleClick));
  }

  destroy() {
    this.elems.forEach(el => off(el, 'click', this.handleClick));
  }

  handleClick = event => {
    event.preventDefault();
    const selector = event.currentTarget.getAttribute('href');
    const targetEl = $(selector);

    this.scrollTo(targetEl);
  };

  scrollTo(elem) {
    const elementOffset = elem.getBoundingClientRect().top;

    let scrollPosition = window.pageYOffset;

    /**
     * Must be set to both elements for animejs.
     * See https://github.com/juliangarnier/anime/issues/197#issuecomment-314265652
     */
    let targets = [document.documentElement, document.body];

    let offset = 0;

    if (typeof this.offset === 'function') {
      offset = this.offset(elem);
    }

    if (this.container) {
      targets = this.container;
      scrollPosition = this.container.scrollTop;
    }

    const scrollTop =
      typeof this.scrollTop === 'function'
        ? this.scrollTop(elem, scrollPosition)
        : elementOffset + scrollPosition - offset;

    anime({
      scrollTop,
      targets,
      ...this.config
    });
  }
}

export default SmoothScroll;

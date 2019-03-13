import anime from 'animejs';

import { $, $$, on, off } from './utils/dom';

class SmoothScroll {
  constructor(
    els,
    {
      offset = 0,
      duration = 500,
      easing = 'linear',
      container,
      ...rest
    } = {}
  ) {
    this.elems = typeof els === 'string' ? $$(els) : els;

    this.offset = offset;

    this.container = container;

    this.config = {
      duration,
      easing,
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

    let scrollPosition = window.scrollY;

    /**
     * Must be set to both elements for animejs.
     * See https://github.com/juliangarnier/anime/issues/197#issuecomment-314265652
     */
    let targets = [document.documentElement, document.body];

    if (this.container) {
      targets = this.container;
      scrollPosition = this.container.scrollTop;
    }

    const scrollTop = elementOffset + scrollPosition - this.offset;

    anime({
      scrollTop,
      targets,
      ...this.config
    });
  }
}

export default SmoothScroll;

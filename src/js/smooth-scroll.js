import anime from 'animejs';

import { $, $$, on, off } from './utils/dom';

class SmoothScroll {
  constructor(
    els,
    {
      offset = 0,
      targets = [document.documentElement, document.body],
      duration = 500,
      easing = 'linear',
      ...rest
    } = {}
  ) {
    this.elems = typeof els === 'string' ? $$(els) : els;

    this.offset = offset;

    this.config = {
      targets,
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

    const scrollTop = targetEl.offsetTop + this.offset;

    anime({
      scrollTop,
      ...this.config
    });
  };
}

export default SmoothScroll;

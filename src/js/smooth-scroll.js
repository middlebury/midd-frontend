import anime from 'animejs';

import { $, $$, on, off } from './utils/dom';

/**
 * Applies smooth scroll effect to a container of anchor (links with onpage targets) links.
 * @class SmoothScroll
 *
 * @example
 * ```html
 * <ul class="nav">
 *  <li><a href="#target-1">target 1</a></li>
 *  <li><a href="#target-2">target 2</a></li>
 * </ul>
 *
 * <div>
 *  <section id="target-1">target 1 content</section>
 *  <section id="target-2">target 2 content</section>
 * </div>
 * ```
 *
 * ```js
 * const options = {};
 * const scroller = new SmoothScroll('.nav a', options)
 * ```
 */

/** This callback type is called scrollTop which overrides the default scrollTop function.
 * It is an optional property in the constructor options.
 * @callback scrollTop
 * @param {Element} elem - element scrolling to
 * @param {number} scrollPosition - current scroll position
 */

class SmoothScroll {
  /**
   * @param {string|Element} els  - selector or element which contain the anchor links
   * @param {object} [options] - config object with various settings for animation and more
   */
  constructor(els, options = {}) {
    /**
     * @prop {(number|function)} [offset] - an integer to offset the scroll by or a function which gets passeD the target element
     * @prop {scrollTop} [scrollTop] - override the scroll top
     * @prop {Element} [container] - the element to scroll
     * @prop {string} [easing] - animation easing. Options based on animejs easing https://animejs.com/documentation/#linearEasing
     * @prop {int} [duration] - animation speed duration for animejs
     * @prop {int} [elasticity] - animation elasticity for animejs
     * @prop {bool} [replaceState] - Updates the hash in the url with the target.
     * Uses history.replaceState instead of pushState to prevent bloating
     * browser history and to not break current back button behavior since the
     * digest nav did not update the url hash before.
     */
    const {
      offset = 0,
      scrollTop,
      container,
      easing = 'easeInCubic',
      duration = 300,
      elasticity = 500,
      replaceState = false
    } = options;

    this.elems = typeof els === 'string' ? $$(els) : els;

    this.offset = offset;
    this.scrollTop = scrollTop;

    this.options = {
      replaceState
    };

    this.container = container;

    this.config = {
      duration,
      easing,
      elasticity
    };

    this.init();
  }

  /**
   * initialize the widget
   */
  init() {
    this.addListeners();
  }

  /**
   * Add needed event listeners
   */
  addListeners() {
    this.elems.forEach(el => on(el, 'click', this.handleClick));
  }

  /**
   * Destroy the widget
   */
  destroy() {
    this.elems.forEach(el => off(el, 'click', this.handleClick));
  }

  /**
   * Handle link clicks
   * @param {Event} event - event for link click
   */
  handleClick = event => {
    event.preventDefault();
    const selector = event.currentTarget.getAttribute('href');
    const targetEl = $(selector);

    this.scrollTo(targetEl, selector);
  };

  /**
   * Scroll to an element with animation
   * @param {Element} elem - element to scroll to
   * @param {string} selector - selector for the target element
   */
  scrollTo(elem, selector) {
    const elementOffset = elem.getBoundingClientRect().top;

    let scrollPosition = window.pageYOffset;

    /**
     * Must be set to both elements for animejs.
     * See https://github.com/juliangarnier/anime/issues/197#issuecomment-314265652
     */
    let targets = [document.documentElement, document.body];

    const offset =
      typeof this.offset === 'function' ? this.offset(elem) : this.offset;

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
      ...this.config,
      complete: () => {
        this.onScrollDone(elem, selector);
      }
    });
  }

  /**
   * Callback to run on scroll animation completion.
   * @param {Element} elem - element scrolled to
   * @param {string} selector - selector for the target element
   */
  onScrollDone(elem, selector) {
    if (this.options.replaceState) {
      history.replaceState(null, null, document.location.pathname + selector);
    }
  }
}

export default SmoothScroll;

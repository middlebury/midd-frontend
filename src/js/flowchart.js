import anime from 'animejs';

import { $, $$, on, off, removeClass, addClass, hasClass } from './utils/dom';

/**
 * Creates a flowchart of question and answers a user can click through
 * to resolve on a final answer to the user based on their questions.
 *
 * @class Flowchart
 * @params el{HTML element} - html element that has data-flowchart attribute.
 *
 * @example html
 * <div data-flowchart>
 *  <div id="flowchart-item-1" data-flowchart-item>
 *    <h2>Do you like oranges?</h2>
 *    <a href="#flowchart-item-2" data-flowchart-btn>Yes</a>
 *    <a href="#flowchart-item-3" data-flowchart-btn>No</a>
 *  </div>
 *  <div id="flowchart-item-2" data-flowchart-item>
 *    <p>You like oranges.</p>
 *  </div>
 *  <div id="flowchart-item-3" data-flowchart-item>
 *    <p>You don't like oranges.</p>
 *  </div>
 * </div>
 *
 */
class Flowchart {
  constructor(el) {
    this.elem = el;

    this.items = $$('[data-flowchart-item]', el);
    this.btns = $$('[data-flowchart-btn]', el);

    this.btnActiveClass = 'radio__label--checked';
    this.itemActiveClass = 'flowchart__item--active';

    // Store the ids of answered questions so we can backtrack
    // if the user changes their answer to a given question
    this.shownIds = [];

    this.init();
  }

  init() {
    this.elem.setAttribute('aria-live', 'polite');

    // Hide all items except first question.
    this.items.forEach((el, i) => {
      el.setAttribute('tabindex', '-1');

      // Do nothing if iterating on the first item e.g. do not hide it
      if (i === 0) {
        // Add the first item to list of shown ids
        this.shownIds.push(el.id);
        addClass(el, this.itemActiveClass);
        return;
      }

      // hide other items
      el.hidden = true;
    });

    this.addListeners();
  }

  addListeners() {
    this.btns.forEach(btn => on(btn, 'click', this.handleBtnClick));
  }

  handleBtnClick = event => {
    event.preventDefault();

    const btn = event.target;
    const btnParent = btn.closest('[data-flowchart-item]');
    const targetId = btn.getAttribute('href').replace('#', '');
    const target = $('#' + targetId, this.elem);
    const itemIdIndex = this.shownIds.indexOf(btnParent.id);

    this.items.forEach(item => removeClass(item, this.itemActiveClass));

    // remove active state style from other answers in the chosen question
    const btns = $$(
      `[data-flowchart-item][hidden] [data-flowchart-btn],
      #${btnParent.id} [data-flowchart-btn]`,
      this.elem
    );

    // remove active state style from necessary buttons
    btns.forEach(el => removeClass(el, this.btnActiveClass));

    // set the chosen answer as active
    addClass(btn, this.btnActiveClass);

    // if the button being clicked is in a previous question
    if (itemIdIndex >= 0) {
      // get all the ids after the question with an answer being modified
      const afterCurrentItemIds = this.shownIds.filter(
        (id, index) => index > itemIdIndex
      );

      const beforeCurrentItemIds = this.shownIds.filter(
        (id, index) => index <= itemIdIndex
      );

      this.shownIds = beforeCurrentItemIds;

      // hide all items shown after the updated question
      afterCurrentItemIds.forEach(id => {
        const el = $('#' + id);
        el.hidden = true;
      });
    }

    // show the next target
    this.shownIds.push(targetId);

    target.removeAttribute('hidden');

    anime({
      targets: [target],
      translateX: [-40, 0],
      duration: 400
    });

    target.focus();
    if (!hasClass(target, 'flowchart__item--answer')) {
      addClass(target, this.itemActiveClass);
    }

    // // scroll the target to the center of the viewport
    const rect = target.getBoundingClientRect();
    const scrollPosition = window.pageYOffset;
    const scrollTop =
      rect.top + scrollPosition + rect.height / 2 - window.innerHeight / 2;

    anime({
      targets: [document.documentElement, document.body],
      scrollTop,
      easing: 'easeInCubic',
      duration: 400,
      elasticity: 500
    });
  };
}

const els = $$('[data-flowchart]');

els.forEach(el => new Flowchart(el));

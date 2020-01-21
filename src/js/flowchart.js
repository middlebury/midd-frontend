import anime from 'animejs';

import { $, $$, on, off } from './utils/dom';

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
    this.root = el;

    this.items = $$('[data-flowchart-item]', el);
    this.btns = $$('[data-flowchart-btn]', el);

    // store the answered ids so we can backtrack
    this.shownIds = [];

    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    // hide all items except first question
    this.items.forEach((el, i) => {
      // ensure the first item is shown
      if (i === 0) {
        this.shownIds.push(el.id);
        return;
      }

      // el.classList.add('opacity-50', 'hover:opacity-100');

      // show the first item
      el.hidden = true;
    });

    this.btns.forEach(btn => on(btn, 'click', this.handleBtnClick));
  }

  handleBtnClick = event => {
    event.preventDefault();

    const idSelector = event.target.getAttribute('href').replace('#', '');

    const target = $('#' + idSelector);
    const parent = event.target.closest('[data-flowchart-item]');

    const itemIdIndex = this.shownIds.indexOf(parent.id);

    // if the button being clicked is in a previous question
    // How do we know if it's in a prev question?
    // -> the id has been stored in shownIds
    if (itemIdIndex >= 0) {
      // get all the ids after the question with an answer being modified
      const afterCurrentItemIds = this.shownIds.filter(
        (id, index) => index > itemIdIndex
      );

      const beforeCurrentItemIds = this.shownIds.filter(
        (id, index) => index <= itemIdIndex
      );

      this.shownIds = beforeCurrentItemIds;

      // remove those ids from the shownIds / hide them

      // hide all items shown after the updated question
      afterCurrentItemIds.forEach(id => {
        const el = $('#' + id);
        el.hidden = true;
      });
    }

    // show the next target

    this.shownIds.push(idSelector);

    target.classList.remove('opacity-50');
    target.removeAttribute('hidden');

    // smooth scroll to the target

    const elementOffset = target.getBoundingClientRect().top;
    const scrollPosition = window.pageYOffset;

    anime({
      targets: [document.documentElement, document.body],
      scrollTop: elementOffset + scrollPosition,
      easing: 'easeInCubic',
      duration: 400,
      elasticity: 500
    });
  };
}

const els = $$('[data-flowchart]');

els.forEach(el => new Flowchart(el));

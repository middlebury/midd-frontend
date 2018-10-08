import debounce from 'lodash.debounce';
import 'element-closest';

import forEach from './utils/forEach';
import { $, $$, on, hide, show } from './utils/dom';

const ENABLED_CLASS = 'sifter-enabled';
const ACTIVE_CLASS = 'sifter-active';
const NO_RESULTS_CLASS = 'sifter-no-results';
const ITEM_ACTIVE_CLASS = 'sifter-item-active';
const ITEM_PARENT_ACTIVE_CLASS = 'sifter-item-parent-active';

const ITEM_SELECTOR = '[data-sifter-item]';
const ITEM_PARENT_SELECTOR = '[data-sifter-item-parent]';

class Sifter {
  constructor(elem) {
    this.elem = elem;
    this.input = $('[data-sifter-input]', elem);
    this.items = $$(ITEM_SELECTOR, elem);
    this.itemParents = $$(ITEM_PARENT_SELECTOR, elem);

    this.messageContainer = $('[data-sifter-message]', elem);
    this.noResultsValue = $('[data-sifter-no-results-value]', elem);
    this.noResultsTemplate = this.noResultsValue.getAttribute(
      'data-sifter-no-results-value'
    );

    this.init();
  }

  init() {
    on(this.input, 'input', debounce(this.handleInputChange, 200));
    this.elem.classList.add(ENABLED_CLASS);
  }

  setNoResultsValue(value) {
    const msg = this.noResultsTemplate.replace('{term}', value);
    this.noResultsValue.innerHTML = msg;
  }

  handleInputChange = event => {
    const { value } = event.target;

    if (!value || !value.trim()) {
      return this.reset();
    }

    this.sift(value);
  };

  reset() {
    this.elem.classList.remove(ACTIVE_CLASS);
    this.elem.classList.remove(NO_RESULTS_CLASS);

    hide(this.messageContainer);

    forEach(this.items, item => {
      item.classList.remove(ITEM_ACTIVE_CLASS);
    });

    forEach(this.itemParents, parent => {
      parent.classList.remove(ITEM_PARENT_ACTIVE_CLASS);
    });
  }

  sift(value) {
    this.reset();

    let matchedItems = [];

    forEach(this.items, item => {
      const title = item.getAttribute('data-sifter-item');

      const pattern = new RegExp(`${value}`, 'gi');
      const matches = title.match(pattern);

      if (matches) {
        matchedItems.push(item);
      }
    });

    if (matchedItems.length === 0) {
      this.setNoResultsValue(value);

      this.elem.classList.add(NO_RESULTS_CLASS);

      show(this.messageContainer);

      return;
    }

    hide(this.messageContainer);

    forEach(matchedItems, item => {
      const parent = item.closest(ITEM_PARENT_SELECTOR);
      this.elem.classList.add(ACTIVE_CLASS);
      item.classList.add(ITEM_ACTIVE_CLASS);

      if (parent) {
        parent.classList.add(ITEM_PARENT_ACTIVE_CLASS);
      }
    });
  }
}

const elems = $$('[data-sifter]');

forEach(elems, elem => new Sifter(elem));

export default Sifter;

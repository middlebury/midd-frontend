import debounce from 'lodash.debounce';
import 'element-closest';
import h from 'h';

import { $, $$, on, hide, show } from './utils/dom';

(function() {
  const ACTIVE_CLASS = 'has-results';
  const NO_RESULTS_CLASS = 'is-empty';
  const ITEM_ACTIVE_CLASS = 'is-active';
  const ITEM_PARENT_ACTIVE_CLASS = 'is-active';

  const elem = $('.js-offices');

  if (!elem) return;

  const button = $('.js-offices-button', elem);
  const input = $('.js-offices-input', elem);
  const items = $$('.js-offices-item', elem);
  const itemParents = $$('.js-offices-group', elem);
  const region = $('.js-offices-region', elem);

  const alertTemplate = 'No results found for &ldquo;{term}&rdquo;';
  const alert = h('div.alert.alert--info.js-offices-alert');

  function init() {
    on(input, 'input', debounce(handleInputChange, 200));

    input.setAttribute('aria-controls', region.getAttribute('id'));
    region.setAttribute('aria-live', true);

    button.disabled = true;
    button.style.opacity = '1';

    hide(alert);

    region.appendChild(alert);
  }

  function setNoResultsValue(value) {
    const msg = alertTemplate.replace('{term}', value);
    alert.innerHTML = msg;
  }

  function handleInputChange(event) {
    const { value } = event.target;

    if (!value || !value.trim()) {
      return reset();
    }

    sift(value);
  }

  function reset() {
    elem.classList.remove(ACTIVE_CLASS);
    elem.classList.remove(NO_RESULTS_CLASS);

    hide(alert);

    items.forEach(item => {
      item.classList.remove(ITEM_ACTIVE_CLASS);
    });

    itemParents.forEach(parent => {
      parent.classList.remove(ITEM_PARENT_ACTIVE_CLASS);
    });
  }

  function sift(value) {
    reset();

    let matchedItems = [];

    items.forEach(item => {
      const title = $('.js-offices-title', item).textContent;

      const pattern = new RegExp(`${value}`, 'gi');
      const matches = title.match(pattern);

      if (matches) {
        matchedItems.push(item);
      }
    });

    if (matchedItems.length === 0) {
      setNoResultsValue(value);

      elem.classList.add(NO_RESULTS_CLASS);

      show(alert);

      return;
    }

    hide(alert);

    matchedItems.forEach(item => {
      const parent = item.closest('.js-offices-group');
      elem.classList.add(ACTIVE_CLASS);
      item.classList.add(ITEM_ACTIVE_CLASS);

      if (parent) {
        parent.classList.add(ITEM_PARENT_ACTIVE_CLASS);
      }
    });
  }

  init();
})();

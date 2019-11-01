import debounce from 'lodash.debounce';
import 'element-closest';

import { $, $$, on, hide, show } from './utils/dom';

/**
 * handles on-page search of middlebury.edu/office listing
 */
(function() {
  const elem = $('.js-offices');

  if (!elem) {
    return;
  }

  const button = $('.js-offices-button', elem);
  const input = $('.js-offices-input', elem);
  const items = $$('.js-offices-item', elem);
  const region = $('.js-offices-region', elem);
  const toc = $('[data-digest-nav]');

  const alertTemplate = 'No results found for &ldquo;{term}&rdquo;';
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert--status', 'js-offices-alert');

  function setNoResultsValue(value) {
    const msg = alertTemplate.replace('{term}', value);
    alert.innerHTML = msg;
  }

  function hideAlert() {
    hide(alert);
  }

  function showAlert() {
    show(alert);
  }

  function showAll(items) {
    items.forEach(item => {
      // unsets hide so inline-block class shows it
      item.style.display = '';

      const parent = item.closest('.js-offices-group');
      show(parent);
    });
  }

  function hideAll(items) {
    items.forEach(item => {
      hide(item);

      const parent = item.closest('.js-offices-group');
      hide(parent);
    });
  }

  function findResults(value) {
    let matchedItems = [];

    items.forEach(item => {
      const title = $('.js-offices-title', item).textContent;

      const pattern = new RegExp(`${value}`, 'gi');
      const matches = title.match(pattern);

      if (matches) {
        matchedItems.push(item);
      }
    });

    return matchedItems;
  }

  function handleInputChange(event) {
    const { value } = event.target;

    hideAlert();

    if (!value || !value.trim()) {
      show(toc);
      return showAll(items);
    }

    hideAll(items);

    const matchedItems = findResults(value);

    if (matchedItems.length === 0) {
      setNoResultsValue(value);
      showAlert();
      hide(toc);
      return;
    }

    hide(toc);
    showAll(matchedItems);
  }

  function init() {
    on(input, 'input', debounce(handleInputChange, 200));

    input.setAttribute('aria-controls', region.getAttribute('id'));
    region.setAttribute('aria-live', true);

    button.disabled = true;
    button.style.opacity = '1';

    hideAlert();

    region.appendChild(alert);
  }

  init();
})();

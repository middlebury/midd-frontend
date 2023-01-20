import debounce from 'lodash/debounce';

import { $, $$, on, hide, show } from './utils/dom';

/**
 * handles on-page search of middlebury.edu/office listing
 */
(function () {
  const elem = $('#midd-main');

  if (!elem) {
    return;
  }

  const searchElem = $('.js-quicksearch-form', elem).dataset.searchElem;
  const input = $('.js-quicksearch-input', elem);
  const items = $$(searchElem, elem);

  const alertTemplate = 'No results found for &ldquo;{term}&rdquo;';
  const alert = document.createElement('div');
  alert.classList.add('alert', 'alert--status', 'js-quicksearch-alert');

  function setNoResultsValue(value: string) {
    const msg = alertTemplate.replace('{term}', value);
    alert.innerHTML = msg;
  }

  function hideAlert() {
    hide(alert);
  }

  function showAlert() {
    show(alert);
  }

  function showAll(items: HTMLElement[]) {
    items.forEach((item: any) => {
      // unsets hide so inline-block class shows it
      item.style.display = '';

      let current = item.nextElementSibling;
      while (current != null && current.nodeName != item.nodeName) {
        hide(current);
        current = current.nextElementSibling;
      }
    });
  }

  function hideAll(items: any) {
    items.forEach((item: any) => {
      hide(item);

      let current = item.nextElementSibling;
      while (current != null && current.nodeName != item.nodeName) {
        hide(current);
        current = current.nextElementSibling;
      }
    });
  }

  function findResults(value: any) {
    const matchedItems: any = [];

    items.forEach((item: HTMLElement) => {
      const title = item.textContent || '';

      const pattern = new RegExp(`${value}`, 'gi');
      const matches = title.match(pattern);

      if (matches) {
        matchedItems.push(item);
      }
    });

    return matchedItems;
  }

  function handleInputChange(event: Event) {
    const { value } = event.target as HTMLInputElement;

    hideAlert();

    if (!value || !value.trim()) {
      if (items.length) {
        showAll(items);
      }
      return;
    }

    hideAll(items);

    const matchedItems = findResults(value);

    if (matchedItems.length === 0) {
      setNoResultsValue(value);
      showAlert();
      return;
    }

    showAll(matchedItems);
  }

  function init() {
    if (input) {
      on(input, 'input', debounce(handleInputChange, 200));
    }

    hideAlert();
  }

  init();
})();

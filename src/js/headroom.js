import Headroom from 'headroom.js';

import { $ } from './utils/dom';

const headerElem = $('.js-headroom');

if (
  headerElem &&
  !$('#toolbar-administration') &&
  !window.matchMedia('print').matches // disable in print otherwise all pages have header
) {
  const offset = headerElem.offsetHeight;
  const headerInstance = new Headroom(headerElem, {
    offset
  });

  document.body.style.paddingTop = offset + 'px';

  headerInstance.init();
}

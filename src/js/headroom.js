import Headroom from 'headroom.js';

import { $ } from './utils/dom';

const headerElem = $('.js-headroom');

let offset;

if (headerElem && !$('#toolbar-administration')) {
  offset = headerElem.offsetHeight;

  const headerInstance = new Headroom(headerElem, {
    offset
  });

  if (!process.env.CI) {
    document.body.style.paddingTop = offset + 'px';
    headerInstance.init();
  }
}

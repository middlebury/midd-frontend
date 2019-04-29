import Headroom from 'headroom.js';

import { $ } from './utils/dom';

const headerElem = $('.js-headroom');

if (headerElem && !$('#toolbar-administration')) {
  const offset = headerElem.offsetHeight;
  const headerInstance = new Headroom(headerElem, {
    offset
  });

  document.body.style.paddingTop = offset + 'px';

  headerInstance.init();
}

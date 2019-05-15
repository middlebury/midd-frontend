import stickybits from 'stickybits';

import { $, $$ } from './utils/dom';

function createStickyElem(el) {
  // allow for custom offset based on data attribute selector
  const offsetAttr = el.getAttribute('data-sticky-offset');

  let offset = 0;

  if (isNaN(offsetAttr)) {
    const el = $(offsetAttr);
    offset = el ? el.offsetHeight : 0;
  } else {
    offset = offsetAttr || 0;
  }

  console.log(offsetAttr);

  let options = {};
  options.stickyBitStickyOffset = offset;

  stickybits(el, options);
}

const elems = $$('[data-sticky]');

elems.forEach(createStickyElem);

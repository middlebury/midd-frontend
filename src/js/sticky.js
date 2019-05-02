import stickybits from 'stickybits';

import { $, $$ } from './utils/dom';

const elems = $$('[data-sticky]');

elems.forEach(el => {
  // allow for custom offset based on data attribute selector
  const offsetSelector = el.getAttribute('data-sticky-offset');
  const offsetEl = $(offsetSelector);

  let options = {};

  if (offsetEl) {
    options.stickyBitStickyOffset = offsetEl.offsetHeight;
  }

  stickybits(el, options);
});

import onresize from 'onresize';
import Headroom from 'headroom.js';

import { $ } from './utils/dom';

let headerInstance;
let cachedOffset = 0;

const isHidden = el => {
  const s = getComputedStyle(el);
  return s.display === 'none' || s.visibility === 'hidden';
};

const initStickyHeader = (elem, offset) => {
  // set the top padding so content does not get hidden under sticky header
  headerInstance = new Headroom(elem, {
    offset
  });

  document.body.style.paddingTop = offset + 'px';

  headerInstance.init();
};

const getOffset = elem => {
  /**
   * Allow headroom to be offset by a different element than the header itself.
   *
   * If it was offset by the header itself, it creates a gap of white space under the
   * school navigation since the logo extends past the nav.
   */
  const offsetSelector = elem.getAttribute('data-headroom-offset-target');
  const offsetEl = $(offsetSelector);

  const offset =
    offsetEl && !isHidden(offsetEl) ? offsetEl.offsetHeight : elem.offsetHeight;

  return offset;
};

const headerElem = $('.js-headroom');
if (headerElem) {
  const offset = getOffset(headerElem);
  initStickyHeader(headerElem, offset);

  onresize.on(() => {
    const offset = getOffset(headerElem);

    if (offset !== cachedOffset) {
      cachedOffset = offset;

      headerInstance.destroy();
      initStickyHeader(headerElem, offset);
    }
  });
}

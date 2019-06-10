import AnchorJS from 'anchor-js';
import SmoothScroll from './smooth-scroll';
import h from 'h';

import { $, $$ } from './utils/dom';
import MenuSpy from './menu-spy';

import { isLargeUp } from './utils/media';

class Digest {
  constructor(elem) {
    this.elem = elem;

    this.init();
  }

  init() {
    const anchors = new AnchorJS();

    const headingSelector = '[data-digest-content] h2';

    anchors.add(headingSelector);

    const headings = $$(headingSelector);

    let items = [];
    headings.forEach(heading => {
      const link = h(
        'a.digest__link',
        { href: '#' + heading.id },
        heading.textContent
      );

      const item = h('li.digest__item', {}, link);

      items.push(item);
    });

    const list = h('ol.digest__list', null, items);
    const title = h('h2.digest__title#midd-digest-label', null, 'On This Page');
    const nav = h(
      'nav.digest',
      {
        'aria-labelledby': 'midd-digest-label'
      },
      title,
      list
    );

    this.elem.appendChild(nav);

    new MenuSpy(nav);

    let offset = 0;
    // TODO: don't tie the js-headroom to this widget as the element.
    // we should allow for a custom selector
    const headroom = $('.js-headroom');

    if (headroom) {
      // set offset to be a function so media is checked each time
      offset = () => (isLargeUp() ? headroom.offsetHeight : 0);
    }

    new SmoothScroll('.digest__link', {
      offset
    });

    if (location.hash) {
      const el = $(location.hash);

      // fake jump to elem since headings don't have IDs until js is loaded
      if (el) {
        setTimeout(() => {
          el.scrollIntoView();
        }, 300);
      }
    }
  }
}

const elems = $$('[data-digest-nav]');

elems.forEach(elem => new Digest(elem));

export default Digest;

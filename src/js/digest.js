import AnchorJS from 'anchor-js';
import SmoothScroll from 'smooth-scroll';
import MenuSpy from 'menuspy';
import h from 'h';

import forEach from './utils/forEach';
import { $$ } from './utils/dom';

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
    forEach(headings, heading => {
      const link = h(
        'a.digest__link',
        { href: '#' + heading.id },
        heading.textContent
      );

      const item = h('li.digest__item', {}, link);

      items.push(item);
    });

    const list = h('ol.digest__list', null, items);
    const title = h('h2.digest__title', null, 'Sections');
    const nav = h('nav.digest', null, title, list);

    this.elem.appendChild(nav);

    new MenuSpy(nav, {
      enableLocationHash: false
    });

    // TODO: consider using animejs instead
    new SmoothScroll('.digest__link');
  }
}

const elems = $$('[data-digest-nav]');

forEach(elems, elem => new Digest(elem));

export default Digest;

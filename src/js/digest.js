import AnchorJS from 'anchor-js';
import SmoothScroll from 'smooth-scroll';
import h from 'h';

import { $$ } from './utils/dom';
import MenuSpy from './menu-spy';

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
    const title = h('h2.digest__title', null, 'Sections');
    const nav = h('nav.digest', null, title, list);

    this.elem.appendChild(nav);

    new MenuSpy(nav);

    // TODO: consider using animejs instead
    new SmoothScroll('.digest__link');
  }
}

const elems = $$('[data-digest-nav]');

elems.forEach(elem => new Digest(elem));

export default Digest;

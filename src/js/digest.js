import AnchorJS from 'anchor-js';
import h from 'h';

import forEach from './utils/forEach';
import { $, $$ } from './utils/dom';

class Digest {
  constructor(elem) {
    this.elem = elem;

    this.nav = $(`[data-digest-nav]`);
    this.headingSelector = `[data-digest-content] h2`;

    this.init();
  }

  init() {
    const anchors = new AnchorJS();

    anchors.add(this.headingSelector);

    const headings = $$(this.headingSelector);

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
    const nav = h('nav.digest__nav', null, title, list);

    this.nav.appendChild(nav);
  }
}

const elems = $$('[data-digest-content]');

forEach(elems, elem => new Digest(elem));

export default Digest;

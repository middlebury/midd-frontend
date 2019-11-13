import { h, render } from 'preact';
import AnchorJS from 'anchor-js';
import SmoothScroll from './smooth-scroll';

import { $, $$ } from './utils/dom';
import MenuSpy from './menu-spy';

import { isLargeUp } from './utils/media';

const DigestNav = ({ items = [] }) => {
  return (
    <nav className="digest" aria-labelledby="midd-digest-label">
      <h2 className="digest__title" id="midd-digest-label">
        On this page
      </h2>
      <ol className="digest__list">
        {items.map((item, i) => {
          return (
            <li key={i} className="digest__item">
              <a href={`#${item.id}`} className="digest__link">
                {item.textContent}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

class Digest {
  constructor(elem) {
    this.elem = elem;

    this.init();
  }

  init() {
    // Store the selector since we need to manually update headings
    // as well as apply AnochrJS to them.
    const headingSelector = '[data-digest-content] h2';

    // Get all headings in the data-digest-content
    const headings = $$(headingSelector);

    // create a new instance of anchorjs which creates the anchor links within each heading
    const anchors = new AnchorJS();
    anchors.add(headingSelector);

    // ensure all heading ids start with a-z
    headings.forEach(heading => {
      // if heading text begins with a number, we need to prefix some a-z text
      // so selectors in digest nav are valid
      // check if the first char is a number
      if (!isNaN(heading.id.charAt(0))) {
        const newId = 'section-' + heading.id;
        heading.id = newId;
        const anchor = $('a', heading);
        anchor.href = '#' + newId;
      }
    });

    render(
      <DigestNav
        // convert nodelist into array for items prop
        items={[].slice.call(headings)}
      />,
      this.elem
    );

    new MenuSpy(this.elem);

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

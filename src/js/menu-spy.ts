import { $, $$ } from './utils/dom';

/**
 * Takes a list of anchor links and watches each of their targets to see if they're
 * within the center of the viewport, so their active class can be added. Use in table of contents and
 * highlighting the current section viewed on the page.
 *
 * Commonly used in combination with anchor-js (which auto adds the ids to any headings on the page)
 * and digest.js (which creates the menu of links FROM those newly created headings with ids)
 *
 */
class MenuSpy {
  activeClass: any;
  elem: any;
  links: any;
  root: any;
  /**
   * @param {string\DOMelement} elem - the selector for an element or a dom node to watch links within
   * @param {object} - config options for changing root element to use in IntersectionObserver
   */
  constructor(elem: any, { root = null } = {}) {
    this.activeClass = 'active';

    this.root = root;

    this.elem = typeof elem === 'string' ? $(elem) : elem;

    this.links = $$('a[href^="#"]:not([href="#"])', this.elem);

    this.init();
  }

  // start observing each anchor link target to watch
  init() {
    const options = {
      root: this.root,
      rootMargin: '0% 0% -50% 0%', // center of viewport
      threshold: [0, 1]
    };

    const observer = new IntersectionObserver(this.onChange, options);

    this.links.forEach((link: any) => {
      const selector = link.getAttribute('href');
      const el = $(selector);

      observer.observe(el);
    });
  }

  removeActiveClass() {
    const activeLink = $(`.${this.activeClass}`, this.elem);

    if (activeLink) {
      activeLink.classList.remove(this.activeClass);
    }
  }

  // handle intersection observer events
  onChange = (changes: any) => {
    // reverse the changes else the last item becomes highlighted
    // due to it being out of view and triggering the else if
    changes.reverse().forEach((change: any) => {
      const { id } = change.target;
      const link = $(`a[href="#${id}"]`, this.elem);

      // if the element is fully in view, add the active class
      if (change.intersectionRatio === 1) {
        this.removeActiveClass();

        link.parentElement.classList.add(this.activeClass);
      }
      // highlights the previous item after a heading moves just under center of viewport
      else if (
        // when section goes out
        change.intersectionRatio === 0 &&
        // check if positive number i.e. below the center of viewport
        change.boundingClientRect.y > 0
      ) {
        // get the index of the current active item
        // @ts-expect-error ts-migrate(2578) FIXME: Unused '@ts-expect-error' directive.
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
        const idx = [].indexOf.call(this.links, link);

        // do nothing if there's no previous items
        if (idx === 0) {
          return;
        }

        // find the previous section link
        const prevLink = this.links[idx - 1];

        const item = prevLink.parentElement;

        this.removeActiveClass();

        item.classList.add(this.activeClass);
      }
    });
  };
}

export default MenuSpy;

import { $, $$ } from './utils/dom';

class MenuSpy {
  constructor(elem, { root = null } = {}) {
    this.activeClass = 'active';

    this.root = root;

    this.elem = typeof elem === 'string' ? $(elem) : elem;

    this.links = $$('a[href^="#"]:not([href="#"])', this.elem);

    this.init();
  }

  init() {
    const options = {
      root: this.root,
      rootMargin: '0% 0% -50% 0%', // center of viewport
      threshold: [0, 1]
    };

    const observer = new IntersectionObserver(this.onChange, options);

    this.links.forEach(link => {
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

  onChange = changes => {
    // reverse the changes else the last item becomes highlighted
    // due to it being out of view and triggering the else if
    changes.reverse().forEach(change => {
      const id = change.target.id;
      const link = $(`a[href="#${id}"]`, this.elem);

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

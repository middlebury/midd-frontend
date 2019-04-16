import { $, $$, on, off } from './utils/dom';

class Dropdown {
  constructor(elem) {
    this.elem = elem;

    this.btn = $('[data-dropdown-button]', elem);
    this.menu = $('[data-dropdown-menu]', elem);

    this.activeClass = 'is-active';
    this.isOpen = false;

    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    on(window, 'click', this.handleWindowClick);
    on(window, 'touchstart', this.handleWindowClick);

    on(this.elem, 'keyup', this.handleElemKeyup);

    on(this.btn, 'click', this.toggle);
  }

  destroy() {
    off(window, 'click', this.handleWindowClick);
    off(window, 'touchstart', this.handleWindowClick);

    off(this.elem, 'keyup', this.handleElemKeyup);

    off(this.btn, 'click', this.toggle);

    this.hide();
  }

  handleElemKeyup = e => {
    if (e.keyCode === 27) {
      this.hide();
      this.focusBtn();
    }
  };

  focusBtn() {
    this.btn.focus();
  }

  handleWindowClick = e => {
    const node = this.elem;

    if (event.target !== node && !node.contains(event.target)) {
      this.hide();
    }
  };

  toggle = () => {
    if (this.isOpen) {
      this.hide();
    } else {
      this.show();

      this.focusFirst();
    }
  };

  focusFirst() {
    const el = $('a', this.menu);
    el.focus();
  }

  hide() {
    this.elem.classList.remove(this.activeClass);
    this.btn.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
  }

  show() {
    this.elem.classList.add(this.activeClass);
    this.btn.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
  }
}

const elems = $$('[data-dropdown]');

elems.forEach(elem => new Dropdown(elem));

export default Dropdown;

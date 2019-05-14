import enquire from 'enquire.js';

import { $, $$ } from './utils/dom';

// TODO: switch enquire to matchMedia.addListener
class Mover {
  constructor(elem) {
    this.elem = elem;

    this.mediaQuery = elem.getAttribute('data-move-at');
    this.targetSelector = elem.getAttribute('data-move-to');

    this.targetEl = $(this.targetSelector);

    this.init();
  }

  init() {
    if (!this.mediaQuery || !this.targetEl) {
      return;
    }

    enquire.register(this.mediaQuery, {
      match: this.handleMatch,
      unmatch: this.handleUnmatch
    });
  }

  handleMatch = () => {
    /**
     * Query all child nodes of elem.
     *
     * this.elem.childNodes[0] doesn't work since this.elem is cached when
     * the widget is first instantiated.
     *
     * TODO: wildcard selector is probably slow so we should optimize this.
     */
    const el = $$('*', this.elem)[0];

    this.targetEl.appendChild(el);
  };

  handleUnmatch = () => {
    // Requery child nodes for since they are cached in targetEl.
    // Same problem as handleMatch.
    const el = $(this.targetSelector).childNodes[0];

    this.elem.appendChild(el);
  };
}

const els = $$('[data-move-to]');

els.forEach(el => new Mover(el));

export default Mover;

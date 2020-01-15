import { $, $$ } from './utils/dom';

/**
 * Moves DOM elements around on the page based a breakpoint.
 *
 * Example:
 *
 * <div data-move-at="(min-width:768px)" data-move-to=".js-some-div">move me</div>
 *
 * will move the contents of the div into the data-move-to selector element.
 * It will move the contents BACK after going back under the given breakpoint.
 *
 * warning: does not work if contents requires javascript to function.
 * This is because the html is read and recreated which won't have its original event listeners.
 */
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

    const mql = window.matchMedia(this.mediaQuery);

    if (mql.matches) {
      this.handleMatch();
    }

    mql.addListener(this.handleMediaChange);
  }

  handleMediaChange = event => {
    if (event.matches) {
      return this.handleMatch();
    }

    this.handleUnmatch();
  };

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

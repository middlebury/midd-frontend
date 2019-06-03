import { $, $$, on, off } from './utils/dom';

/**
 * Accessible tabs widget
 *
 * Adapted from https://inclusive-components.design/tabbed-interfaces/
 */
class Tabs {
  constructor(el) {
    this.elem = el;

    this.tablist = $('[data-tabs-list]', el);
    this.tabs = $$('[data-tabs-tab]', el);
    this.panels = $$('[data-tabs-panel]', el);

    this.init();
  }

  init() {
    // Add the tablist role to the first <ul> in the .tabbed container
    this.tablist.setAttribute('role', 'tablist');

    // Add semantics are remove user focusability for each tab
    this.tabs.forEach((tab, i) => {
      tab.setAttribute('role', 'tab');
      // TODO: ids need to be unique on page
      tab.setAttribute('id', 'tab' + (i + 1));
      tab.setAttribute('tabindex', '-1');
      tab.parentNode.setAttribute('role', 'presentation');
    });

    // Add tab panel semantics and hide them all
    this.panels.forEach((panel, i) => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('tabindex', '-1');
      panel.setAttribute('aria-labelledby', this.tabs[i].id);
      panel.hidden = true;
    });

    // Initially activate the first tab and reveal the first tab panel
    this.tabs[0].removeAttribute('tabindex');
    this.tabs[0].setAttribute('aria-selected', 'true');
    this.panels[0].hidden = false;

    this.addListeners();
  }

  addListeners() {
    this.tabs.forEach((tab, i) => {
      // Handle clicking of tabs for mouse users
      on(tab, 'click', this.handleTabClick);

      // Handle keydown events for keyboard users
      on(tab, 'keydown', e => this.handleTabKeyDown(e, i));
    });
  }

  handleTabClick = e => {
    e.preventDefault();
    let currentTab = $('[aria-selected]', this.tablist);
    if (e.currentTarget !== currentTab) {
      this.switchTab(currentTab, e.currentTarget);
    }
  };

  handleTabKeyDown = (e, i) => {
    // Get the index of the current tab in the tabs node list
    let index = [].indexOf.call(this.tabs, e.currentTarget);
    // Work out which key the user is pressing and
    // Calculate the new tab's index where appropriate
    let dir =
      e.which === 37
        ? index - 1
        : e.which === 39
          ? index + 1
          : e.which === 40
            ? 'down'
            : null;

    if (!dir) {
      return;
    }

    e.preventDefault();

    // If the down key is pressed, move focus to the open panel,
    // otherwise switch to the adjacent tab
    if (dir === 'down') {
      return this.panels[i].focus();
    }

    if (tabs[dir]) {
      this.switchTab(e.currentTarget, this.tabs[dir]);
    }
  };

  switchTab = (oldTab, newTab) => {
    newTab.focus();
    // Make the active tab focusable by the user (Tab key)
    newTab.removeAttribute('tabindex');
    // Set the selected state
    newTab.setAttribute('aria-selected', 'true');
    oldTab.removeAttribute('aria-selected');
    oldTab.setAttribute('tabindex', '-1');
    // Get the indices of the new and old tabs to find the correct
    // tab panels to show and hide
    let index = [].indexOf.call(this.tabs, newTab);
    let oldIndex = [].indexOf.call(this.tabs, oldTab);
    this.panels[oldIndex].hidden = true;
    this.panels[index].hidden = false;
  };
}

const tabs = $$('[data-tabs]');
tabs.forEach(el => new Tabs(el));

export default Tabs;

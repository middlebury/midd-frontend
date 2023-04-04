import { $$ } from './utils/dom';

let defaultOptions = {
  container: document.body,
  panelSelector: '.journey section',
  directionThreshold: 200,
  delay: 0,
  duration: 150,
  easing: function (t: any) {
    return t;
  }
};

async function lazyLoadPanelSnap() {
  const { default: PanelSnap } = await import('panelsnap');

  journey.forEach(() => new PanelSnap(defaultOptions));
}

const journey = $$('.journey');

if (journey.length !== 0) {
  lazyLoadPanelSnap();
}

import { $$ } from './utils/dom';
import { PREFERS_REDUCED_MOTION } from './utils/prefers-reduced-motion';

let defaultOptions = {
  container: document.body,
  panelSelector: '.journey section',
  directionThreshold: 20,
  delay: 0,
  duration: 600,
  easing: function (t: any) {
    return t;
  }
};

async function lazyLoadPanelSnap() {
  if (
    window.matchMedia('(min-width: 1024px)').matches &&
    !PREFERS_REDUCED_MOTION
  ) {
    const { default: PanelSnap } = await import(
      /* webpackChunkName: "panelsnap" */ 'panelsnap'
    );

    journey.forEach(() => new PanelSnap(defaultOptions));
  }
}

const journey = $$('.journey');

if (journey.length !== 0) {
  lazyLoadPanelSnap().catch(
    (error) => 'An error occurred while loading panelsnap'
  );
}

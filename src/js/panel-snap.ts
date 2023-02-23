import PanelSnap from 'panelsnap';
import { $$ } from './utils/dom';

let defaultOptions = {
  container: document.body,
  panelSelector: '.journey section',
  directionThreshold: 10,
  delay: 0,
  duration: 300,
  easing: function (t: any) {
    return t;
  }
};

const journey = $$('.journey');

journey.forEach(() => new PanelSnap(defaultOptions));

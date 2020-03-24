import { $ } from './utils/dom';
import onscroll from './utils/onscroll';

import SmoothScroll from './smooth-scroll';

const btn = $('.js-to-top-btn');
btn.hidden = true;

new SmoothScroll('.js-to-top-btn');

// Set threshold to 3x browser height so we don't
// show the button on short pages.
const threshold = window.innerHeight * 3;

const updateBtn = () => {
  if (window.pageYOffset > threshold) {
    btn.hidden = false;
  } else {
    btn.hidden = true;
  }
};

onscroll(updateBtn);

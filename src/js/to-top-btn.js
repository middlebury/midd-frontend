import { $ } from './utils/dom';
import onscroll from './utils/onscroll';

import SmoothScroll from './smooth-scroll';

const btn = $('.js-to-top-btn');
btn.hidden = true;

// Pass the button as an array since smooth scroll expects a selector or
// array of items currently.
const btnSmoothScroll = new SmoothScroll([btn]);

// Set the required scroll length to 3x browser height so we don't
// show the button on short pages.
const threshold = window.innerHeight * 3;

const hideOrShowBtn = () => {
  if (window.pageYOffset > threshold) {
    btn.hidden = false;
  } else {
    btn.hidden = true;
  }
};

onscroll(hideOrShowBtn);

import { $ } from './utils/dom';
import onscroll from './utils/onscroll';

import SmoothScroll from './smooth-scroll';

function makeToTopBtn(btn: HTMLElement, threshold: number = 3) {
  btn.hidden = true;

  // Pass the button as an array since smooth scroll expects a selector or
  // array of items currently.
  const btnSmoothScroll = new SmoothScroll([btn]);

  // Set the required scroll length to 3x browser height so we don't
  // show the button on short pages.
  // const totalThreshold = window.innerHeight * threshold;

  // const hideOrShowBtn = () => {
  //   if (window.pageYOffset > totalThreshold) {
  //     btn.hidden = false;
  //   } else {
  //     btn.hidden = true;
  //   }
  // };

  let lastScrollTop = 0;

  onscroll(() => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
      btn.hidden = false;
    } else if (st < lastScrollTop) {
      btn.hidden = true;
    }
    lastScrollTop = st <= 0 ? 0 : st;
  });
}

const btn = $('.js-to-top-btn');
const homepageBtn = $('.js-journey-to-top-btn');

if (btn) {
  makeToTopBtn(btn);
}

if (homepageBtn) {
  makeToTopBtn(homepageBtn, 3.75);
}

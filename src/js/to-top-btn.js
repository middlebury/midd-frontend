import { $ } from './utils/dom';
import onscroll from './utils/onscroll';

const btn = $('.js-to-top-btn');
btn.hidden = true;


// Set threshold to 4x client height so we don't
// show the button on short pages.
const threshold = window.innerHeight * 4;

const updateBtn = () => {
  if (window.pageYOffset > threshold) {
    btn.hidden = false;
  } else {
    btn.hidden = true;
  }
};

onscroll(updateBtn);

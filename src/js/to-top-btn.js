import { $ } from './utils/dom';

const btn = $('.js-to-top-btn');
btn.hidden = true;

let timeout;

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

function handleScroll(event) {
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }

  timeout = window.requestAnimationFrame(updateBtn);
}

window.addEventListener('scroll', handleScroll, false);

import Headroom from 'headroom.js';

const headerElem = document.querySelector('.js-site-header');

const header = new Headroom(headerElem, {
  offset: headerElem.offsetHeight
});

header.init();

document.querySelector('body').style.paddingTop =
  headerElem.offsetHeight + 'px';

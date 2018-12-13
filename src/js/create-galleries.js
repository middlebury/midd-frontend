import { h, render } from 'preact';

import { $, $$ } from './utils/dom';

import Gallery from './components/gallery';

const galleries = $$('[data-gallery]');

galleries.forEach(root => {
  let data = {};

  const galleryData = root.getAttribute('data-gallery');
  const ariaSelector = root.getAttribute('aria-labelledby');
  const ariaLabelElem = root.querySelector('#' + ariaSelector);
  const ariaLabel = ariaLabelElem ? ariaLabelElem.textContent : '';

  try {
    data = JSON.parse(galleryData);
  } catch (e) {
    console.log(e);
  }

  root.innerHTML = '';

  render(<Gallery images={data} label={ariaLabel} />, root);
});

import { h, render } from 'preact';

import { $, $$ } from './utils/dom';

import Gallery from './components/gallery';

const galleries = $$('[data-gallery]');

galleries.forEach(root => {
  let data = {};

  const galleryData = root.getAttribute('data-gallery');

  try {
    data = JSON.parse(galleryData);
  } catch (e) {
    console.log(e);
  }

  root.innerHTML = '';

  render(<Gallery images={data} />, root);
});

export default Gallery;

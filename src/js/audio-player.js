import { h, render } from 'preact';

import { $$ } from './utils/dom';

import AudioPlayer from './components/audio';

const elems = $$('.js-audio');

elems.forEach(elem => {
  const root = document.createElement('div');

  render(<AudioPlayer audio={elem} />, root);

  elem.style.display = 'none';

  elem.parentNode.insertBefore(root, elem.nextSibling);
});

import { h, render } from 'preact';

import { $$ } from './utils/dom';

import AudioPlayer from './components/audio';

const audioWrappers = $$('.js-audio');

audioWrappers.forEach(wrapper => {
  const root = document.createElement('div');

  const audioElem = wrapper.querySelector('audio');

  render(<AudioPlayer audio={audioElem} />, root);

  wrapper.style.display = 'none';

  wrapper.parentNode.insertBefore(root, wrapper.nextSibling);
});

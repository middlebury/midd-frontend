import { h, render } from 'preact';

import { $$ } from './utils/dom';

import AudioPlayer from './components/audio';

const audioWrappers = $$('.js-audio');

audioWrappers.forEach((wrapper: HTMLElement, index: number) => {
  const root = document.createElement('div');

  const audioElem = wrapper.querySelector('audio') as HTMLAudioElement;

  render(<AudioPlayer audio={audioElem} id={`audio-player-${index}`} />, root);

  wrapper.style.display = 'none';

  wrapper.parentNode?.insertBefore(root, wrapper.nextSibling);
});

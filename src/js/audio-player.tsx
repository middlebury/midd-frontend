import { h, render } from 'preact';

import { $$ } from './utils/dom';

import AudioPlayer from './components/audio';

const audioWrappers = $$('.js-audio');

audioWrappers.forEach((wrapper: HTMLElement, index: number) => {
  const root = document.createElement('div');

  const audioElem = wrapper.querySelector('audio') as HTMLAudioElement;

  const titleElemId = `${wrapper.querySelector('.audio__title')?.id}`;

  const { btnOnly, size, outline, playIcon } = wrapper.dataset;

  const props = {
    id: `audio-player-${index}`,
    titleId: titleElemId,
    btnOnly: btnOnly !== undefined,
    outline: outline !== undefined,
    audio: audioElem,
    playIcon,
    size
  };

  render(<AudioPlayer {...props} />, root);

  audioElem.style.display = 'none';
  audioElem.parentNode?.insertBefore(root, audioElem.nextSibling);
});

import $clamp from 'clamp-js-main';

const waveforms = document.querySelectorAll('.waveform__event-card__content--text p');

waveforms.forEach((elem: HTMLElement) => {
  $clamp(elem, { clamp: 'auto' });
});

import MultiClamp from 'multi-clamp';

new MultiClamp(document.querySelectorAll('.waveform__event-card__content--text'), {
  ellipsis: '...',
  clamp: 'auto'
});

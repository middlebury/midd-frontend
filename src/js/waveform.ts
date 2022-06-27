import Superclamp from 'superclamp';

Superclamp.register(document.querySelectorAll('.waveform__event-card__content--text'));

window.addEventListener('click', Superclamp.reclampAll);

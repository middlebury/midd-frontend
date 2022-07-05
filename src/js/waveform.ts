import Superclamp from 'superclamp';

Superclamp.register(
  document.querySelectorAll('.waveform__event-card__content--text')
);

const cards = document.querySelectorAll('.waveform__list-item');
cards.forEach((elem) => elem.addEventListener('click', Superclamp.reclampAll));

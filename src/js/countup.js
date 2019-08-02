import anime from 'animejs';

import { $$ } from './utils/dom';
import { onElementInView } from './utils/on-element-in-view';

function countup(el, target) {
  let data = { count: 0 };
  anime({
    targets: data,
    count: [0, target],
    duration: 2000,
    round: 1,
    delay: 200,
    easing: 'easeOutSine',
    update() {
      el.innerText = data.count.toLocaleString();
    }
  });
}

function makeCountup(el) {
  const text = el.textContent;
  const target = parseInt(text, 10);

  onElementInView(el, () => {
    countup(el, target);
  });
}

const els = $$('[data-countup]');

els.forEach(makeCountup);

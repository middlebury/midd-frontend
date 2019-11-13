import anime from 'animejs';

import { $$ } from './utils/dom';
import { onElementInView } from './utils/on-element-in-view';

const isFloat = n => Number(n) === n && n % 1 !== 0;

function countup(el, target) {
  let data = { count: 0 };

  const round = !isFloat(target);

  anime({
    targets: data,
    count: [0, target],
    duration: 2000,
    round,
    delay: 200,
    easing: 'easeOutSine',
    update() {
      el.innerText = data.count.toLocaleString(undefined, {
        maximumFractionDigits: 2
      });
    }
  });
}

function makeCountup(el) {
  const text = el.textContent;
  const target = parseFloat(text);

  onElementInView(el, () => {
    countup(el, target);
  });
}

const els = $$('[data-countup]');

els.forEach(makeCountup);

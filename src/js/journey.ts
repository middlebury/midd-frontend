// https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3

// Code not used in production yet. Remove eslint-disable when we ship it.
import anime from 'animejs';
import { $ } from './utils/dom';

const pathEl = document.querySelector('.journey-line--desktop path') as Element;
// @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
const totalLength = pathEl.getTotalLength();
const dashing = '2, 2';

const dashLength = dashing
  .split(/[\s,]/)
  .map((a) => parseFloat(a) || 0)
  .reduce((a, b) => a + b, 0);

const dashCount = Math.ceil(totalLength / dashLength) + 1;
const newDashes = new Array(dashCount).join(dashing + ' ');
const dashArray = newDashes + ' 0, ' + totalLength;

pathEl.setAttribute('stroke-dashoffset', totalLength);

pathEl.setAttribute('stroke-dasharray', dashArray);

var update = 0;
var currentSection = 'intro';

const journeyLine = anime({
  targets: pathEl,
  strokeDashoffset: [totalLength, 0],
  duration: 10000,
  easing: 'linear',
  autoplay: false,
  update: function (anim) {
    var progress = Math.round(anim.progress * 10) / 10;

    if (progress >= 20) {
      $('.journey-line--section-learning').classList.add('animate');
    }
    if (progress >= 42) {
      $('.journey-line--section-place').classList.add('animate');
    }

    if (progress >= 85) {
      $('.journey-line--section-purpose__desktop').classList.add('animate');
    }

    if (progress == update) {
      anim.pause();
    }
  }
});

setTimeout(() => {
  journeyLine.play();
}, 1600);

const sections = document.querySelectorAll('.js-journey-section');

sections.forEach((elem) => {
  const io = new IntersectionObserver(handleIntersection, {
    threshold: 0.5 // add class when elem is half in view
  });

  io.observe(elem);

  function handleIntersection(entries: any) {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        currentSection = entry.target.getAttribute('data-section');
        if (currentSection === 'intro') {
          update = 6.5;
        } else if (currentSection === 'learning') {
          update = 34.2;
        } else if (currentSection === 'place') {
          update = 60.2;
        } else if (currentSection === 'purpose') {
          update = 100;
        }

        io.unobserve(entry.target);
        journeyLine.play();
      }
    });
  }
});

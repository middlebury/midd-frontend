// https://www.visualcinnamon.com/2016/01/animating-dashed-line-d3

var pathEl = document.querySelector('.journey-line--desktop path');
var totalLength = pathEl.getTotalLength();
var dashing = '2, 2';

var dashLength = dashing
  .split(/[\s,]/)
  .map(a => parseFloat(a) || 0)
  .reduce((a, b) => a + b, 0);

var dashCount = Math.ceil(totalLength / dashLength);
var newDashes = new Array(dashCount).join(dashing + ' ');
var dashArray = newDashes + ' 0, ' + totalLength;

pathEl.setAttribute('stroke-dashoffset', totalLength);
pathEl.setAttribute('stroke-dasharray', dashArray);

var journeyLine = anime({
  targets: pathEl,
  strokeDashoffset: [totalLength, 0],
  duration: 6000,
  easing: 'linear',
  autoplay: false
});

// setTimeout(() => {
//   journeyLine.pause();
// }, 1600);

const sections = document.querySelectorAll('.js-journey-section');

sections.forEach(elem => {
  var io = new IntersectionObserver(handleIntersection, {
    threshold: [0.5] // add class when elem is half in view
  });

  io.observe(elem);

  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        // makeChart(elem, chartConfig);
        console.log('section in view');

        elem.classList.add('play');

        if (elem.hasAttribute('data-line-duration')) {
          journeyLine.play();

          setTimeout(() => {
            journeyLine.pause();
          }, elem.getAttribute('data-line-duration'));
        }

        io.unobserve(entry.target);
      }
    });
  }
});

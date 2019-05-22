// taken from https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event#Scroll_event_throttling

export default function onscroll(elem = window, cb = f => f) {
  let lastScrollY = 0;
  let ticking = false;

  const update = e => {
    cb(lastScrollY, e);
    ticking = false;
  };

  const requestTick = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  const handleScroll = event => {
    lastScrollY = event.target.scrollTop || window.pageYOffset;
    requestTick();
  };

  elem.addEventListener('scroll', handleScroll);

  return {
    destroy() {
      elem.removeEventListener('scroll', handleScroll);
    }
  };
}

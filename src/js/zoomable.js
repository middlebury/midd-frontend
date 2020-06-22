import mediumZoom from 'medium-zoom';

// Preload the larger image to be shown when mousing over the non-zoomed image.
function addPreloadListener(img) {
  // Uses a timer to prevent downloading the image when mouse passes over an image quickly.
  let timer;

  function handleMouseEnter() {
    timer = setTimeout(() => {
      const src = img.getAttribute('data-zoom-src');

      const newImg = new Image();
      newImg.src = src;
      newImg.onload = () => {
        removeListeners();
      };
    }, 500);
  }

  function handleMouseLeave() {
    clearTimeout(timer);
  }

  function removeListeners() {
    img.removeEventListener('mouseenter', handleMouseEnter);
    img.removeEventListener('mouseleave', handleMouseLeave);
    img.removeEventListener('click', handleImageClick);
  }

  function handleImageClick() {
    removeListeners();
  }

  img.addEventListener('mouseenter', handleMouseEnter);
  img.addEventListener('mouseleave', handleMouseLeave);
  img.addEventListener('click', handleImageClick);
}

const imgs = document.querySelectorAll('[data-zoomable] img');
imgs.forEach(addPreloadListener);

mediumZoom('[data-zoomable] img', {
  margin: 32,
  background: '#202020'
});

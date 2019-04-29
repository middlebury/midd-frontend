import { on, $, $$ } from './utils/dom';
import decodeHtml from './utils/decodeHtml';

class VideoSwap {
  constructor(elem) {
    this.elem = elem;
    this.content = $('.js-video-content', elem);
    this.link = $('.js-video-link', elem);
    this.iframe = elem.getAttribute('data-video');

    this.activeClass = 'has-video';

    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    on(this.link, 'click', this.handleVideoEmbedClick);
    on(this.link, 'keydown', this.handleKeyUp);
  }

  showVideo() {
    this.elem.classList.add(this.activeClass);

    const html = decodeHtml(this.iframe);

    if (this.iframe) {
      this.content.innerHTML = html || this.iframe;
    }
  }

  handleKeyUp = e => {
    // spacebar
    if (e.keyCode === 32) {
      e.preventDefault();
      this.showVideo();
    }
  };

  handleVideoEmbedClick = e => {
    e.preventDefault();

    this.showVideo();
  };
}

const elems = $$('.js-video');

elems.forEach(elem => new VideoSwap(elem));

export default VideoSwap;

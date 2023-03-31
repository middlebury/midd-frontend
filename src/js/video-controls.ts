import { $, $$ } from './utils/dom';
import lozad from 'lozad';

class VideoControls {
  elem: HTMLElement;
  controls: HTMLElement;
  videoElement: HTMLMediaElement;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.videoElement = $('.journey-section__video', this.elem);
    this.controls = $('[data-journey-video-trigger]', this.elem);

    this.handleClick = this.handleClick.bind(this);
    this.init();
  }

  init() {
    this.addListeners();

    if (window.matchMedia('(max-width: 512px)').matches) {
      this.videoElement.autoplay = false;
      this.controls.classList.add('not-playing');
    }
  }

  addListeners() {
    // init lazy loaded videos
    const lazyLoadVideos = lozad(this.videoElement);
    lazyLoadVideos.observe();

    this.controls.addEventListener('click', this.handleClick);
  }

  handleClick(e: Event) {
    this.controls.classList.toggle('not-playing');
    if (this.controls.classList.contains('not-playing')) {
      this.videoElement.pause();
    } else {
      this.videoElement.play();
    }
  }
}

const sections = $$('.journey-section');
sections.shift();

sections.forEach((section) => {
  new VideoControls(section);
});

export default VideoControls;

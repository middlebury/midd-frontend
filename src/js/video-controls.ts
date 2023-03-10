import { $, $$ } from './utils/dom';

class VideoControls {
  elem: HTMLElement;
  buttons: HTMLElement;
  videoElement: HTMLMediaElement;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.videoElement = $('.journey-section__video', this.elem);
    this.buttons = $('[data-journey-video-trigger]', this.elem);

    this.handleClick = this.handleClick.bind(this);
    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    this.buttons.addEventListener('click', this.handleClick);
  }

  handleClick(e: Event) {
    this.buttons.classList.toggle('not-playing');
    if (this.buttons.classList.contains('not-playing')) {
      this.videoElement.pause();
    } else {
      this.videoElement.play();
    }
  }
}

const sections = $$('.journey-section');
const firstSection = sections.shift();
sections.forEach((section) => {
  new VideoControls(section);
});

export default VideoControls;

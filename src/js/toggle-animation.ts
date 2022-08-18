import { $, $$ } from './utils/dom';

class ToggleAnimation {
  elem: HTMLElement;

  triggers: HTMLElement[];

  targets: HTMLElement[];

  playButtonClass: string;

  pauseButtonClass: string;

  replayButtonClass: string;

  activeClass: string;

  playButton: HTMLElement;

  pauseButton: HTMLElement;

  replayButton: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.triggers = $$('[data-animation-trigger]', this.elem);
    this.targets = $$('[data-animation-target]', this.elem);
    this.activeClass = 'run-animation';

    this.playButtonClass = 'homepage-title--play-button';
    this.pauseButtonClass = 'homepage-title--pause-button';
    this.replayButtonClass = 'homepage-title--replay-button';

    this.playButton = $(`.${this.playButtonClass}`);
    this.pauseButton = $(`.${this.pauseButtonClass}`);
    this.replayButton = $(`.${this.replayButtonClass}`);

    this.handleClick = this.handleClick.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);
    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.handleClick);
    });
    this.targets.forEach((target) => {
      if (target.classList.contains('homepage-title--final-state')) {
        target.addEventListener('animationstart', this.handleAnimation);
        target.addEventListener('animationend', this.handleAnimation);
      }
    });
  }

  hideElement(elem: HTMLElement) {
    elem.style.display = 'none';
    elem.setAttribute('aria-hidden', 'true');
  }

  displayElement(elem: HTMLElement) {
    elem.style.display = 'block';
    elem.setAttribute('aria-hidden', 'false');
  }

  handleClick(e: Event) {
    const target = e.target as HTMLElement;

    if (target.classList.contains(this.pauseButtonClass)) {
      this.targets.forEach((elem) => {
        elem.classList.add('pause-animation');
      });

      this.hideElement(target);
      this.displayElement(this.playButton);
    } else if (target.classList.contains(this.playButtonClass)) {
      this.targets.forEach((elem) => {
        elem.classList.remove('pause-animation');
      });

      this.hideElement(target);
      this.displayElement(this.pauseButton);
    } else if (target.classList.contains(this.replayButtonClass)) {
      this.elem.classList.remove('run-animation');
      void this.elem.offsetWidth;
      this.elem.classList.add('run-animation');

      this.hideElement(target);
      this.displayElement(this.pauseButton);
    }
  }

  handleAnimation(e: AnimationEvent) {
    if (e.type == 'animationend') {
      this.hideElement(this.playButton);
      this.hideElement(this.pauseButton);
      this.displayElement(this.replayButton);
    }
  }
}

const animationTogglers = $$('[data-animation-container]');

animationTogglers.forEach((elem) => new ToggleAnimation(elem));

export default ToggleAnimation;

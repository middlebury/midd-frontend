import MicroModal from 'micromodal';
import anime, { AnimeInstance } from 'animejs';
import { $, $$ } from './utils/dom';

class Journey {
  elem: HTMLElement;
  pathEl: SVGGeometryElement;
  animUpdateValue: number;
  totalPathLength: number;
  journeyLineAnimInstance: AnimeInstance;
  journeySections: HTMLElement[];
  io: IntersectionObserver;
  matchMedia: MediaQueryList;
  deviceType: String;
  dotsAnimBreaks: number[];
  lineAnimBreaks: number[];

  constructor(el: HTMLElement) {
    this.elem = el;
    this.journeySections = $$('.js-journey-section');
    this.animUpdateValue = 0;

    this.handleIntersection = this.handleIntersection.bind(this);
    this.deviceInit = this.deviceInit.bind(this);
    this.init();
  }

  init() {
    this.matchMedia = window.matchMedia('(min-width: 512px)');
    this.deviceInit();
    this.addListeners();
    this.svgInit();
    this.animInit();
    this.sectionInit();

    setTimeout(() => {
      this.journeyLineAnimInstance.play();
    }, 1600);
  }

  addListeners() {
    this.matchMedia.addListener(this.deviceInit);
  }

  deviceInit() {
    if (this.matchMedia.matches) {
      this.deviceType = 'desktop';
      this.dotsAnimBreaks = [20, 42, 85];
      this.lineAnimBreaks = [6.5, 34.2, 60.2, 100];
    } else {
      this.deviceType = 'mobile';
      this.dotsAnimBreaks = [4, 44, 91];
      this.lineAnimBreaks = [1, 39.2, 78.2, 100];
    }
    this.pathEl = $(`.journey-line--${this.deviceType} path`, this.elem);
  }

  svgInit() {
    this.totalPathLength = this.pathEl.getTotalLength();
    const dashing = '2, 2';

    const dashLength = dashing
      .split(/[\s,]/)
      .map((a) => parseFloat(a) || 0)
      .reduce((a, b) => a + b, 0);

    const dashCount = Math.ceil(this.totalPathLength / dashLength) + 1;
    const newDashes = new Array(dashCount).join(dashing + ' ');
    const dashArray = newDashes + ' 0, ' + this.totalPathLength;

    this.pathEl.setAttribute('stroke-dashoffset', `${this.totalPathLength}`);

    this.pathEl.setAttribute('stroke-dasharray', dashArray);
  }

  animInit() {
    this.journeyLineAnimInstance = anime({
      targets: this.pathEl,
      strokeDashoffset: [this.totalPathLength, 0],
      duration: 10000,
      easing: 'linear',
      autoplay: false,
      update: (anim) => {
        this.animUpdate(anim);
      }
    });
  }

  animUpdate(anim: AnimeInstance) {
    const animProgress = Math.round(anim.progress * 10) / 10;

    // Logic for the dots to animate
    if (animProgress >= this.dotsAnimBreaks[0]) {
      $(
        `.journey-line--${this.deviceType} .journey-line--section-learning`
      ).classList.add('animate');
    }
    if (animProgress >= this.dotsAnimBreaks[1]) {
      $(
        `.journey-line--${this.deviceType} .journey-line--section-place`
      ).classList.add('animate');
    }
    if (animProgress >= this.dotsAnimBreaks[2]) {
      if (this.deviceType == 'desktop') {
        $('.journey-line--section-purpose__desktop').classList.add('animate');
        $('.journey-line--section-purpose__tablet').classList.add('animate');
      } else {
        $(
          `.journey-line--${this.deviceType} .journey-line--section-purpose`
        ).classList.add('animate');
      }
    }

    if (animProgress == this.animUpdateValue) {
      this.journeyLineAnimInstance.pause();
    }
  }

  sectionInit() {
    this.io = new IntersectionObserver(this.handleIntersection, {
      threshold: 0.5 // add class when elem is half in view
    });

    this.journeySections.forEach((section) => this.io.observe(section));
  }

  handleIntersection(entries: any) {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        const currentSection = entry.target.getAttribute('data-section');

        if (currentSection === 'intro') {
          this.animUpdateValue = this.lineAnimBreaks[0];
        } else if (currentSection === 'learning') {
          this.animUpdateValue = this.lineAnimBreaks[1];
        } else if (currentSection === 'place') {
          this.animUpdateValue = this.lineAnimBreaks[2];
        } else if (currentSection === 'purpose') {
          this.animUpdateValue = this.lineAnimBreaks[3];
        }

        this.io.unobserve(entry.target);
        this.journeyLineAnimInstance.play();
      }
    });
  }
}

const journey = $$('.journey');

journey.forEach((item: HTMLElement) => new Journey(item));

MicroModal.init({
  openTrigger: 'data-journey-overlay-open',
  closeTrigger: 'data-journey-overlay-close',
  onShow: (modal: any) => {
    $('[data-journey-overlay-close]', modal).focus();
  },
  disableScroll: true
});

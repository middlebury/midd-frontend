import MicroModal from 'micromodal';
import anime, { AnimeInstance } from 'animejs';
import { $, $$ } from './utils/dom';
import JourneySwiper from './journey-swiper';
import onscroll from './utils/onscroll';
import { PREFERS_REDUCED_MOTION } from './utils/prefers-reduced-motion';

class Journey {
  elem: HTMLElement;
  pathEl: SVGGeometryElement;
  animUpdateValue: number;
  totalPathLength: number;
  journeyLineAnimInstance: AnimeInstance;
  journeySections: HTMLElement[];
  firstSection: HTMLElement;
  io: IntersectionObserver;
  deviceType: string;
  timeout: NodeJS.Timeout;
  scrollRef: object;
  deviceInfo: {
    [key: string]: {
      [key: string]: number[];
    };
  };

  constructor(el: HTMLElement) {
    this.elem = el;
    this.journeySections = $$('.js-journey-section');
    this.firstSection = this.journeySections.shift();
    this.animUpdateValue = 0;
    this.deviceInfo = {
      desktop: {
        dotsAnimBreaks: [0, 34, 70],
        lineAnimBreaks: [25, 60, 101]
      },
      tablet: {
        dotsAnimBreaks: [0, 39, 77],
        lineAnimBreaks: [29, 67, 101]
      },
      mobile: {
        dotsAnimBreaks: [0, 32, 70],
        lineAnimBreaks: [28, 65, 101]
      }
    };

    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.deviceInit = this.deviceInit.bind(this);
    this.init();
  }

  init() {
    window.location.hash = '';
    this.deviceInit();
    this.addListeners();

    if (!PREFERS_REDUCED_MOTION) {
      this.svgInit();
      this.animInit();
      this.sectionInit();
    }
  }

  addListeners() {
    window.addEventListener('resize', (e) => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(this.handleScroll, 250);
    });

    this.scrollRef = onscroll(this.handleScroll);
  }

  handleScroll() {
    if (
      this.firstSection.clientHeight - window.innerHeight >
      -this.firstSection.getBoundingClientRect().top
    ) {
      $('.school-picker').classList.remove('not-fixed');
    } else {
      $('.school-picker').classList.add('not-fixed');
    }
  }

  deviceInit() {
    this.handleScroll();
    if (window.matchMedia('(min-width: 1024px)').matches) {
      this.deviceType = 'desktop';
    } else if (window.matchMedia('(min-width: 512px)').matches) {
      this.deviceType = 'tablet';
    } else {
      this.deviceType = 'mobile';
    }

    this.pathEl = $(`.journey-line--${this.deviceType} path`, this.elem);
  }

  svgInit() {
    this.totalPathLength = this.pathEl.getTotalLength();
    const dashing = '4, 4';

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
    if (animProgress >= this.deviceInfo[this.deviceType].dotsAnimBreaks[0]) {
      $(`.journey-links--${this.deviceType} .learning`).classList.add(
        'animate'
      );
    }
    if (animProgress >= this.deviceInfo[this.deviceType].dotsAnimBreaks[1]) {
      $(`.journey-links--${this.deviceType} .thinking`).classList.add(
        'animate'
      );
    }
    if (animProgress >= this.deviceInfo[this.deviceType].dotsAnimBreaks[2]) {
      $(`.journey-links--${this.deviceType} .opportunity`).classList.add(
        'animate'
      );
    }

    if (
      animProgress >= this.animUpdateValue - 0.5 &&
      animProgress <= this.animUpdateValue + 0.5
    ) {
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
        let entryId = 0;
        const currentSection = entry.target.id;

        if (currentSection === 'learning') {
          entryId = 0;
        } else if (currentSection === 'thinking') {
          entryId = 1;
        } else if (currentSection === 'opportunity') {
          entryId = 2;
        }

        if (
          this.deviceInfo[this.deviceType].lineAnimBreaks[entryId] >
          this.animUpdateValue
        ) {
          this.animUpdateValue =
            this.deviceInfo[this.deviceType].lineAnimBreaks[entryId];
          this.journeyLineAnimInstance.play();
        }

        this.io.unobserve(entry.target);
      }
    });
  }
}

MicroModal.init({
  openTrigger: 'data-journey-overlay-open',
  closeTrigger: 'data-journey-overlay-close',
  onShow: (modal: any) => {
    if (!modal.swiper) {
      const swiper = $('.journey-swiper');
      modal.swiper = new JourneySwiper(swiper);
    }
  },
  disableScroll: true
});

const journey = $$('.journey');

journey.forEach((item: HTMLElement) => new Journey(item));

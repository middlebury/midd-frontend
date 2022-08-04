import { $, $$ } from './utils/dom';
import Superclamp from 'superclamp';

class ShiftingSlider {
  /* Element which will be hovered over and will trigger the slide */
  elem: HTMLElement;

  wrapperElem: HTMLElement;

  /* Visible element width on the screen */
  visibleElemWidth: number;

  /* Total element width including the hidden width outside the viewport */
  totalElemWidth: number;

  /* Amount the element can scroll to the left or right */
  scrollWidth: number;

  /* Variable to incrementally shift element left or right */
  shift: number;

  /* Interval id of the current interval running for scroll on hover animation */
  intervalId: any;

  tooltipElem: any;

  prevDirection: string;

  waveformListItems: HTMLElement[];

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.wrapperElem = $('.waveform__wrapper');
    this.shift = 0;
    this.prevDirection = '';
    this.waveformListItems = $$('.waveform__list-item');
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.addSuperclampListener = this.addSuperclampListener.bind(this);
    this.init();
  }

  init() {
    this.onWindowResize();
    this.addSuperclampListener();
    window.onresize = this.onWindowResize;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          this.checkElemPosition(entry);

          io.unobserve(this.elem);
        }
      });
    });

    io.observe(this.elem);
  }

  addListeners() {
    this.elem.addEventListener('mouseover', this.handleHover);
    this.elem.addEventListener('mousemove', this.handleHover);
    this.elem.addEventListener('mouseout', this.handleMouseOut);
    this.wrapperElem.addEventListener('mouseleave', this.handleMouseLeave);

    this.waveformListItems.forEach((listItem) => {
      listItem.addEventListener('mousemove', this.handleMouseMove);
    });
  }

  destroy() {
    this.elem.removeEventListener('mouseover', this.handleHover);
    this.elem.removeEventListener('mousemove', this.handleHover);
    this.elem.removeEventListener('mouseout', this.handleMouseOut);
    this.wrapperElem.addEventListener('mouseleave', this.handleMouseLeave);

    this.waveformListItems.forEach((listItem) => {
      listItem.removeEventListener('mousemove', this.handleMouseMove);
    });
  }

  onWindowResize() {
    // Enable superclamp to clamp overflow text on cards
    Superclamp.register(
      document.querySelectorAll('.waveform__event-card__content--text')
    );

    this.visibleElemWidth = this.elem.offsetWidth;
    this.totalElemWidth = this.elem.scrollWidth;
    this.scrollWidth = this.totalElemWidth - this.visibleElemWidth + 12;

    // Reset the position of waveform from the left based on how much the waveform has been scrolled
    if (parseInt(this.elem.style.left, 10) < -this.scrollWidth) {
      this.elem.style.left = -this.scrollWidth + 'px';
    }

    if (window.innerWidth >= 1024) {
      this.addListeners();
    } else {
      this.elem.style.left = 0 + 'px';
      this.destroy();
    }
  }

  addSuperclampListener() {
    this.waveformListItems.forEach((elem) => {
      elem.addEventListener('click', Superclamp.reclampAll);
    });
  }

  checkElemPosition(entry: any) {
    entry.target.classList.add('fade-in-element');
  }

  scroll(direction: string) {
    var shift =
      this.elem.style.left === '' ? 0 : parseInt(this.elem.style.left, 10);

    this.totalElemWidth = this.elem.scrollWidth;
    this.scrollWidth = this.totalElemWidth - this.visibleElemWidth + 12;

    if (direction === 'right' && shift > -this.scrollWidth) {
      shift--;
    } else if (direction === 'left' && shift < 0) {
      shift++;
    }

    if (shift === 0 || shift <= -this.scrollWidth) {
      this.intervalId = clearInterval(this.intervalId);
    }

    this.elem.style.left = shift + 'px';
  }

  animate(speed: number, direction: string) {
    this.intervalId = setInterval(() => this.scroll(direction), speed);
  }

  handleTooltip(e: MouseEvent) {
    let target = e.target as HTMLElement;

    // if we have tooltip HTML...
    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml) return;

    // ...create the tooltip element
    this.tooltipElem = document.createElement('div');
    this.tooltipElem.className = 'waveform__list-item--tooltip';
    this.tooltipElem.innerHTML = tooltipHtml;
    this.tooltipElem.setAttribute('role', 'tooltip');
    target.appendChild(this.tooltipElem);
  }

  handleMouseOut() {
    if (this.tooltipElem) {
      this.tooltipElem.remove();
      this.tooltipElem = null;
    }
  }

  handleMouseLeave() {
    if (this.intervalId) {
      this.intervalId = clearInterval(this.intervalId);
      this.setDirection('');
    }
  }

  setDirection(direction: string) {
    this.prevDirection = direction;
  }

  handleHover(e: MouseEvent) {
    if (e.type == 'mouseover') {
      this.handleTooltip(e);
    }

    var x = e.clientX;
    var direction = '';

    var el = this.wrapperElem;
    var viewportOffset = el.getBoundingClientRect();
    var left = viewportOffset.left;

    if (x - left < this.visibleElemWidth * 0.125) {
      direction = 'left';
    } else if (x - left > this.visibleElemWidth * 0.875) {
      direction = 'right';
    } else {
      direction = '';
    }

    if (direction !== this.prevDirection) {
      if (this.intervalId) {
        this.intervalId = clearInterval(this.intervalId);
      }
      if (direction !== '') {
        this.animate(10, direction);
      }
    }
    this.setDirection(direction);
  }

  handleMouseMove(e: MouseEvent) {
    if (this.tooltipElem) {
      var rightSpace = document.body.clientWidth - e.pageX;

      if (rightSpace <= this.tooltipElem.offsetWidth) {
        this.tooltipElem.style.left =
          -(this.tooltipElem.offsetWidth - rightSpace) + e.clientX + 'px';
      } else {
        this.tooltipElem.style.left = -20 + e.clientX + 'px';
      }
      this.tooltipElem.style.top = -50 + e.clientY + 'px';
    }
  }
}

const shiftingSliders = $$('.shifting-slider');

shiftingSliders.forEach((elem) => new ShiftingSlider(elem));

export default ShiftingSlider;

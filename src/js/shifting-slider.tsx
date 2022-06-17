import { $, $$ } from './utils/dom';

class ShiftingSlider {
  /* Element which will be hovered over and will trigger the slide */
  elem: HTMLElement;

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

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.visibleElemWidth = elem.offsetWidth;
    this.totalElemWidth = elem.scrollWidth;
    this.scrollWidth = this.totalElemWidth - this.visibleElemWidth;
    this.shift = 0;
    this.handleHover = this.handleHover.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.init();
  }

  init() {
    this.onWindowResize();
    window.onresize = this.onWindowResize;
  }

  onWindowResize() {
    this.visibleElemWidth = this.elem.offsetWidth;
    this.totalElemWidth = this.elem.scrollWidth;
    this.scrollWidth = this.totalElemWidth - this.visibleElemWidth;
    if (window.innerWidth >= 1024) {
      this.addListeners();
    } else {
      this.elem.style.left = 0 + 'px';
      this.destroy();
    }
  }

  addListeners() {
    this.elem.addEventListener('mouseover', this.handleHover);
    this.elem.addEventListener('mousemove', this.handleHover);
    this.elem.addEventListener('mouseout', this.handleMouseOut);

    const waveformListItems = $$('.waveform__list-item');
    waveformListItems.forEach((listItem) => {
      listItem.addEventListener('mousemove', this.handleMouseMove);
    });
  }

  // destroy method is not currently called in our apps but could be if you want to disable a shifting slider
  destroy() {
    this.elem.removeEventListener('mouseover', this.handleHover);
    this.elem.removeEventListener('mousemove', this.handleHover);
    this.elem.removeEventListener('mouseout', this.handleMouseOut);
  }

  scroll(direction: string) {
    var shift =
      this.elem.style.left === '' ? 0 : parseInt(this.elem.style.left, 10);

    this.totalElemWidth = this.elem.scrollWidth;
    this.scrollWidth = this.totalElemWidth - this.visibleElemWidth;

    if (shift === 0 || shift <= -this.scrollWidth) {
      clearInterval(this.intervalId);
    }
    if (direction === 'right' && shift > -this.scrollWidth) {
      shift--;
    } else if (direction === 'left' && shift < 0) {
      shift++;
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
    target.appendChild(this.tooltipElem);
  }

  handleMouseOut() {
    if (this.tooltipElem) {
      this.tooltipElem.remove();
      this.tooltipElem = null;
    }
  }

  handleHover(e: MouseEvent) {
    e.preventDefault();

    if (e.type == 'mouseover') {
      this.handleTooltip(e);
    }

    var x = e.clientX;

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    var el = $('.paragraph--waveform .container');
    var viewportOffset = el.getBoundingClientRect();
    var left = viewportOffset.left;

    if (x - left < this.visibleElemWidth * 0.125) {
      this.animate(10, 'left');
    } else if (x - left > this.visibleElemWidth * 0.875) {
      this.animate(10, 'right');
    } else {
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
    }
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();

    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
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

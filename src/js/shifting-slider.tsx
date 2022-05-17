import { $, $$ } from './utils/dom';

class ShiftingSlider {
  /* Element which will be hovered over and will trigger the slide */
  elem: HTMLElement;

  /* Visible element width on the screen */
  elemWidth: number;

  totalElemWidth: number;

  scrollWidth: number;

  shift: number;

  id: any;

  constructor(elem: HTMLElement) {
    this.elem = elem;
    this.elemWidth = elem.offsetWidth;
    this.totalElemWidth = elem.scrollWidth;
    this.scrollWidth = this.totalElemWidth - this.elemWidth;
    this.shift = 0;
    this.handleHover = this.handleHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    this.elem.addEventListener('mouseover', this.handleHover);
    this.elem.addEventListener('click', this.handleClick);

    // const eventCards = $$('.waveform__event-card');

    // eventCards.forEach((elem) =>
    //   this.elem.addEventListener('mouseover', this.handleClick)
    // );
  }

  // destroy method is not currently called in our apps but could be if you want to disable a slider
  destroy() {
    this.elem.removeEventListener('mouseover', this.handleHover);
  }

  /*
    Write animate function, like jquery's animate that specifies a speed, direction and maybe callback
    Write the animate function like so https://stackoverflow.com/questions/15521081/pure-js-equivalent-of-jquery-animate#answer-15521141
  */
  animate(speed: number, direction: string) {
    var shift =
      this.elem.style.left === '' ? 0 : parseInt(this.elem.style.left, 10);

    function frame(
      elem: HTMLElement,
      direction: string,
      id: any,
      scrollWidth: number
    ) {
      if (shift === 0 || shift <= -scrollWidth) {
        clearInterval(id);
      }
      if (direction === 'right' && shift > -scrollWidth) {
        shift--;
      } else if (direction === 'left' && shift < 0) {
        shift++;
      }
      // console.log(shift);
      elem.style.left = shift + 'px';
    }

    // if (!this.id) {
    this.id = setInterval(
      () => frame(this.elem, direction, this.id, this.scrollWidth),
      speed
    ); // draw every 10ms
    // }
  }

  handleHover(e: MouseEvent) {
    e.preventDefault();
    var x = e.clientX;

    if (this.id) {
      clearInterval(this.id);
    }

    // var totalElemWidth = this.elem.scrollWidth; // gets the total width with overflow width
    // var scrollWidth = totalElemWidth - this.elemWidth; // amount the element needs move left

    if (x < this.elemWidth * 0.25) {
      this.animate(5, 'left');
    } else if (x > this.elemWidth * 0.25 && x < this.elemWidth * 0.5) {
      this.animate(10, 'left');
    } else if (x > this.elemWidth * 0.5 && x < this.elemWidth * 0.75) {
      this.animate(10, 'right');
    } else if (x > this.elemWidth * 0.75) {
      this.animate(5, 'right');
    }
  }

  handleClick(e: MouseEvent) {
    e.preventDefault();

    if (this.id) {
      clearInterval(this.id);
    }
  }
}

const shiftingSliders = $$('.shifting-slider');

shiftingSliders.forEach((elem) => new ShiftingSlider(elem));

export default ShiftingSlider;

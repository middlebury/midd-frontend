import { $, $$ } from './utils/dom.js';

class CopyText {
  button: HTMLElement;
  text: string;
  domain: string;

  constructor(button: HTMLElement) {
    this.button = button;

    const textClass = button.getAttribute('data-copy-to-clipboard');
    this.text = $(`${textClass}`).textContent?.trim();

    this.domain = 'https://go.middlebury.edu/';

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    this.button.addEventListener('click', this.handleButtonClick);
  }

  async handleButtonClick() {
    try {
      await navigator.clipboard.writeText(
        this.domain.concat(this.text.slice(3))
      );
    } catch (error) {
      console.error(error.message);
    }
  }
}

const copyButtons = $$('[data-copy-to-clipboard]');

copyButtons.forEach((button) => new CopyText(button));

export default CopyText;

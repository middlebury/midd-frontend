import { $, $$ } from './utils/dom';

class CopyText {
  button: HTMLElement;
  text: string;

  constructor(button: HTMLElement) {
    this.button = button;

    const textClass = button.getAttribute('data-copy-to-clipboard');
    this.text = $(`${textClass}`).text.trim();

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
      await navigator.clipboard.writeText(this.text);
    } catch (error) {
      console.error(error.message);
    }

    console.log(this.text);
  }
}

const copyButtons = $$('[data-copy-to-clipboard]');

copyButtons.forEach((button) => new CopyText(button));

export default CopyText;

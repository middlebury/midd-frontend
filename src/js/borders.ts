import { $$ } from './utils/dom';

class CreateBorder {
  elem: HTMLElement;
  borderType: string;
  colorPrimary: string;
  colorSecondary: string;
  textColor: string;

  constructor(el: HTMLElement) {
    this.elem = el;
    this.borderType = el.dataset.border;
    this.colorPrimary = el.dataset.colorPrimary;
    this.colorSecondary = el.dataset.colorSecondary;

    this.createBorder();
  }

  createBorder() {
    this.elem.style.setProperty(
      `--${this.borderType}-color-primary`,
      this.colorPrimary
    );
    this.elem.style.setProperty(
      `--${this.borderType}-color-secondary`,
      this.colorSecondary
    );

    if (this.elem.dataset.textColor) {
      this.elem.style.setProperty(
        `--${this.borderType}-text-color`,
        this.elem.dataset.textColor
      );
    }
  }
}

const els = $$('[data-border]');

els.forEach((el) => new CreateBorder(el));

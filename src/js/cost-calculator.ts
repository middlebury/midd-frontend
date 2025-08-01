import { $, $$ } from './utils/dom';

class CostCalculator {
  form: HTMLFormElement;
  tables: HTMLElement[];
  chargesSum: Number[];
  creditsSum: Number[];

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.tables = $$('.table', form);

    this.validateInput = this.validateInput.bind(this);

    this.init();
  }

  init() {
    this.addEventListeners();
  }

  addEventListeners = () => {
    const inputElems = $$('input:not(input[disabled="disabled"])', this.form);
    inputElems.forEach((el) => {
      el.addEventListener('change', (e) => this.validateInput(e));
    });
  };

  isEmpty(str: String) {
    if (str == null || str == '') return true;
    return false;
  }

  validateInput(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    let floatValue = parseFloat(value);

    if (
      isNaN(floatValue) ||
      this.isEmpty(value) ||
      value.indexOf(',') != -1 ||
      floatValue < 0
    ) {
      alert(
        'Please enter a valid amount that is greater than 0 and not a letter or symbol.'
      );

      (e.target as HTMLInputElement).focus();
      (e.target as HTMLInputElement).select();
    }
    this.calculateTotal();
  }

  calcSum(values: HTMLElement[]) {
    let sum = 0;
    values.forEach((value) => {
      sum += parseFloat((value as HTMLInputElement).value);
    });

    return sum;
  }

  calculateTotal() {
    this.tables.forEach((table) => {
      let charges = $$('.js-charges', table);
      let credits = $$('.js-credits', table);

      if (charges.length != 0 || credits.length != 0) {
        if (this.calcSum(charges)) {
          this.chargesSum.push(this.calcSum(charges));
        }
        // this.creditsSum.push(this.calcSum(credits));
        console.log(this.chargesSum);
      }
    });

    console.log(this.chargesSum, this.creditsSum);
  }
}

const form = $('.js-cost-calculator');

if (form) {
  new CostCalculator(form);
}

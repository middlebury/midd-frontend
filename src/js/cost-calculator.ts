import { $, $$ } from './utils/dom';

/**
 * CostCalculator handles calculating fall/spring and annual charges and credits
 * within a form. It watches inputs/selects, validates values, sums charge/credit
 * tables and updates the form totals.
 */
class CostCalculator {
  /**
   * The form element that contains the inputs
   */
  form: HTMLFormElement;

  /**
   * All table elements inside the form
   */
  tables: HTMLElement[];

  /**
   * Tables that contain charges inputs (one per term)
   */
  chargesTables: HTMLElement[];

  /**
   * Tables that contain credits inputs (one per term)
   */
  creditsTables: HTMLElement[];

  /** Sum of charges for the fall term. */
  fallCharges: number = 0;

  /** Sum of credits for the fall term. */
  fallCredits: number = 0;

  /** Sum of charges for the spring term. */
  springCharges: number = 0;

  /** Sum of credits for the spring term. */
  springCredits: number = 0;

  /** Sum of all charges across terms. */
  totalCharges: number = 0;

  /** Sum of all credits across terms. */
  totalCredits: number = 0;

  /** Final annual amount (total charges - total credits). */
  totalSum: number = 0;

  constructor(form: HTMLFormElement) {
    this.form = form;
    this.tables = $$('.table', form);
    this.chargesTables = $$('.js-charges-table', form);
    this.creditsTables = $$('.js-credits-table', form);

    // bind instance methods used as event handlers
    this.validateInput = this.validateInput.bind(this);

    this.init();
  }

  init() {
    this.addEventListeners();
  }

  /**
   * Attach event listeners to relevant inputs inside the form.
   * - Watches all inputs that are not disabled and all selects.
   * - Recalculates totals on input change and when the reset button is used.
   */
  addEventListeners = () => {
    const inputElems = $$(
      'input:not(input[disabled="disabled"]), select',
      this.form
    );

    // When the form reset button is clicked, recalculate totals to reflect default total
    $('input[type="reset"]').addEventListener('click', () => {
      this.calculateTotal();
    });

    // Validate on change for all relevant inputs/selects
    inputElems.forEach((el) => {
      el.addEventListener('change', (e) => this.validateInput(e));
    });
  };

  /**
   * Utility to check empty string or null.
   *
   * @param str String to check
   * @returns true if null or empty
   */
  isEmpty(str: String) {
    if (str == null || str == '') return true;
    return false;
  }

  /**
   * Validate that the input value is a non-empty, non-negative number without commas or letters.
   * If invalid, show an alert and focus the offending input. Otherwise recalculate totals.
   *
   * @param e Input change event
   */
  validateInput(e: Event) {
    let value = (e.target as HTMLInputElement).value;
    let isNumber = /^(\d*\.)?\d+$/.test(value);
    let floatValue = parseFloat(value);

    if (
      !isNumber ||
      this.isEmpty(value) ||
      value.indexOf(',') != -1 ||
      floatValue < 0
    ) {
      alert(
        'Please enter a valid amount that is greater than or equal to 0 and does not contain a letter or symbol.'
      );

      (e.target as HTMLInputElement).focus();
      (e.target as HTMLInputElement).select();
    } else this.calculateTotal();
  }

  /**
   * Sum numeric values of a list of input HTMLElements.
   *
   * @param els Elements whose .value should be summed
   * @returns sum as number
   */
  calcSum(els: HTMLElement[]) {
    let sum = 0;
    els.forEach((el) => {
      sum += parseFloat((el as HTMLInputElement).value);
    });

    return sum;
  }

  /**
   * Calculate fall, spring and annual totals:
   * - Sums each charges table and assigns fall/spring appropriately
   * - Sums each credits table and assigns fall/spring appropriately
   * - Updates per-term total fields and the annual amount on the form
   * - Shows an alert and sets annual amount to 0 if credits exceed charges
   */
  calculateTotal() {
    this.totalSum = 0;
    this.totalCharges = 0;
    this.totalCredits = 0;

    // Calculate charges for each term
    this.chargesTables.forEach((table, index) => {
      let charges = $$('.js-charges', table);
      let chargesSum = this.calcSum(charges);

      // Update the total charges per table
      $('[name="total-charges"]', table).value = chargesSum;

      // index 0 => fall, index 1 => spring
      if (index) {
        this.springCharges = chargesSum;
      } else {
        this.fallCharges = chargesSum;
      }
      this.totalCharges += chargesSum;
    });

    // Calculate credits for each term
    this.creditsTables.forEach((table, index) => {
      let credits = $$('.js-credits', table);
      let creditsSum = this.calcSum(credits);

      // Update the total credits per table
      $('[name="total-credits"]', table).value = creditsSum;

      // index 0 => fall, index 1 => spring
      if (index) {
        this.springCredits = creditsSum;
      } else {
        this.fallCredits = creditsSum;
      }
      this.totalCredits += creditsSum;
    });

    // Update fall/spring totals (charges - credits)
    $('[name="fall-total-amount"]').value = this.fallCharges - this.fallCredits;
    $('[name="spring-total-amount"]').value =
      this.springCharges - this.springCredits;

    // Compute annual total
    this.totalSum = this.totalCharges - this.totalCredits;

    if (this.totalSum < 0) {
      // If credits exceed charges, inform the user and zero the annual amount
      alert(
        'If your total credits are greater than your total charges, you have no annual charges due.'
      );
      $('[name="annual-amount"]', this.form).value = 0;
    } else {
      $('[name="annual-amount"]', this.form).value = this.totalSum;
    }
  }
}

const form = $('.js-cost-calculator');

// Instantiate the calculator for each matching form on the page
if (form) {
  new CostCalculator(form);
}

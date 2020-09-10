import { $$ } from './utils/dom';

class ResponsiveTable {
  elem: HTMLTableElement;
  heads: HTMLTableHeaderCellElement[];
  rows: HTMLTableRowElement[];

  constructor(elem: HTMLTableElement) {
    this.elem = elem;
    this.heads = $$('th', elem) as HTMLTableHeaderCellElement[];
    this.rows = $$('tr', elem) as HTMLTableRowElement[];

    this.init();
  }

  init() {
    if (!this.heads) {
      return;
    }

    this.rows.forEach((row: HTMLTableRowElement) => {
      const cells = row.querySelectorAll('td');

      cells.forEach((cell: HTMLTableCellElement, index: number) => {
        const label = this.heads[index] ? this.heads[index].innerText : '';
        if (label) {
          cell.setAttribute('data-th', label);
        }
      });
    });
  }
}

const tables = $$('table') as HTMLTableElement[];

tables.forEach((elem: HTMLTableElement) => new ResponsiveTable(elem));

export default ResponsiveTable;

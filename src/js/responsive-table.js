class ResponsiveTable {
  constructor(elem) {
    this.elem = elem;
    this.heads = this.elem.querySelectorAll('th');
    this.rows = this.elem.querySelectorAll('tr');

    this.init();
  }

  init() {
    if (!this.heads) {
      return;
    }

    this.rows.forEach(row => {
      const cells = row.querySelectorAll('td');

      cells.forEach((cell, index) => {
        const label = this.heads[index] ? this.heads[index].innerText : '';
        if (label) {
          cell.setAttribute('data-th', label);
        }
      });
    });
  }
}

const tables = document.querySelectorAll('table');

tables.forEach(elem => new ResponsiveTable(elem));

export default ResponsiveTable;

import Pikaday from 'pikaday';

declare global {
  interface Window {
    drupalSettings: {
      path: {
        baseUrl: string;
        currentPath: string;
      };
    };
  }
}

const pad = (n: number): string => (n >= 10 ? String(n) : `0${n}`);

const getDateObj = (
  dateStr: string
): {
  day: number;
  month: number;
  year: number;
} => {
  const dateParts = dateStr.split('-');
  const [year, month, day] = dateParts;

  return {
    year: parseInt(year, 10),
    month: parseInt(month, 10) - 1,
    day: parseInt(day, 10)
  };
};

const dateToStr = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const padDay = pad(day);
  const paddedMonth = pad(month);

  const year = date.getFullYear();

  const dateStr = `${year}-${paddedMonth}-${padDay}`;

  return dateStr;
};

let searchParams = new URLSearchParams(window.location.search);
const dateStr = searchParams.get('start-date');

let defaultDate = null;

if (dateStr) {
  const { year, month, day } = getDateObj(dateStr);

  // have to pass date object instead of string
  // https://github.com/dbushell/Pikaday/issues/764#issuecomment-360286792
  defaultDate = new Date(year, month, day);
}

const datePicker = document.querySelector(
  '.js-events-datepicker'
) as HTMLElement;

if (datePicker) {
  const picker = new Pikaday({
    field: datePicker,
    bound: false,
    minDate: new Date(),
    defaultDate,
    setDefaultDate: Boolean(defaultDate),
    onSelect(date: Date) {
      searchParams.set('start-date', dateToStr(date));
      window.location.search = searchParams.toString();
    }
  });

  datePicker.style.display = 'none';
}

const selects = ['month', 'year'];

selects.forEach((name: string, i: number) => {
  const select = 'pika-select-' + name;
  const selectElem = document.querySelector('.' + select);

  if (!selectElem) {
    return;
  }

  selectElem.setAttribute('id', select);

  const labelElem = document.createElement('label');
  labelElem.setAttribute('class', 'sr-only');
  labelElem.setAttribute('for', select);
  labelElem.innerText =
    selects[i].charAt(0).toUpperCase() + selects[i].slice(1);

  const parentElem = selectElem.parentNode;
  parentElem.insertBefore(labelElem, selectElem);
});

const pikaTitle = document.querySelector('.pika-title');

if (pikaTitle) {
  pikaTitle.setAttribute('aria-atomic', 'true');
}

const pikaTable = document.querySelector('.pika-table');

if (pikaTable) {
  pikaTable.removeAttribute('cellpadding');
  pikaTable.removeAttribute('cellspacing');
}

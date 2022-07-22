import MicroModal from 'micromodal';
import { $, $$ } from './utils/dom';

MicroModal.init({
  openTrigger: 'data-grid-overlay-open',
  closeTrigger: 'data-grid-overlay-close',
  disableScroll: true
});

class GridToggler {
  elem: HTMLElement;

  target: HTMLElement;

  gridAreasList: string[];

  constructor(elem: HTMLElement) {
    this.elem = elem;

    this.target = $(elem.getAttribute('data-grid-toggle-target'));

    this.gridAreasList = this.getGridAreas(this.target);

    this.handleElemClick = this.handleElemClick.bind(this);

    this.init();
  }

  init() {
    this.addListeners();

    this.gridAreasList.forEach((area, index) => {
      if (index > 0) {
        area.split(' ').forEach((elem) => {
          $(`.${elem}`).style.display = 'none';
        });
      } else {
        area.split(' ').forEach((elem) => {
          $(`.${elem}`).style.display = 'grid';
        });
      }
    });
  }

  addListeners() {
    this.elem.addEventListener('click', this.handleElemClick);
  }

  getGridAreas(elem: HTMLElement) {
    let allAreas = getComputedStyle(elem).gridTemplateAreas.split('"');
    return allAreas.filter((area) => area.length > 0 && area !== ' ');
  }

  getItems(item: string) {
    return item.split(' ');
  }

  getHtmlElem(item: string) {
    return $(`.${item}`);
  }

  isHidden(item: string) {
    return (
      getComputedStyle(this.getHtmlElem(this.getItems(item)[0])).display ===
      'none'
    );
  }

  close() {
    this.gridAreasList.forEach((item, index) => {
      if (index !== 0) {
        this.getItems(item).forEach((elem) => {
          this.getHtmlElem(elem).style.display = 'none';
        });
      }
    });
  }

  open(hiddenElem: string) {
    this.getItems(hiddenElem).forEach((elem) => {
      this.getHtmlElem(elem).style.display = 'grid';
    });
  }

  handleElemClick(e: Event) {
    this.gridAreasList = this.getGridAreas(this.target);
    const hiddenElem = this.gridAreasList.find((item) => this.isHidden(item));

    if (hiddenElem) {
      if (
        this.gridAreasList.indexOf(hiddenElem) ===
        this.gridAreasList.length - 1
      ) {
        this.elem.classList.add('toggle-button');
      }
      this.open(hiddenElem);
    } else {
      this.elem.classList.remove('toggle-button');
      this.close();
    }
  }
}

const togglers = $$('[data-grid-toggle-target]');

togglers.forEach((elem) => new GridToggler(elem));

export default GridToggler;

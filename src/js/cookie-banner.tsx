import { $, $$ } from './utils/dom';

class CookieBanner {
  elem: HTMLElement;

  cookieName: string;

  cookieBannerButton: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem; 
    this.cookieName = 'MiddCookieBannerAlertClosed';
    this.cookieBannerButton = $('.cookie-banner__button', elem);

    this.setCookie = this.setCookie.bind(this);
    this.getCookie = this.getCookie.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.init();
  }

  init() {
    if(!this.getCookie()) {
      this.elem.classList.remove('is-toggled');
      this.addEventListeners();
    }
  }

  addEventListeners() {
    this.cookieBannerButton.addEventListener('click', this.handleClick);
  }

  setCookie(duration: number) {
    const d = new Date();
    const ed = new Date(d.getTime() + (duration * 24 * 60 * 60 * 1000));
    document.cookie = `${this.cookieName}=${d.toUTCString()}; expires=${ed.toUTCString()}; path=/`;
  }
  
  getCookie() {
    const cookies = document.cookie.split(';');
  
    const cookieValue = cookies.find(cookie => cookie.includes(this.cookieName));
    
    return cookieValue;
  }
  
  handleClick() {
    if(!this.getCookie()) {
      this.setCookie(365);
    }
  }
}

const cookieBanner = $$('.js-cookie-banner');

cookieBanner.forEach(banner => new CookieBanner(banner));
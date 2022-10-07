import { $ } from './utils/dom';

// Adds functionality for toggling accordion item if it's link is openend 
// in new tab or window, by checking if it's ID exists in the URL
if(location.hash.includes('#midd-accordion-item-label')) {
  $(location.hash.replace('#midd-accordion-item-label', '.js-accordion-item')).classList.add('is-toggled');
}
/**
 * Polyfills to support ie11
 */

// used in  lozad, micromodal
import 'mdn-polyfills/Object.assign';

// used in micromodal
import 'mdn-polyfills/Array.from';

// used in flowchart, offices, lightbox
import 'mdn-polyfills/Element.prototype.closest';

// for document.querySelectorAll('.thing).forEach()
import 'mdn-polyfills/NodeList.prototype.forEach';

// Polyfill object fit images for easier responsive images.
// Used in card-carousel and more.
import 'object-fit-images';

// Intersection observer for IE and Safari.
// Used in menu-spy, chart animations plugin, lightbox gallery, and lozad package.
// https://caniuse.com/intersectionobserver
import 'intersection-observer';

// polyfill :focus-within for tab accessible menus
// https://caniuse.com/css-focus-within
import 'focus-within-polyfill';

/**
 * Custom JS imports
 */

import './headroom'; // sticky site headers
import './toggler'; // toggler util used in transcript toggle, accordions, and more
import './single-toggler';
import './shifting-slider'; // slider utility used to slide components on hover
import './video'; // for lazy loading iframes until a video thumbnail is clicked
import './digest'; // table of contents creator
import './responsive-table'; // adds data-th attributes for responsive tables
import './events-datepicker'; // make the events datepicker accessible
import './audio-player'; // custom Preact audio player
import './offices'; // middlebury.edu/office homepage script for filtering items shown
import './mover'; // mover util for moving an element from one element to another at a breakpoint. Doesn't work if event listeners are on any of the elements that are moved.TODO: remove me and use css-grid to move layout around
import './lightbox';
import './card-carousel';
import './dropdown';
import './drawer';
import './sticky';
import './tabs';
import './select-url';
import './charts';
import './countup';
import './flowchart';
import './to-top-btn';
import './helpfulness';
import './homepage-grid';
import './course-list';
import './toggle-animation';
import './cookie-banner';

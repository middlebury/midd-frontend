/**
 * polyfill nodelist foreach so you can
 * use document.querySelectorAll('.my-elems').forEach() in IE
 *
 * @todo maybe switch to using Array.from(NodeList).forEach since we
 * are now polyfilling it so we can ditch this foreach polyfill.
 */
import 'polyfill-nodelist-foreach';

// polyfills for micromodal to support ie11
import 'mdn-polyfills/Object.assign';
import 'mdn-polyfills/Array.from';

/**
 * Polyfill intersection observer for IE and safari.
 * Used in menu spies, lazy loaded content, delaying chart animations, etc.
 */
import 'polyfill-nodelist-foreach';

// Polyfill object fit images for easier responsive images.
// Used in card-carousel and more.
import 'object-fit-images';

// polyfill intersection observer for ie and safari
// used in menu-spy.js and triggering chart animations when they scroll into view
import 'intersection-observer';

import focusWithin from 'focus-within'; // polyfill :focus-within for tab accessible menus

import './headroom'; // sticky site headers
import './toggler'; // toggler util used in transcript toggle, accordions, and more
import './video'; // for lazy loading iframes until a video thumbnail is clicked
import './digest'; // table of contents creator
import './responsive-table'; // adds data-th attributes for responsive tables
import './events-datepicker'; // make the events datepicker accessible
import './audio-player'; // custom Preact audio player
import './offices'; // middlebury.edu/office homepage script for filtering items shown
import './slideshow'; // swiperjs slideshows
import './mover'; // mover util for rearraning dom at a breakpoint
import './gallery'; // create Preact lightbox galleries from dom
import './card-carousel';
import './dropdown';
import './drawer';
import './sticky';

focusWithin(document);

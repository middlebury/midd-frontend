import 'polyfill-nodelist-foreach';
import 'mdn-polyfills/Object.assign';
import 'mdn-polyfills/Array.from';
import focusWithin from 'focus-within'; // polyfill :focus-within for tab accessible menus

import '../js/headroom'; // sticky site headers
import '../js/toggler'; // toggler util used in transcript toggle, accordions, and more
import '../js/drawer';

focusWithin(document);

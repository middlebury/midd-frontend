import 'polyfill-nodelist-foreach';
import 'intersection-observer';
import stickybits from 'stickybits';
import focusWithin from 'focus-within';

import './headroom';
import './toggler';
import './video';
import './digest';
import './responsive-table';
import './events-datepicker';
import './audio-player';

import './offices';

focusWithin(document);

stickybits('.js-sticky');

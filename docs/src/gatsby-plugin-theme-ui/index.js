import github from '@theme-ui/prism/presets/github.json';

export default {
  colors: {
    primary: '#0d395f',
    sky: '#0573cd',
    white: '#fff',
    black: '#202020',
    gray1: '#dcdcdc',
    gray2: '#999',
  },
  lineHeights: {
    solid: 1,
    body: 1.7,
    heading: 1.2,
  },
  fonts: {
    body: 'system-ui, sans-serif',
  },
  fontSizes: [12, 14, 16, 18, 24, 32, 48, 64, 88],
  space: [0, 4, 8, 16, 24, 32, 40, 48, 64, 96],
  breakpoints: ['512px', '768px', '1024px', '1280px', '1440px'],
  styles: {
    pre: {
      fontSize: 2,
      ...github,
    },
  },
};
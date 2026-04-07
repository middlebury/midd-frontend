import config from '../config.js';

const mq = (size: number) =>
  window.matchMedia(`(min-width: ${size}px)`).matches;

export const isMediumUp = () => mq(config.breakpoints.md);
export const isLargeUp = () => mq(config.breakpoints.lg);

import { h } from 'preact';

const Icon = ({ icon, className, ...rest }: any) => (
  <svg className={`icon ${className}`} {...rest}>
    <use xlinkHref={`#icon-${icon}`} />
  </svg>
);

export default Icon;

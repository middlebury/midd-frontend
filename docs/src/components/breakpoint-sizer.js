import React from 'react';
import styled, { css } from 'styled-components';

const defaultBreakpoints = [
  { label: 'Small', size: 512 },
  { label: 'Medium', size: 768 },
  { label: 'Large', size: 1024 },
  { label: 'Extra Large', size: 1280 },
];

const Btn = styled.button`
  background: none;
  border: 0;
  font-size: var(--f2);
  padding: var(--space2);
  cursor: pointer;
  border: 1px solid transparent;
  /* border-bottom: 0; */
  position: relative;
  top: 1px;
  z-index: 3;

  ${p =>
    p.active &&
    css`
      color: var(--primary);
      border-color: var(--gray1);
      border-bottom-color: white;
    `}
`;

const BreakpointSizer = ({
  breakpoints = defaultBreakpoints,
  defaultSize = 3,
  children,
}) => {
  const [size, setSize] = React.useState(breakpoints[defaultSize].size);

  const toggleSize = size => e => setSize(size);

  return (
    <div>
      <nav>
        {breakpoints.map(({ label, size: bp }) => (
          <Btn active={size === bp} onClick={toggleSize(bp)} key={label}>
            {label}{' '}
            <span
              css={css`
                font-size: var(--f1);
                color: var(--gray2);
              `}
            >
              {bp}px
            </span>
          </Btn>
        ))}
      </nav>
      <div
        style={{ width: size }}
        css={css`
          border: 1px solid var(--gray1);
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default BreakpointSizer;

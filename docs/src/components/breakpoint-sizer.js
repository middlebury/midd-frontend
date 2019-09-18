/** @jsx jsx */
import { jsx, useThemeUI } from 'theme-ui';
import React from 'react';

const defaultBreakpoints = [
  { label: 'Small', size: 512 },
  { label: 'Medium', size: 768 },
  { label: 'Large', size: 1024 },
  { label: 'Extra Large', size: 1280 },
];

const Btn = p => (
  <button
    {...p}
    sx={{
      bg: 'none',
      border: 0,
      fontSize: 1,
      p: 2,
      cursor: 'pointer',
      borderBottom: '2px solid',
      color: p.active && 'primary',
      borderColor: p.active ? 'primary' : 'transparent',
      opacity: p.active ? 1 : 0.5,
      ':hover': {
        opacity: 1,
      },
    }}
  />
);

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
            {label} <span sx={{ fontSize: 1, color: 'gray2' }}>{bp}px</span>
          </Btn>
        ))}
      </nav>
      <div
        style={{ width: size }}
        sx={{
          width: size,
          border: '1px solid',
          borderColor: 'gray1',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default BreakpointSizer;

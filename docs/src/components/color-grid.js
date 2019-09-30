/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import copy from 'copy-to-clipboard';

const defaultColors = {
  $white: '#fff',
  $black: '#202020',
};

const ColorSwatch = ({ hex, name }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = e => {
    copy(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        sx={{
          display: 'block',
          size: 128,
          bg: hex,
          border: '2px solid',
          borderColor: 'rgba(0,0,0,.1)',
          fontSize: 3,
          fontWeight: 700,
          textIndent: !copied && -9999,
          color: 'rgba(255,255,255,.5)',
          mb: 2,
        }}
      >
        {copied ? 'Copied!' : 'Copy to clipboard'}
      </button>
      <h3
        sx={{
          lineHeight: 'heading',
          fontSize: 3,
          mb: 0,
        }}
      >
        {hex}
      </h3>
      <span
        sx={{
          fontSize: 1,
        }}
      >
        {name}
      </span>
    </div>
  );
};

const ColorGrid = ({ colors = defaultColors }) => {
  return (
    <ul
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, minmax(100px, 1fr))',
      }}
    >
      {Object.keys(colors).map(key => (
        <li
          key={key}
          sx={{
            mr: 4,
            mb: 4,
          }}
        >
          <ColorSwatch hex={colors[key]} name={key} />
        </li>
      ))}
    </ul>
  );
};

export default ColorGrid;

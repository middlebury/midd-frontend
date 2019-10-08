/** @jsx jsx */
import { jsx, styled } from 'theme-ui';
import React, { useEffect, useState, useRef } from 'react';
import Prism from '@theme-ui/prism';
import copy from 'copy-to-clipboard';

const CodeExample = ({ children, language = 'language-html' }) => {
  const codeRef = useRef();
  const [showCodeToggle, setShowCodeToggle] = useState(false);
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = e => {
    copy(children);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const height = codeRef.current.getBoundingClientRect().height;
    console.log(height);
    if (height > 200) {
      setOpen(false);
      setShowCodeToggle(true);
    }
  }, []);

  const toggleMore = e => setOpen(s => !s);

  return (
    <div
      sx={{
        position: 'relative',
      }}
    >
      <div
        style={{
          overflow: 'auto',
          maxHeight: open ? '100%' : 200,
        }}
      >
        <button
          onClick={handleCopyClick}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            fontSize: 1,
            bg: 'primary',
            color: 'white',
            border: 0,
            cursor: 'pointer',
            p: 1,
          }}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
        <div ref={codeRef}>
          <Prism children={children} className={language} />
        </div>
      </div>
      {showCodeToggle && (
        <button
          onClick={toggleMore}
          sx={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            fontSize: 1,
            border: 0,
            borderTop: '2px solid',
            borderColor: 'primary',
            color: 'primary',
            cursor: 'pointer',
            p: 2,
          }}
        >
          {open ? 'Less code' : 'More code'}
          <span
            sx={{
              ml: 1,
              fontSize: 1,
            }}
          >
            {open ? <span>&#9650;</span> : <span>&#9660;</span>}
          </span>
        </button>
      )}
    </div>
  );
};

export default CodeExample;

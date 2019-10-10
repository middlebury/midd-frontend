import { useState } from 'react';
import copy from 'copy-to-clipboard';

export const useCopy = value => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    copy(value);
    setTimeout(() => setCopied(false), 1000);
  };

  return [copied, handleCopy];
};

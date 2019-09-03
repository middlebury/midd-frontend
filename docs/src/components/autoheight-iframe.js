import React from 'react';

export const AutoheightIframe = props => {
  const [height, setHeight] = React.useState(200);

  const sizeIframe = event => {
    setHeight(event.target.contentWindow.document.body.scrollHeight);
  };

  return (
    <iframe
      {...props}
      onLoad={sizeIframe}
      style={{
        width: '100%',
        border: 0,
        height,
      }}
    />
  );
};

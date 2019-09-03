import React from 'react';
import Highlight, {
  defaultProps as defaultPrismProps,
} from 'prism-react-renderer';

const CodeExample = ({ code, language = 'html' }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div
      style={{
        overflow: 'auto',
      }}
    >
      <Highlight code={code} language={language} {...defaultPrismProps}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};

export default CodeExample;

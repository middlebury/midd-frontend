/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import BreakpointSizer from './breakpoint-sizer';
import CodeExample from './code';
import { AutoheightIframe } from './autoheight-iframe';

const DocExample = ({
  file = '',
  dark,
  language = 'language-html',
  children,
}) => {
  const data = useStaticQuery(graphql`
    query files {
      allFileHtml {
        nodes {
          name
          html
        }
      }
    }
  `);

  const doc = data.allFileHtml.nodes.find(node => node.name === file) || {};

  const code = doc.html || children;

  const srcDoc = `
      <link href="/main.css" rel="stylesheet"/>
      <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/83898/706148/css/fonts.css" />
      ${code}
      <script src="/bundle.js"></script>
    `;

  return (
    <div sx={{ mb: 5 }}>
      <BreakpointSizer>
        <div sx={{ p: 4, bg: dark ? '#333' : null }}>
          <AutoheightIframe srcDoc={srcDoc} />
        </div>
      </BreakpointSizer>
      {code && <CodeExample children={code} language={language} />}
    </div>
  );
};

export default DocExample;
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';

import BreakpointSizer from './breakpoint-sizer';
import CodeExample from './code';

import { AutoheightIframe } from './autoheight-iframe';

const DocExample = ({ file = '' }) => {
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

  const srcDoc = `
      <link href="/main.css" rel="stylesheet"/>
      <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/83898/706148/css/fonts.css" />
      ${doc.html}
      <script src="/bundle.js"></script>
    `;

  return (
    <>
      <BreakpointSizer>
        <div sx={{ p: 4 }}>
          <AutoheightIframe srcDoc={srcDoc} />
        </div>
      </BreakpointSizer>
      {doc.html && <CodeExample code={doc.html} />}
    </>
  );
};

export default DocExample;

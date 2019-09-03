/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link, graphql } from 'gatsby';

import SEO from '../components/seo';

import BreakpointSizer from '../components/breakpoint-sizer';
import CodeExample from '../components/code';

import { AutoheightIframe } from '../components/autoheight-iframe';

class DocPage extends React.Component {
  state = { iframeHeight: 800 };
  render() {
    const doc = this.props.data.fileHtml;

    const { previous, next } = this.props.pageContext;

    const srcDoc = `
      <link href="/main.css" rel="stylesheet"/>
      <link rel="stylesheet" type="text/css" href="https://cloud.typography.com/83898/706148/css/fonts.css" />
      ${doc.html}
      <script src="/bundle.js"></script>
    `;

    return (
      <>
        <SEO title={doc.name} />
        <article sx={{ maxWidth: 1000 }}>
          <header sx={{ mb: 3 }}>
            <h1
              sx={{ fontSize: 6, fontWeight: 400, textTransform: 'capitalize' }}
            >
              {doc.name}
            </h1>
          </header>
          <BreakpointSizer>
            <div sx={{ p: 4 }}>
              <AutoheightIframe srcDoc={srcDoc} />
            </div>
          </BreakpointSizer>
          <CodeExample code={doc.html} />
        </article>
      </>
    );
  }
}

export default DocPage;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    fileHtml(fields: { slug: { eq: $slug } }) {
      id
      name
      html
    }
  }
`;

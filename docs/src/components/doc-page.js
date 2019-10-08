/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import Prism from '@theme-ui/prism';

import SEO from './seo';
import ColorGrid from './color-grid';
import Example from './doc-example';

const h2 = props => (
  <h2 sx={{ mt: 5, mb: 3, lineHeight: 'heading' }} {...props} />
);

const components = {
  pre: props => props.children,
  Example,
  code: props =>
    props.example ? <Example {...props} /> : <Prism {...props} />,
  ColorGrid,
  h1: h2,
  h2,
  ol: props => <ol sx={{ listStyle: 'decimal', mb: 4 }} {...props} />,
  ul: props => <ul sx={{ listStyle: 'disc', mb: 4 }} {...props} />,
  li: props => <li sx={{ mb: 2, ml: 3 }} {...props} />,
  p: props => <p sx={{ mb: 4 }} {...props} />,
  table: props => (
    <table
      sx={{
        bg: 'white',
        tableLayout: 'fixed',
        width: '100%',
        border: 0,
        borderCollapse: 'collapse',
        mb: 4,
      }}
      {...props}
    />
  ),
  tr: props => (
    <tr
      sx={{
        ':nth-child(even)': {
          bg: '#f2f2f2',
        },
      }}
      {...props}
    />
  ),
  th: props => (
    <th
      sx={{
        p: 2,
        fontSize: 1,
        fontWeight: 600,
        textAlign: 'left',
        bg: '#f2f2f2',
      }}
      {...props}
    />
  ),
  td: props => (
    <td
      sx={{
        p: 2,
        fontSize: 2,
        // border: '1px solid',
        // borderColor: 'gray1',
      }}
      {...props}
    />
  ),
};

class DefaultPageLayout extends React.Component {
  render() {
    const { frontmatter } = this.props.pageContext;

    return (
      <>
        <SEO title={frontmatter.title} />
        <article sx={{ maxWidth: 800, ml: 'auto', mr: 'auto' }}>
          <header sx={{ mb: 3 }}>
            <h1
              sx={{ fontSize: 6, fontWeight: 400, textTransform: 'capitalize' }}
            >
              {frontmatter.title}
            </h1>
          </header>
          <MDXProvider components={components}>
            {this.props.children}
          </MDXProvider>
        </article>
      </>
    );
  }
}

export default DefaultPageLayout;

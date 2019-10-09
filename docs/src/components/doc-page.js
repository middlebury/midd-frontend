/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';

import SEO from './seo';
import { components } from './mdx-components';

class DefaultPageLayout extends React.Component {
  render() {
    const { frontmatter } = this.props.pageContext;

    return (
      <>
        <SEO title={frontmatter.title} />
        <article sx={{ maxWidth: 800 }}>
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

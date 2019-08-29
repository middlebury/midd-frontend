import React from 'react';
import { Link, graphql } from 'gatsby';
import { css } from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

import middstyles from '../../../dist/css/main.css';

class DocPage extends React.Component {
  render() {
    const doc = this.props.data.fileHtml;
    const { previous, next } = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <SEO title={doc.name} />
        <article>
          <header>
            <h1>{doc.name}</h1>
          </header>
          <iframe srcDoc={doc.html} width="100%" height="800" />
        </article>
      </Layout>
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

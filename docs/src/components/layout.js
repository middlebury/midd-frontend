import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { createGlobalStyle, css } from 'styled-components';

import Header from './header';

import { ThemeStyles } from '../theme';

const GlobalStyles = createGlobalStyle(css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    color: var(--black);
    font-size: var(--f3);
    line-height: var(--lh-body);
    font-family: system-ui, sans-serif;
  }

  button,
  input,
  textarea {
    font-size: var(--f3);
    line-height: var(--lh-body);
  }

  ul,
  ol {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`);

const Layout = ({ location, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 300px 1fr;
        height: 100vh;
      `}
    >
      <ThemeStyles />
      <GlobalStyles />
      <Header siteTitle={data.site.siteMetadata.title} location={location} />
      <main
        css={css`
          padding: var(--space3);
        `}
      >
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import { createGlobalStyle, css } from 'styled-components';

import Header from './header';

const GlobalStyles = createGlobalStyle(css`
  :root {
    --primary: #0d395f;
    --white: #fff;
    --black: #202020;
    --lh-solid: 1;
    --lh-body: 1.7;
    --lh-heading: 1.4;
    --f1: 12px;
    --f2: 14px;
    --f3: 16px;
    --f4: 18px;
    --f5: 24px;
    --f6: 32px;
    --f7: 48px;
    --f8: 64px;
    --f9: 88px;
    --space1: 0.25rem;
    --space2: 0.5rem;
    --space3: 1rem;
    --space4: 1.5rem;
    --space5: 2rem;
    --space6: 3rem;
    --space7: 4rem;
    --bp1: 512px;
    --bp2: 768px;
    --bp3: 1024px;
    --bp4: 1280px;
    --bp5: 1440px;
  }

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
        grid-template-columns: 400px 1fr;
        height: 100vh;
      `}
    >
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

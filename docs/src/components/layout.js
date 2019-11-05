/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Global } from '@emotion/core';

import Header from './header';

const GlobalStyles = () => (
  <Global
    styles={t => ({
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      body: {
        color: t.colors.black,
        fontSize: t.fontSizes[3],
        lineHeight: t.lineHeights.body,
        fontFamily: t.fonts.body,
      },
      'ul,ol': {
        listStyle: 'none',
      },
    })}
  />
);

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
    <div sx={{ display: 'flex' }}>
      <GlobalStyles />
      <div
        sx={{
          width: 320,
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <Header siteTitle={data.site.siteMetadata.title} location={location} />
      </div>
      <main
        sx={{
          overflowY: 'auto',
          height: '100vh',
          width: '100%',
        }}
      >
        <div sx={{ p: 5 }}>{children}</div>
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

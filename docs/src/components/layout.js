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
      <Header siteTitle={data.site.siteMetadata.title} location={location} />
      <main sx={{ p: 3 }}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

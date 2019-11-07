/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query footer {
      site {
        siteMetadata {
          title
        }
        buildTime(formatString: "MMM d, YYYY")
      }
    }
  `);

  return (
    <footer
      sx={{
        bg: 'primary',
        p: 5,
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 2,
      }}
    >
      <div>{data.site.siteMetadata.title}</div>
      <div>Site last updated: {data.site.buildTime}</div>
    </footer>
  );
};

export default Footer;

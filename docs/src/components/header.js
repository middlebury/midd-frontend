/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import groupBy from 'lodash/groupBy';

const SubMenu = ({ label, items = [], isOpen = false, location }) => {
  return (
    <li sx={{ mb: 4 }}>
      <span
        sx={{
          color: 'gray3',
          fontSize: 1,
          fontWeight: 500,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          mb: 1,
        }}
      >
        {label}
      </span>
      <ul>
        {items.map(({ node }) => (
          <li key={node.id}>
            <Link
              to={node.path}
              activeClassName="active"
              sx={{
                display: 'block',
                color: 'sky',
                py: 1,
                fontSize: 2,
                textDecoration: 'none',
                opacity: 0.8,
                ':hover': {
                  opacity: 1,
                },
                '&.active': {
                  fontWeight: 700,
                },
              }}
            >
              {node.context.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Nav = ({ location }) => {
  const data = useStaticQuery(graphql`
    query navQuery {
      allSitePage {
        edges {
          node {
            id
            path
            context {
              frontmatter {
                title
              }
            }
          }
        }
      }
    }
  `);

  const getMenuItems = (part, items = data.allSitePage.edges) =>
    items.filter(({ node }) => node.path.includes(part));

  return (
    <nav>
      <ul>
        <SubMenu
          label="Styles"
          items={getMenuItems('styles')}
          location={location}
        />
        <SubMenu
          label="Components"
          items={getMenuItems('components')}
          location={location}
        />
        <SubMenu
          label="Utilities"
          items={getMenuItems('utilities')}
          location={location}
        />
      </ul>
    </nav>
  );
};

const Header = ({ location, siteTitle = '' }) => {
  return (
    <header
      sx={{
        bg: 'gray0',
        p: 3,
        overflow: 'auto',
        height: '100%',
        borderRight: '1px solid',
        borderColor: 'gray1',
      }}
    >
      <div>
        <h1 sx={{ mb: 5, fontSize: 1, fontWeight: 500 }}>
          <Link
            to="/"
            sx={{ color: 'sky', fontSize: 3, textDecoration: 'none' }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <Nav location={location} />
    </header>
  );
};

export default Header;

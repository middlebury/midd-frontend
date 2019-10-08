/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import groupBy from 'lodash/groupBy';

const SubMenu = ({ label, items = [], isOpen = false, location }) => {
  const containsActiveLink = items.some(
    ({ node }) => node.path === location.pathname
  );

  const [open, setOpen] = React.useState(containsActiveLink || isOpen);

  const toggle = () => setOpen(!open);

  return (
    <div sx={{ mb: 4 }}>
      <button
        onClick={toggle}
        sx={{
          width: '100%',
          color: 'white',
          bg: 'primary',
          p: 2,
          zIndex: 2,
          fontSize: 3,
          position: 'sticky',
          display: 'flex',
          fontWeight: 600,
          justifyContent: 'space-between',
          border: 0,
          opacity: open ? 1 : 0.8,
          cursor: 'pointer',
          '&:hover': {
            opacity: 1,
          },
        }}
      >
        <span>{label}</span>
        <span>{open ? '-' : '+'}</span>
      </button>
      {open && (
        <ul>
          {items.map(({ node }) => (
            <li key={node.id}>
              <Link
                to={node.path}
                sx={{
                  display: 'block',
                  color: 'white',
                  px: 2,
                  py: 1,
                  fontSize: 3,
                  textDecoration: 'none',
                  opacity: 0.8,
                  ':hover': {
                    opacity: 1,
                  },
                }}
              >
                {node.context.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
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
    </nav>
  );
};

const Header = ({ location, siteTitle = '' }) => {
  return (
    <header sx={{ bg: 'primary', p: 3, overflow: 'auto', height: '100%' }}>
      <div>
        <h1 sx={{ mb: 5 }}>
          <Link to="/" sx={{ color: 'white', fontSize: 3 }}>
            {siteTitle}
          </Link>
        </h1>
      </div>
      <Nav location={location} />
    </header>
  );
};

export default Header;

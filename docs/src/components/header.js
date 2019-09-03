/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import groupBy from 'lodash/groupBy';

const SubMenu = ({ label, items, isOpen = false }) => {
  const [open, setOpen] = React.useState(isOpen);

  const toggle = () => setOpen(!open);

  return (
    <div>
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
            <li key={node.name}>
              <Link
                to={node.fields.slug}
                sx={{
                  color: 'white',
                  p: 2,
                  fontSize: 3,
                  textDecoration: 'none',
                  opacity: 0.8,
                  ':hover': {
                    opacity: 1,
                  },
                }}
              >
                {node.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Nav = () => {
  const data = useStaticQuery(graphql`
    query navQuery {
      allFileHtml {
        edges {
          node {
            name
            html
            source
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const group = groupBy(data.allFileHtml.edges, 'node.source');

  const url = window.location.pathname;

  return (
    <nav>
      <SubMenu
        label="Paragraphs"
        items={group.paragraphs}
        isOpen={url.includes('paragraphs')}
      />
      <SubMenu
        label="Partials"
        items={group.partials}
        isOpen={url.includes('partials')}
      />
    </nav>
  );
};

const Header = ({ siteTitle = '' }) => {
  return (
    <header sx={{ bg: 'primary', p: 3, overflow: 'auto' }}>
      <div>
        <h1 sx={{ mb: 5 }}>
          <Link to="/" sx={{ color: 'white', fontSize: 3 }}>
            {siteTitle}
          </Link>
        </h1>
      </div>
      <Nav />
    </header>
  );
};

export default Header;

import { Link, useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import groupBy from 'lodash/groupBy';

import { css } from 'styled-components';

const SubMenu = ({ label, items, isOpen = false }) => {
  const [open, setOpen] = React.useState(isOpen);

  const toggle = () => setOpen(!open);

  return (
    <div>
      <button
        className={open && 'active'}
        onClick={toggle}
        css={css`
          width: 100%;
          color: var(--white);
          background: var(--primary);
          padding: var(--space2);
          z-index: 2;
          position: sticky;
          top: 0;
          display: flex;
          font-weight: 600;
          justify-content: space-between;
          border: 0;
          opacity: 0.8;
          cursor: pointer;

          &.active,
          &:hover {
            opacity: 1;
          }
        `}
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
                css={css`
                  display: block;
                  padding: var(--space2);
                  color: var(--white);
                  font-size: var(--f3);
                  opacity: 0.8;
                  :hover {
                    opacity: 1;
                  }
                `}
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
    <header
      css={css`
        background: var(--primary);
        padding: var(--space3);
        overflow: auto;
      `}
    >
      <div>
        <h1
          css={css`
            margin-bottom: var(--space5);
          `}
        >
          <Link
            to="/"
            css={css`
              color: var(--white);
              font-size: var(--f3);
            `}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
      <Nav />
    </header>
  );
};

export default Header;

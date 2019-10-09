/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import debounce from 'lodash/debounce';
import { useStaticQuery, graphql } from 'gatsby';

const IconGrid = () => {
  const data = useStaticQuery(graphql`
    query IconGridQuery {
      allSvg {
        nodes {
          internal {
            content
          }
          name
        }
      }
    }
  `);

  return (
    <div>
      {/* <div sx={{ mb: 3 }}>
        <label
          htmlFor="icon-search"
          sx={{
            fontSize: 2,
            display: 'block',
          }}
        >
          Search by name
        </label>
        <input
          type="search"
          onChange={handleSearch}
          value={value}
          placeholder="Arrow..."
          id="icon-search"
          sx={{
            border: '1px solid',
            p: 2,
            fontSize: 3,
          }}
        />
        {term}
      </div> */}

      <ul
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {data.allSvg.nodes.map(node => (
          <li
            key={node.name}
            sx={{
              width: '25%',
              mr: '-1px',
              mt: '-1px',
            }}
          >
            <div
              sx={{
                bg: 'transparent',
                width: '100%',
                textAlign: 'left',
                p: 2,
                border: '1px solid',
                borderColor: 'gray1',
              }}
            >
              <span sx={{ fontSize: 1 }}>{node.name}</span>
              <button></button>
              <div
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                }}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: node.internal.content }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconGrid;

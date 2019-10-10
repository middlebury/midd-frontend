/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import debounce from 'lodash/debounce';
import { useStaticQuery, graphql } from 'gatsby';
import DownloadLink from 'react-download-link';

import { useDownload } from '../hooks/use-download';
import { useCopy } from '../hooks/use-copy';

const IconSearch = ({ value, term, handleSearch }) => (
  <div sx={{ mb: 3 }}>
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
  </div>
);

const IconBtn = props => (
  <button
    sx={{
      fontSize: 0,
      color: 'sky',
      textDecoration: 'underline',
      border: 0,
      cursor: 'pointer',
    }}
    {...props}
  />
);

const IconTile = ({ name, svg }) => {
  const [copied, handleCopy] = useCopy(svg);
  const download = useDownload(name + '.svg', svg);

  return (
    <div
      sx={{
        bg: 'transparent',
        width: '100%',
        textAlign: 'left',
        p: 2,
        border: '1px solid',
        borderColor: 'gray1',
        ':hover': {
          '.svg-download': {
            visibility: 'visible',
          },
        },
      }}
    >
      <span sx={{ fontSize: 1 }}>{name}</span>
      <div
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          height: 100,
        }}
      >
        <span dangerouslySetInnerHTML={{ __html: svg }} />
      </div>

      <div
        sx={{ display: 'flex', visibility: 'hidden' }}
        className="svg-download"
      >
        <IconBtn sx={{ mr: 1 }} onClick={download}>
          Download
        </IconBtn>
        <IconBtn onClick={handleCopy}>
          {copied ? 'Copied! ' : 'Copy to clipboard'}
        </IconBtn>
      </div>
    </div>
  );
};

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
      <ul
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {data.allSvg.nodes.map(node => (
          <li key={node.name} sx={{ width: '25%' }}>
            <IconTile name={node.name} svg={node.internal.content} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IconGrid;

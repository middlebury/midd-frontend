/** @jsx jsx */
import { jsx } from 'theme-ui';
import Prism from '@theme-ui/prism';

import ColorGrid from './color-grid';
import IconGrid from './icon-grid';
import Example from './doc-example';

const h2 = props => (
  <h2 sx={{ mt: 9, mb: 2, lineHeight: 'heading' }} {...props} />
);

export const components = {
  Example,
  IconGrid,
  ColorGrid,
  a: props => (
    <a
      {...props}
      sx={{
        color: 'sky',
      }}
    />
  ),
  pre: props => props.children,
  code: props => (
    <div sx={{ mb: 5 }}>
      {props.example ? <Example {...props} /> : <Prism {...props} />}
    </div>
  ),
  h1: h2,
  h2,
  ol: props => <ol sx={{ listStyle: 'decimal', mb: 4 }} {...props} />,
  ul: props => <ul sx={{ listStyle: 'disc', mb: 4 }} {...props} />,
  li: props => <li sx={{ mb: 2, ml: 3 }} {...props} />,
  p: props => <p sx={{ mb: 4 }} {...props} />,
  table: props => (
    <table
      sx={{
        bg: 'white',
        tableLayout: 'fixed',
        width: '100%',
        border: 0,
        borderCollapse: 'collapse',
        mb: 4,
      }}
      {...props}
    />
  ),
  tr: props => (
    <tr
      sx={{
        ':nth-child(even)': {
          bg: '#f2f2f2',
        },
      }}
      {...props}
    />
  ),
  th: props => (
    <th
      sx={{
        p: 2,
        fontSize: 1,
        fontWeight: 600,
        textAlign: 'left',
        bg: '#f2f2f2',
      }}
      {...props}
    />
  ),
  td: props => (
    <td
      sx={{
        p: 2,
        fontSize: 2,
        // border: '1px solid',
        // borderColor: 'gray1',
      }}
      {...props}
    />
  ),
};

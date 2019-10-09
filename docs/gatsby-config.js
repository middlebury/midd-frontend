module.exports = {
  siteMetadata: {
    title: 'Middlebury Components',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/layout'),
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'paragraphs',
        path: `${__dirname}/../dist/paragraphs`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'partials',
        path: `${__dirname}/../dist/partials`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'icons',
        path: `${__dirname}/../dist/icons/svg`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content`,
      },
    },
    'gatsby-transformer-svg',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          default: require.resolve('./src/components/doc-page.js'),
        },
      },
    },
    // { resolve: 'gatsby-transformer-twig' },
    { resolve: 'gatsby-transformer-html' },
  ],
};

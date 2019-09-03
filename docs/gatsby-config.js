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
    // { resolve: 'gatsby-transformer-twig' },
    { resolve: 'gatsby-transformer-html' },
  ],
};

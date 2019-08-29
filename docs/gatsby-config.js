module.exports = {
  siteMetadata: {
    title: 'Middlebury Components',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
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
    { resolve: 'gatsby-plugin-styled-components' },
  ],
};

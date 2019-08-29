const path = require('path');
const twig = require('twig');

const fs = require('fs');

const file = fs.readFileSync(
  path.resolve(
    __dirname,
    '../../../src/templates/paragraphs/card-carousel.twig'
  ),
  {
    encoding: 'utf8',
  }
);

const partials = path.resolve(__dirname, '../../../src/templates/partials/');
console.log(partials);

const html = twig
  .twig({
    data: file,
    base: path.resolve(__dirname, '../../../src/templates/'),
    views: path.resolve(__dirname, '../../../src/templates/'),
    allowInlineIncludes: true,
    namespaces: {
      partials,
    },
  })
  .render();

console.log(html);

const fs = require('fs');
const path = require('path');
const Twig = require('twig');
const _ = require('lodash');
const yaml = require('js-yaml');
const prettier = require('prettier');
const glob = require('glob');

const PROD = process.env.NODE_ENV === 'production';
const TEST = process.env.CI;

function processHtml() {
  const templates = glob.sync('./src/templates/*.twig', { ignore: './src/templates/*layout.twig' });
  const ymlData = yaml.load(fs.readFileSync('./src/data/data.yml', 'utf8'));
  const imageStyles = yaml.load(fs.readFileSync('./src/data/image_styles.yml', 'utf8'));
  
  const data = {
    ...ymlData,
    ...imageStyles,
    env: {
      test: TEST,
      production: PROD,
      vercel: Boolean(process.env.VERCEL_URL)
    }
  };
  
  templates.forEach(templatePath => {
    Twig.extendFilter('exists', (value, args) => {
      if (!value) {
        throw new Error('value is falsy');
      }

      return value;
    });

    Twig.extendFilter('groupBy', (items, field) => {
      const grouped = _.groupBy(items, field[0]);

      const groupArr = Object.keys(grouped).map((key) => ({
        group: key,
        items: grouped[key]
      }));

      return groupArr;
    });

    Twig.extendFilter('cast_to_array', (items) => {
      return Object.keys(items).map((key) => {
        return {
          ...items[key],
          key
        };
      });
    });
    
    const template = Twig.twig({ path: templatePath, base: './src/templates', async: false });
    const renderedHtml = template.render(data);
    console.log(data);
    const prettifiedHtml = prettier.format(renderedHtml, { parser: 'html' });
    
    const outputPath = path.join('./dist', path.basename(templatePath, '.twig') + '.html');
    fs.writeFileSync(outputPath, JSON.stringify(prettifiedHtml));
  });

  console.log('HTML processing complete');
}

processHtml();
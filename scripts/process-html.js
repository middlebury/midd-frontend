const fs = require('fs');
const path = require('path');
const Twig = require('twig');
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
    const template = Twig.twig({ path: templatePath, async: false });
    const renderedHtml = template.render(data);
    const prettifiedHtml = prettier.format(renderedHtml, { parser: 'html' });
    
    const outputPath = path.join('./dist', path.basename(templatePath, '.twig') + '.html');
    fs.writeFileSync(outputPath, prettifiedHtml);
  });

  console.log('HTML processing complete');
}

processHtml();
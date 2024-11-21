const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const glob = require('glob');
const SVGO = require('svgo');

const svgo = new SVGO({
  plugins: [
    { removeTitle: true },
    { removeXMLNS: true },
    { removeAttrs: { attrs: '(stroke)' } }
  ]
});

function generateSvgSprite() {
  const spriter = new SVGSpriter({
    mode: {
      symbol: {
        dest: 'dist/icons/sprites',
        sprite: 'sprite.symbol.svg',
        example: true
      }
    },
    shape: {
      id: {
        generator: 'icon-%s'
      }
    },
    svg: {
      xmlDeclaration: false
    }
  });

  const svgFiles = glob.sync('./src/icons/*.svg');

  svgFiles.forEach(file => {
    const svgContent = fs.readFileSync(file, 'utf8');
    svgo.optimize(svgContent, { path: file }).then(result => {
      spriter.add(path.resolve(file), null, result.data);
    });
  });

  spriter.compile((error, result) => {
    for (const mode in result) {
      for (const resource in result[mode]) {
        fs.mkdirSync(path.dirname(result[mode][resource].path), { recursive: true });
        fs.writeFileSync(result[mode][resource].path, result[mode][resource].contents);
      }
    }
    console.log('SVG sprite generation complete');
  });
}

generateSvgSprite();
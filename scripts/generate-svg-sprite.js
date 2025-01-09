import fs from 'node:fs';
import path from 'node:path';
import SVGSpriter from 'svg-sprite';
import glob from 'glob';
import SVGO from 'svgo';

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
# Contributing

TODO: add TOC here

## Prior Reading

There are various tools and libraries to be somewhat familiar with prior to working with this codebase. It's not required to read 100% of each of their docs but if you at least begin to skim or find "Intro to x" articles online, it may be helpful.

### CSS

- [Sass](https://sass-lang.com/) - The core tool used to organize CSS files into partials while providing variables, mixins, and more.
- [BEM](https://en.bem.info/methodology/quick-start/) - BEM is a CSS methodology used for sane organization of a large component driven CSS codebase.
- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) - Some ideas are borrowed from ITCSS methods as well though not 100% applied to the CSS architecture.
- [PostCSS](https://postcss.org/) - A build tool for adding vendor prefixes, organizing media queries, and minifying.

### Javascript

- [TypeScript](https://www.typescriptlang.org/) - Codebase previously used [Babel](https://babeljs.io/) but was moved to TypeScript since it 'includes the kitchen sink' in terms of future JS features
- [Preact](https://preactjs.com/) - Used to create javascript components which render as a whole and do not rely too much on existing elements in the view. See `./src/js/components/audio.tsx` for an example.

### Build Tools

- [NodeJS](https://nodejs.dev/) - To run build tools and manage dependencies
- [Gulp](https://gulpjs.com/) - Runs various build tasks like CSS/JS build process, optimizing images, building SVG icons, converting Twig files to HTML, and serving everything on a local server.
- [Webpack](https://webpack.js.org/) - Compiles TypeScript, handles JS module imports, and minifying JS

## Required software

[NodeJS](https://nodejs.org/en/download/) (at least version 12 or higher) must be installed on your computer or development server to run the various build tools and to install dependencies.

You can use [n](https://www.npmjs.com/package/n) (mac only) or [nvm](https://github.com/nvm-sh/nvm) package to manage Node versions on your machine.

## Quick start

```bash
# clone the repo
git clone https://github.com/middlebury/midd-frontend.git

# change directory into it
cd midd-frontend

# install nodejs packages (this takes some time first run)
npm install

# run local server, watch and compile assets on file changes, livereload browser on change
npm start
```

## Directory structure

- The two main folders of this repo consist of "source" (`src`) and "distribution" (`dist`) directories.
- `src` contains the main assets which have yet to be processed and the output is the `dist` folder.
- `dist` is automatically created by the build tools and ignored in git.

> Folders below can be found in the `src` directory.

<!-- prettier-ignore -->
Folder|Description
---|---
data | .yml files for test data or responsive image sizes. This data is converted into JSON objects and passed as global variables to the twig templates. [See gulp-data configuration](https://github.com/middlebury/midd-frontend/blob/dee75534f0aaef6a9eb2f619730a2a77d411e442/gulpfile.js#L166-L184)
icons | .svg files which are turned into an svg icon sprite. [See icons](#icons)
images | Images (`.jpg`, `.png`, `.svg` mainly) like logos or assets needed for designs.
images/demo | images meant to be used for testing designs in this repo. These images aren't deployed to the Drupal theme.
js | JavaScript/TypeScript files. Root contains mostly custom JavaScript widgets and the main `index.ts` file which imports each widget so they can be bundled together.
js/components | [Preact](https://preactjs.com/) components like the custom audio player
js/utils | Small reusable utilities used throughout the JS widgets
scss| Sass/CSS files. Root contains some configuration files and `main.scss` to be the root file which imports all partial files. Also contains `pardot-forms.scss` which is compiled as a separate stylesheet to be uploaded to Pardot.
scss/components | Various components like buttons, accordions, or styles tied to a full Drupal Paragraph component.
scss/mixins | [SCSS mixins](https://sass-lang.com/documentation/at-rules/mixin)
scss/scope | Scope styles are typically when you can only apply 1 wrapper class to an element and intend to select elements within that wrapper. Example: `.typography` class wraps WYSIWYG content because the elements rendered as output do not have unique classes.
scss/utils | Utility classes like `clearfix` or `float-right`. Most of these classes have 1 CSS declaration. Inspired by [Bootstrap utilities](https://getbootstrap.com/docs/4.5/utilities) and [Tailwindcss](https://tailwindcss.com/) approaches for utilities.
templates | Twig/HTML files. Root folder contains mainly full page layout examples for various content types and views. 
templates/paragraphs | Components for [Drupal Paragraphs](https://www.drupal.org/project/paragraphs). There is little that tightly couples the markup to actual Paragraphs, so the markup can could be considered generic HTML/BEM components.
templates/partials | Abstracted components like `accordion.twig` which is used in multiple paragraphs or simply files to contain other imports for re-use in the root `templates/` files. An example of this is `basic-content.twig` which includes all possible Paragraphs. Since we have a school layout and

## Deploying / Git workflow

`develop` branch is the default branch. This is intended to be somewhat of a staging environment before shipping code to production.

## Working on a feature

1. Create your new feature branch `git checkout -b my-feature-name`
2. Make your changes and commit
3. Open a pull request merging your feature branch into `develop` branch
4. GitHub Actions (`.github/workflows/ci.yml`) will run a build of the branch to ensure it compiles.
   - Your feature branch will automatically be deployed to a preview environment using [Vercel](https://vercel.com/) and it will leave a comment on the PR giving you a link to the built files (Vercel runs its own build, so the build from GH actions is not the exact same run). This is handy when you want to share the changes with team members.

## Deploying to production

1. Once `develop` branch is in a production-ready state, open a pull request to merge it into `master`.
2. Let GitHub actions run a build to ensure all assets compile correctly.
3. Once merged, the [GitHub Actions CI workflow](https://github.com/middlebury/midd-frontend/actions?query=workflow%3ACI) automatically builds the updated `master` branch using `npm run build` and commits the built assets to a [`master-dist`](https://github.com/middlebury/midd-frontend/tree/master-dist) branch. That branch is then pulled down via ITS' deployment scripts for deploying to production.

> You can certainly avoid GitHub pull request workflows and merge locally on your machine then push to `master` but it's ideal run the CI scripts to help catch possible issues.

<!-- > Percy visual diffs aren't in a perfect condition but they work for the most part. See https://github.com/middlebury/midd-frontend/issues/347 -->

### Possible improvements

- We could build and commit assets in a `dist` directly on the `develop` or `master` branch. This is how some npm packages like Bootstrap deploy and will let you see diffs over time more easily with other branches.

- Constantly merging (if with a merge commit) from `develop` -> `master` creates commit spam on the `master` branch. If making pull requests to merge (which is recommended), GitHub might complain that your branch isn't up to date with the target branch. This can possibly be avoided if merging is done with rebase option in GH PRs but has not been fully investigated.

## Editor setup

[Visual Studio Code](https://code.visualstudio.com/) is recommended for a code editor.

VS Code should automatically prompt you to install a small selection of extensions to aid working with this codebase if you don't already have them.

- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Twig language](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language-2)
- [SCSS intellisense](https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-scss)

If you are using another code editor, we recommend at least finding its [Prettier](https://prettier.io/docs/en/editors.html) formatting extension and adjust your settings to auto format files on save with Prettier.

Alternatively, you can run `npm run format` which will run Prettier via npm script but it will format all files.

## NPM Scripts

Scripts runnable with `npm run <script name>`.

> `npm start` is native to npm so you don't have to type `run` in it. Other scripts you need the above format.

<!-- prettier-ignore -->
command|description
---|---
`start` | alias for dev script
`dev` | cleans the `dist` folder, runs initial build, starts local dev server, then watches source files for changes to then rebuild if updated
`dev:saw` | Same as `dev` but does not run local server
`build` | Compile all assets for production build
`build:scripts` | Build JS. Useful for debugging JS build process
`build:styles` | Build CSS. Useful for debugging CSS build process
`build:icons` | Build svg icon sprite
`deploy` | Copies built assets from the build output file to a desired theme directory. 
`deploy:gh` | If GitHub Actions workflow deploy isn't functioning, you can run this to build files and commit/push to `master-dist` branch
`now-build` | Runs on [Vercel](http://vercel.com/) platform to build _and_ move the output directory
`test` | Root test script. Later would test more at once like unit tests if they were present.
`test:bundlesize` | [bundlesize](https://github.com/siddharthkp/bundlesize) test to ensure built files don't exceed a file size
`lint` |  Root lint script to run others (previously ran eslint as well)
`lint:styles` | Runs Stylelint to lint SCSS files
`format` | Runs Prettier on supported file types like `ts`, `scss`, and `twig`

## Code style

- Twig, TypeScript, and SCSS is formatted using [Prettier](https://prettier.io/)
  - Prettier does not support formatting Twig by default so [this plugin is used to handle that](https://github.com/trivago/prettier-plugin-twig-melody). It's already configured and should work once you install npm packages.
- See `.prettierrc` for settings

- [Stylelint](https://stylelint.io/) is used for some basic linting on SCSS files.

  - Linting warnings and errors will display in your terminal when running `npm run dev` or `npm run build`
  - Check your code editor for stylelint extensions or plugins if you want warnings to show in the files directly

- All files should be [kebab case](https://en.wiktionary.org/wiki/kebab_case) (lowercase, hyphenated).

## CSS/Sass

CSS is written using [Sass](https://sass-lang.com/)

## JavaScript/TypeScript

JavaScript in this project is written using TypeScript for a few core reasons.

- Strong type safety and self documenting nature of types for arguments
- Allows for using new JavaScript features and compiling to a backwards compatible version of JS
- Developer experience improvements like autocompletions and helps you catch errors before running the JS

Read more at [typescriptlang.org](https://www.typescriptlang.org/)

### Applying JS to Twig/HTML

If you have JavaScript that needs to hook onto an element in the DOM, use a CSS class prefixed with `js-`.

- This makes it clear that the HTML element has related JavaScript and the class should not be removed unless that JS is modified/removed as well.
- Don't use CSS styling to target this class e.g. `.js-my-widget { color: red; }`

If you have settings that need to be passed to the JS widget, you can use data attributes which would then be read by the JS.

Try to prefix each data attribute with your widget name to prevent conflicts with other possible widgets used in or around the same HTML.

```html
<div class="js-drawer" data-drawer-speed="500">...</div>
```

> In some widgets, there is no `js-` class applied and only data attributes are used. This could to be standardized to just data attributes.

### Preact components

[Preact](https://preactjs.com/) is used to render a few widgets which create many elements on the page at once without relying on existing markup it would need to mix with.

- Custom Audio player `/src/js/components/audio.tsx`
- Custom horizontal percent bar chart `src/js/components/percent-bar-chart.tsx`
- Table of contents menu `src/js/digest.tsx` - not stored in components as the bulk of the widget does more than render the navigation

### Widget structure

Most widgets follow the below structure.

```js
class MyWidget {
  /**
   * Widgets follow this arguments structure for initializing.
   *
   * @param {Element} element - The root element to bind the widget to.
   * @param {Object} config - Configuration options for the widget.
   */
  constructor(element, config) {
    this.elem = element;

    // use config if needed here

    // init the widget
    this.init();
  }

  init() {
    // initialize the component however you need
    // e.g. add an enabled class to the root element

    // then add lsiteners
    this.addListeners();
  }

  addListeners() {
    // add whatever event listeners you need here
  }

  // add other methods

  // if the widget should be destroyable, add a method
  destroy() {
    // clean up
    // remove listeners
    // etc
  }
}

// add the widget to all classes on the page
const widgets = document.querySelectorAll('.js-my-widget');
// NodeList.forEach is polyfilled for IE
widgets.forEach((element) => new MyWidget(element));

export default MyWidget;
```

This lets you initalize all widgets already on the page or create new widgets in other widgets

```js
import MyWidget from './my-widget';

function setupThing(elem) {
  const config = {
    speed: 500
  };

  const widget = new MyWidget(elem, config);

  widget.runMethod();
}
```

## Icons

Our icon system uses SVG symbols to create a reusable and flexible icon set.

> Read more about svg sprite vs icon font
> https://css-tricks.com/icon-fonts-vs-svg/

### How to add a new icon

1. Designer prepares the icon in the [Figma icons file](https://www.figma.com/file/KxnijUyvePfq1wMPYLQLqW/Icons?node-id=4%3A113)

   - Each icon should be on its own 24x24 artboard

2. Export the icon as svg and save into `src/icons/`

   - Do not save the icon filename as `icon-*.svg`. The build tool will prefix the name with `icon-` for you. This is because icons on the page get `id`s, a generic name could conflict with other element `id`s on the page.

3. Run `npm run build:icons`
   1. It cleans up some of the SVG which is not needed for an icon sprite
   2. It creates a single svg file containing all the icons
   3. It copies the generated sprite and replaces the `src/templates/partials/icons.twig` with the new contents
4. Commit the updated `icons.twig`

The `icons.twig` must be included after the opening `body` tag and hidden with CSS.

```twig
<body>
  <!-- style attribute so there is no wait an external stylesheet to load -->
  <div style="display:none">
    {% include 'partials/icons.twig' %}
  </div>...
</body>
```

You can now use your new icon in templates.

```twig
{% include 'partials/icon.twig' with {
  name: 'new-icon'
} %}
```

> Use the Twig partial so mandatory classes and attributes are set already.

## Supported Browsers

- Supported browsers are defined in `.browserlistrc` in the root of the repo. This config is checked by other tools using [browserslist](https://github.com/browserslist/browserslist)
- PostCSS will check this browser list to ensure it adds needed vendor prefixes when running autoprefixer.
- Previously, [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env) used this but JS was converted to TypeScript

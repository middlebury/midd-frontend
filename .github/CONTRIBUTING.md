# Contributing

TODO: add TOC here

## Prior Reading

There are various tools and libraries to be somewhat familiar with prior to working with this codebase. It's not required to read 100% of each of their docs but if you at least begin to skim or find "Intro to x" articles online for given items below, it would be helpful as you browse this codebase. 

### CSS 
- [Sass](https://sass-lang.com/) - The core tool used to organize CSS files into partials while provding variables, mixins, and more.
- [BEM](https://en.bem.info/methodology/quick-start/) - BEM is a CSS methodology used for sane organization of a large component driven CSS codebase. 
- [ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/) - Some ideas are borrowed from ITCSS methods as well though not 100% applied to the CSS architecture.
- [PostCSS](https://postcss.org/) - A build tool for adding vendor prefixes, organizing media queries, and minifying. 

### Javascript 
- [TypeScript](https://www.typescriptlang.org/) - Codebase previously used [Babel](https://babeljs.io/) but was moved to TypeScript since it 'includes the kitchen sink' in terms of future JS features  
- [Preact](https://preactjs.com/) - Used to create javascript components which render as a whole and do not rely too much on existing elements in the view. See `./src/js/components/audio.tsx` for an example of one.

### Build Tools
- [NodeJS](https://nodejs.dev/) - To run build tools and manage dependencies
- [Gulp](https://gulpjs.com/) - Runs various build tasks like CSS/JS build process, optimizing images, building SVG icons, converting Twig files to HTML, and serving everything locally on a local server.
- [Webpack](https://webpack.js.org/) - Compiles TypeScript, import JS modules, and minify


## Required software

[NodejS](https://nodejs.org/en/download/) (at least version 12 or higher) must be installed on your computer or development server to run the various build tools and install packages.

You can use [n](https://www.npmjs.com/package/n) (mac only) or [nvm](https://github.com/nvm-sh/nvm) package to manage Node versions on your machine

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

## Deploying / Git workflow

`develop` branch is the default branch. This is intended to be somewhat of a staging environment before shipping code to production.

## Working on a feature

1. Create your new feature branch `git checkout -b my-feature-name`
2. Make your changes and commit
3. Open a pull request merging your feature branch into `develop` branch
4. GitHub Actions (`.github/workflows/ci.yml`) will run a build of the branch to ensure it compiles.
   - Your feature branch will automatically be deployed to a preview environment using [Vercel](https://vercel.com/) and it will leave a comment on the PR giving you a link to the built files (Vercel runs its own build, so the build from GH actions is not the exact same run). This is very handy when you want to share the changes with team members.

## Deploying to production

1. Once `develop` branch is in a production-ready state, open a pull request to merge it into `master`.
2. Let GitHub actions run a build to ensure all assets compile correctly. 
3. Once merged, the [GitHub Actions CI workflow](https://github.com/middlebury/midd-frontend/actions?query=workflow%3ACI) automatically builds the updated `master` branch using `npm run build` and commits the built assets to a [`master-dist`](https://github.com/middlebury/midd-frontend/tree/master-dist) branch. That branch is then pulled down via ITS' deployment scripts for deploying to production.

> You can certainly avoid GitHub pull request workflows and merge things locally on your machine then push to `master` but it's ideal run the CI scripts to help catch possible issues.

<!-- > Percy visual diffs aren't in a perfect condition but they work for the most part. See https://github.com/middlebury/midd-frontend/issues/347 -->


### Possible improvements

- We could build and commit assets in a `dist` directly on the `develop` or `master` branch. This is similar to how some npm packages like Bootstrap deploy and will let you see diffs over time more easily with other branches.

- Constantly merging (if with a merge commit) from `develop` -> `master` creates commit spam on the `master` branch. If making pull requests to merge (which is recommended), GitHub might complain that your branch isn't up to date with the target branch. This can possibly be avoided if merging was done with rebase option in GH PRs but has not been fully investigated.

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

Various scripts runnable with `npm run <script name>`.

> `npm start` is native to npm so you don't have to type `run` in it. Other scripts you need the above format.

- `start` -  alias for dev script
- `dev` -  start local dev server, watches assets, etc
- `dev:saw` -  only watches assets, does not start server since
- `build` -  compile all assets for production build
- `build:scripts` -  build JS. Useful for debugging JS build.
- `build:styles` -  build CSS. Useful for debugging CSS build.
- `build:icons` -  build svg icon sprite
- `deploy` -  deploy copies built assets from the build output file to a desired theme directory. 
- `deploy:gh` -  if CI workflow deploy isn't functioning, you can run this to ship to master-dist branch
- `now-build` -  this runs on vercel platform to simply move the output directory
- `test` -  root test script. Later would test more at once like unit tests if they were present.
<!-- - `test:visual` -  run percy visual diff -->
- `test:bundlesize` -  [bundlesize](https://github.com/siddharthkp/bundlesize) test
- `lint` -  root lint script to run others
- `lint:styles`: /scss/*", // lint SCSS
- `format`: /.prettierrc --write \"src/**/*.{js,scss,twig}\"" // code style format files with Prettier

## Build tools and config

TODO:

- gulp
- Browserlist / browser compat

## Code style and practices

- TODO: prettier formatting + twig plugin
- stylelint
- eslint/xo: TODO: fix for TS conversion

## HTML/Twig

TODO: Explain dir structure

- TODO: BEM
- data attribute usage vs js- hooks

## CSS/Sass

TODO: explain dir structure

TODO: Postcss
BEM naming

## JavaScript

TODO: show js/ dir structure and explain

- All JavaScript in this repo is using [TypeScript] so types can be defined to improve self documentation

TODO: preact usage

TODO: widget approach (using classes). Make note that conversionn to a function would be better

TODO: build tools used

## Testing

TODO: percy

## Icons

## Dev experience

- vscode extensions
- global npm packages
- node version management

## Deployment

- TODO: previews on vercel

## Future plans

- living styleguide
- integration testing

## Other tools

- caniuse
- devdocs.io
- bundlephobia

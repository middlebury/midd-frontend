# midd-frontend

> Frontend code for middlebury_theme

![CI](https://github.com/middlebury/midd-frontend/workflows/CI/badge.svg)
[![dependency status](https://david-dm.org/middlebury/midd-frontend.svg)](https://david-dm.org/middlebury/midd-frontend)
[![dev dependency status](https://david-dm.org/middlebury/midd-frontend/dev-status.svg)](https://david-dm.org/middlebury/midd-frontend?type=dev)

## Requirements

- Node ^16.19.0

To check if you already have node installed, open terminal and use the following command:

```bash
node -v
```

## Getting started

Clone the repo to a local machine, using your preferred method.

_SAW is not used to work in this repo due to conflict with SAW and how node works._

Open terminal and change directory into the cloned local repo.

Install node modules:

```bash
npm install
```

You may be asked to fix dependencies, go ahead and do that.

### Development

Run local browser sync server and watch files:

```bash
npm start
```

### Build for production

```bash
npm run build
```

### Changing output path

For development on `saw.middlebury.edu`, you can build assets to a desired Drupal theme directory by creating an `.env` file in the root directory of this repo.

```
THEME_DIR="../your/path/to/d8/web/themes/custom/middlebury_theme/"
```

Now when you run `npm run build` or `npm run dev`, assets will be output to that directory.

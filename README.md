# midd-frontend
> Frontend code for middlebury_theme

[![Build Status](https://travis-ci.org/middlebury/midd-frontend.svg?branch=master)](https://travis-ci.org/middlebury/midd-frontend)
[![dependency status](https://david-dm.org/middlebury/midd-frontend.svg)](https://david-dm.org/middlebury/midd-frontend)
[![dev dependency status](https://david-dm.org/middlebury/midd-frontend/dev-status.svg)](https://david-dm.org/middlebury/midd-frontend?type=dev)

## Requirements
- Node 8.12+

## Getting started

Install node modules:

```bash
npm install
```

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


#!/bin/bash

# install design system packages
cd ../

npm install

# build assets in design system and copy them to docs folder
npm run build:docs

# build the docs site

cd docs

npm install

npm run build


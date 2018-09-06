#!/bin/bash

# Abort on errors
set -e

# Build
yarn run build

# Set Git config
git config --global user.name "D.Yang"
git config --global user.email "koyangslash@gmail.com"
git config --global push.default simple

# Add docs
cd docs
git init
git add .
git commit -m "deploy $TRAVIS_BUILD_NUMBER"

# Add coding remote
git push --force --quiet "https://${CI_TOKEN}@github.com/baomidou/mybatis-plus-doc.git" master:gh-pages 

# Add gitee remote
git push --force --quiet "https://yangyang0507:${CI_TOKEN_CODING}@git.coding.net/yangyang0507/mybatis-plus-doc.git" master:gh-pages

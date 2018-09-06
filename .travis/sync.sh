#!/bin/bash

# Abort on errors
set -e

# Build
yarn run build

# Set Git config
git config --global user.name "D.Yang"
git config --global user.email koyangslash@gmail.com
git config --global push.default simple

# Add docs
git add -f docs/ -A
git commit -m 'deploy'

# Add coding remote
git remote add coding https://${CI_TOKEN_CODING}@git.coding.net/yangyang0507/mybatis-plus-doc.git
git push coding master -f

# Add gitee remote
git remote add github https://${CI_TOKEN}@github.com/baomidou/mybatis-plus-doc.git
git push github master -f

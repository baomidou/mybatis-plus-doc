#!/bin/bash

# Decrypt the private key
openssl aes-256-cbc -K $encrypted_cea1bcafd161_key -iv $encrypted_cea1bcafd161_iv -in .travis/ssh_key.enc -out ~/.ssh/id_rsa -d

# Set the permission of the key
chmod 600 ~/.ssh/id_rsa

# Start SSH agent
eval $(ssh-agent)

# Add the private key to the system
ssh-add ~/.ssh/id_rsa

# Copy SSH config
cp .travis/ssh_config ~/.ssh/config

# Set Git config
git config --global user.name "D.Yang"
git config --global user.email koyangslash@gmail.com
git config --global push.default simple

# Abort on errors
set -e

# Build
yarn run build

# Add docs
git add -f docs/ -A
git commit -m 'deploy'

# Add coding remote
git remote add coding git@git.coding.net:yangyang0507/mybatis-plus-doc.git
git push coding master -f

# Add gitee remote
git remote add github git@github.com:baomidou/mybatis-plus-doc.git
git push github master -f

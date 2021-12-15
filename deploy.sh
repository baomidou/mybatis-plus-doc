#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成文档
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 部署到Coding
echo 'baomidou.com' > CNAME  # 自定义域名
echo 'google.com, pub-4147143076931995, DIRECT, f08c47fec0942fa0' > ads.txt # 谷歌广告相关文件

msg="来自Github Actions的自动部署，更新于$(date "+%Y-%m-%d %H:%M:%S")"
codingUrl=https://${CODING_USER}:${CODING_TOKEN}@e.coding.net/yangyang0507/mybatis-plus-doc.git

git init
git add -A
git push -f $codingUrl master

# 删除
cd -
rm -rf docs/.vuepress/dist

## yarn create react-app qiankun-base --template typescript
如果上述命令安装过程中报错error An unexpected error occurred: "https://registry.npmjs.org/create-react-app: ETIMEDOUT".
可以运行`yarn config set "strict-ssl" false -g`或者`npm config set "strict-ssl" false -g` 试试

再不行就切换镜像到淘宝镜像
`npm install -g cnpm --registry=https://registry.npm.taobao.org`
`npm config set registry https://registry.npm.taobao.org`
`npm get registry`



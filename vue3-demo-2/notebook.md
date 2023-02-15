## vue3源码学习
照着视频写的代码




1. `yarn add typescript rollup rollup-plugin-typescript2 @rollup/plugin-node-resolve @rollup/plugin-json execa --ignore-workspace-root-check`
其中`--ignore-workspace-root-check`忽略workspace里面的package不用安装,就是只安装在最外面的package就可以了


rm -rf node_modules 删除当前目录下的node_modules


## 看vue3源码
vue3源码尽量用yarn安装依赖,不然可能会有一些怪异的错误
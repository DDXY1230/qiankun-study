1. react 配置隐藏起来怎么办?
- rewired 修改配置
- npm run eject 弹出配置文件,但是不可逆


2. 高阶组件 要添加装饰器 这个方法我没有试同,该项目中采用下面 3方式才试通
需要安装一些库`npm i react-app-rewired customize-cra @babel/plugin-proposal-decorators -D`
另外将package的script的脚本
```
 "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
```
改成
```
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  },
```
然后重写配置文件`config-overrides.js` `jsconfig.json`

3. react项目中装饰器报错的解决方案
-创建react项目
  `npm install -g create-react-app`  // 安装create-react-app，已安装请忽略
  `create-react-app [项目名]`
- 安装插件 —— 改变 create-react-app 中 webpack 配置
`yarn add -D react-app-rewired customize-cra `
`yarn add -D @babel/core @babel/plugin-proposal-decorators @babel/preset-env`
- 修改package.json文件中 scripts 脚本
```
// package.json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  }

```
- 在项目根目录下创建 config-overrides.js 并写入以下内容
```
const path = require('path')
const { override, addDecoratorsLegacy } = require('customize-cra')

function resolve(dir) {
    return path.join(__dirname, dir)
}

const customize = () => (config, env) => {
    config.resolve.alias['@'] = resolve('src')
    if (env === 'production') {
        config.externals = {
            'react': 'React',
            'react-dom': 'ReactDOM'
        }
    }

    return config
};
module.exports = override(addDecoratorsLegacy(), customize())
```
- 在项目根目录下创建 .babelrc 并写入以下内容
```
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ]
    ]
}
```




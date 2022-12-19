## flow 学习笔记

### 安装和运行 flow

0. `yarn init -y` 初始化一个 package.json 文件
1. `yarn add flow-bin --dev` 首先安装 flow-bin
2. 在 js 文件头加`//@flow` 如果发现类型注解爆红线,去编辑器中首选项=》设置搜索关闭 javascript validate 去掉勾选
3. `yarn flow init` 初始化一个 flow 配置文件
4. 有了配置文件在命令行用`yarn flow`启动就可以检测代码当中的问题, 可以看到语法错误的部分,使用`yarn flow stop`退出语法校验状态

### 移除文件中的类型注解的方式

5. 方案一: 校验完,可以通过 flow-remove-types 来移除类型校验,用到的插件是`yarn add flow-remove-types --dev` 安装完在命令行输入`yarn flow-remove-types . -d dist`当前目录装换过后输出到 dist 目录, 输出在 dist 目录中的文件才可以在生产模式中使用
6. 方案二: `yarn add @babel/core @babel/cli @babel/preset-flow --dev` 安装后添加一个.babelrc 配置文件,使用 babel 编译自动移除代码注解, 然后使用`yarn babel src -d dist`将 src 中的文件全部装换到 dist

### 关于插件

7. vscode 插件 Flow Language Support 更加直观的看到代码的异常

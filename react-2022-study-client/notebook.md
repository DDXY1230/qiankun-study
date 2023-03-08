1. `tsc --init` 自动生成typescript配置文件


2. `yarn add eslint`
   配置.eslintrc.js文件 自动生成的命令是: `npx eslint --init`

3. 配置vscode自动修复eslint的方法
   - 安装vscode的eslint插件
   - 在当前工作目录下心间   .vscode/setting.json
   ```
   {
  "eslint.autoFixOnsave": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    }
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
 }

   ```
4. 配置提交规范
  - 装一个哈士奇 huskey `yarn add husky -D`
  - 全局安装commitizen  全局安装可以用 git cz 代替 git commit  `npm i -g commitizen`
  - 本地安装一个适配器 `npm i cz-conventional-changelog -D`
  - 再到package.json配置一个选项
      ```

      "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
  }
      ```
  - git cz 回车
  - 请选择提交类型
  - git  log --oneline  查看提交情况
  以上格式化提交完成
  以上一统操作之后如果你还是想git commit -m "xxx" 也是可以的
  但是在团队中为了更好的规范我们还是需要一些约定
   安装commitlint
   commitlint 用来在代码提交前来校验我们的代码是否符合标准
   commitlint 也需要一个adapter适配器 `npm i @commitlint/config-conventional @commitlint/cli --save-dev`
   安装后package.json
   ```
"commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
   ```
   ```
   "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
   ```
   有的情况需要生成变更日记
   `cnpm i -g conventional-changelog-cli`
   生成的最新的日志
   `conventional-changelog -p angular -i CHANGELOG.md -s`

  提交前检查代码是否合法的方式,保证多人协作的时候保证代码风格一致性
  在husky中添加hooks
```
"husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "post-commit": "conventional-changelog -p angular -i CHANGELOG.md -s"
    }
  }
  "lint-staged": {
    "*.tsx": "eslint --fix"
  }
  ```

  提交之后执行生成日子也要配钩子


  shiping在zf架构课程react第67节
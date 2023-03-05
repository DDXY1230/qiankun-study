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

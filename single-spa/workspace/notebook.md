## 使用single-spa创建应用
1. `create-single-spa` 会出现一个问题
2. 创建一个容器应用,暂时取名container
3. 选择  single-spa root config
4. 



## package.json中提交代码校验的钩子
```
"husky": {
    "hooks": {
      "pre-commit": "pretty-quick --staged && concurrently npm:test npm:lint"
    }
  },
```
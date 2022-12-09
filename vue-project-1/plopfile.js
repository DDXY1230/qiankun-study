


// plop 入口文件,需要到处一个函数
// 此函数接收一个plop对象,用于创建生成器任务
// yarn add plop --dev
// 安装完plop 就创建一个plop的入口文件plopfile.js   
// yarn plop component  运行这条命令可以按照你的配置生成组件
// 用于创建同类型的文件太方便了

module.exports = plop => {
  plop.setGenerator('component', {
    description: 'create a component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name',
        default: 'MyComponent'
      }
    ],
    actions: [
      {
        type: 'add', // 添加一个全新的文件
        path: 'src/components/{{name}}/{{name}}.js', // 表示添加到文件的地址 name就是prompts里面的name
        templateFile: 'plop-templates/component.hbs'
      }
    ]
  })
}
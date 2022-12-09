#!/usr/bin/env node

///* 
//Node cli 应用入口文件必须要有这个文件头
//如果是linux或者macOS系统下还需要修改此文件的读写权限为755
//具体就是通过chmod 755 cli.js实现修改
// */
// console.log('cli working')


// 脚手架的工作过程
// 1.通过命令行交互询问用户问题
// 2.根据用户回答的结果生成文件
const fs = require('fs')
const inquirer = require('inquirer') 
const path = require('path')
const ejs = require('ejs')

inquirer.prompt([
  {
    type: 'input',
    name: 'name',
    message: 'Project name?'
  }
]).then(anwsers => {
  // console.log(anwsers)
  // 根据用户的结果生成文件
  const tmplDir = path.join(__dirname, 'templates')
  // 目标文件
  const destDir = process.cwd()
  // 将目标文件全部转换到目标目录
  fs.readdir(tmplDir, (err, files) => {
    if(err) throw err
    files.forEach(file => {
      // 通过模版引擎渲染模版 yarn add ejs 安装一个ejs的模版引擎
      ejs.renderFile(path.join(tmplDir,file), anwsers,(err,result) => {
        console.log(result)
        if(err) throw err
        fs.writeFileSync(path.join(destDir, file), result)
      })
    })
  })
})
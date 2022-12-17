const marked = require("marked");
module.exports = (source) => {
  console.log(source);
  console.log("jjjjjjjjj_---------");
  // return 'console.log("112233")' //loader管道最后都必须返回javascript代码

  const html = marked.parse(source);
  // return `module.exports = ${JSON.stringify(html)}`
  return html;
  // 如果直接返回html 那么loader就要加一个html-loader
};

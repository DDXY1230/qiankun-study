let nunjucks = require("nunjucks");
let path = require("path");

// 第一个参数是配置视图所在的路径, 当前文件夹中的view文件夹
nunjucks.configure(path.resolve("view"), {
  autoescape: true,
});
let result = nunjucks.render("users.html", {
  user: [
    {
      id: 1,
      name: "一一",
    },
    {
      id: 2,
      name: "二二",
    },
  ],
}); // view下面的index.html文件
console.log(result);

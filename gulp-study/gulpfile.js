// gulp 的入口文件
// 最新的gulp要求是异步,所以每次执行完毕必须手动调用一些done()

// yarn add gulp-clean-css --dev 压缩css的插件
//yarn add gulp-rename --dev 重命名的插件
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const { src, dest } = require("gulp");
exports.default = () => {
  return src("src/css/*.css") // _header.css像这种下划线开头的文件可能读取不到
    .pipe(cleanCss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(dest("dist"));
};

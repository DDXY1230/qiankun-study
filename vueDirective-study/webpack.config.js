const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "www"),
    compress: false,
    port: 8888,
    // 虚拟打包的路径,bundle.js文件没有真正的生成
    publicPath: "/xuni/",
  },
};

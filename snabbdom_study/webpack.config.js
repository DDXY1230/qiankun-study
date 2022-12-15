const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  devServer: {
    contentBase: path.join(__dirname, "www"),
    compress: false,
    port: 8888,
    // 虚拟打包的路径,bundle.js文件没有真正的生成
    // publicPath: '/xuni/'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: 'eslint-loader',
      //   enforce: 'pre'
      // },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.png$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
          },
        },
      },
    ],
  },
  devtool: "inline-source-map", //适合开发的时候查看代码具体在哪一行
};

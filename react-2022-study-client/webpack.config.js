const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const isProduction = process.env.NODE_ENV === "development";
module.exports = {
  mode: isProduction ? "production" : "development",
  entry:'./src/index.tsx',
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
  devtool: "source-map",
  devServer: {
    port: 8080,
    hot: true,
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: {
      // 因为我们可能会使用浏览器路由,刷新的时候需要重定向到根文件, 在其他页面刷新会跳回这里
      index: "./index.html",
    },
  },
  resolve: {
    alias: {
      // 配置解析的别名
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname, "node_modules"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: "babel-loader", // ts-loader 性能差,主流已经不再用了,一般用babel-loader
        options: {
          presets: [
            "@babel/preset-env", // 解析 es+
            "@babel/preset-react", // 解析react jsx
            "@babel/preset-typescript", // 解析typescript
          ],
          plugins: [
            [
              "import",
              {
                libraryName: "antd",
                style: "css",
              },
            ], //babel-plugin-import 可以实现按需加载的babel插件
          ],
        },
        include: path.resolve("src"),
        exclude: /node_modules/,
      },
      {
        test: /\.css/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 3,
            }, // import的文件之前需要经过几个loader处理
          },
          {
            loader: "postcss-loader", // 加入厂商的兼容性前缀
            options: {
              postcssOptions: {
                plugins: ["antoprefixer"],
              },
            },
          },
          {
            loader: "px2rem-loader", // 可以px单位编程rem单位
            options: {
              remUnit: 75, // 1个rem对应75px
              remPrecesion: 8, // 计算精度保留8位小数
            },
          },
          "less-loader",
        ],
      },
      {
        test: /\.(jpg|png|gif|svg|jpeg)/,
        type: "asset", // 以前用的file-loader url-loader 现在不需要, 因为现在webpack内部支持资源文件加载了
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};

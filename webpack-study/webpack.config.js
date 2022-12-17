const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

class MyPlugin {
  apply(compile) {
    console.log(" myPlugin working");
    compile.hooks.emit.tap("MyPlugin", (compilation) => {
      // compilation可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        // compilation.assets[name].source()
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const withoutComments = contents.replace(/\/\*\*+\*\//g, ""); // 移除注释
          compilation.assets[name] = {
            source: () => withoutComments,
            size: () => withoutComments.length,
          };
        }
      }
    });
  }
}

module.exports = {
  entry: { main: "./src/main.js", index: "./src/index.js" }, // 打包的入口文件
  output: {
    filename: "[name]-[hash:8].bundle.js",
    path: path.join(__dirname, "dist"), // 打包到dist目录下的bundle.js文件中
    publicPath: "dist/",
  },
  devtool: "source-map", //
  devServer: {
    // contentBase: './public',
    hot: true,
    proxy: {
      "/api": {
        // target: 'https://api.xxxx',
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
  mode: "development", // 默认是producttion, 还有none,不做任何额外的处理
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
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.(png|jpg)$/,
        // use: ['file-loader']
        use: {
          loader: "url-loader",
          options: {
            limit: 10 * 1024,
          },
        }, // 10kb一下的文件才会转base64
      },
      {
        test: /.html$/,
        use: {
          loader: "html-loader",
          options: {
            // attrs: ['img:src', 'a:href'] //出错,可能是版本更新了没有这个写法了
          },
        },
      },
      {
        test: /.md$/,
        // use: './markdown-loader',
        use: ["html-loader", "./markdown-loader"],
      },
    ],
  },
  optimization: {
    // tree- shaking
    // usedExports: true,
    // concatenateModule: true,// 尽可能个将所有的函数合并在一个模块,主要是缩小代码体积
    // minimize: true
  },
  plugins: [
    new CleanWebpackPlugin(), // 打包前会清理dist目录
    // new CopyWebpackPlugin({ // 开发阶段一般不使用
    //   patterns: [{
    //     from: "public",
    //     to: "public"
    //   }, ]
    // }),
    new MyPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      API_BASE_URL: '"xxxx"', // 注意这里是字符串  JSON.stringfy('httpxxxx')
    }),
    // new HtmlWebpackPlugin({
    //   filename: 'main.html',
    //   title: '正在学习webpack',
    //   meta: {
    //     viewport: 'width=device-width'
    //   },
    //   template: './index.html',
    //    chunks: ['index']
    // })
    // new HtmlWebpackPlugin() // 出错,没找到原因,可能是我写的代码哪里出错了,也可能是版本升级了
  ],
};

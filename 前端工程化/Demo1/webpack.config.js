const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserJSPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const config = {
  entry: "./src/index.js",
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  devServer: {
    hot: true
  },
  mode: "development",
  // optimization: {
  //   minimizer: [new TerserJSPlugin({}),new OptimizeCssAssetsPlugin({})]
  // },
  module: {
    rules: [{
        test: /\.(css|scss)$/, // 对于scss文件需要sass-loader处理,还要安装node-sass
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        // use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'template.html', // webpack.config.js同级的template.html
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.join(__dirname, './assets'),
        to: 'assets'
      }]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}
module.exports = config
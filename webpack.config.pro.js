const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // JS注入html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 打包的时候，清理原来的文件

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 把style标签整合到CSS文件里面

module.exports = {
  entry: './src/main.ts', // 改成TS
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash].js'
  },
  mode: 'production', // 改成生产环境
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true, // 自动打开
    port: 8081, // 默认8080
  },
  resolve: {
    "extensions": ['.ts', '.js', '.json'], // 加载没有后缀名的文件的时候匹配的顺序 默认js json 所以我们经常在代码里面import js的时候不写后缀
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [ MiniCssExtractPlugin.loader, 'css-loader'],
      exclude: [
        path.resolve(__dirname, 'src/components')
      ]
    }, 
    {
      test: /\.css$/,
      use: [ MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: {
          modules: { // true
            localIdentName: '[path][name]__[local]--[hash:base64:5]', // 注意不同的版本有不同的配置规则
          },
        },
      }],
      include: [
        path.resolve(__dirname, 'src/components'), // 把components下面的CSS设置成局部的CSS，使得内部的CSS不互相干扰
      ]
    }, 
    {
      test: /\.(eot|woff|ttf|woff2|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'iconfont', // 打包的时候，把这些字体相关的文件都放到一个文件夹里面
        }
      }]
    }, {
      test: /\.ts$/,
      use: ['ts-loader'],
      exclude: /node_modules/,
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'main.[hash].css'
    }),
  ],
}
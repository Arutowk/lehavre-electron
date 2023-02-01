const path = require("path");
const webpackMerge = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//以 /src/renderer/app.tsx 为入口，并配置了本地开发 devServer，
//通过 HtmlWebpackPlugin 自动生成一份以 /src/renderer/index.html 为模版的 HTML 文件
const devConfig = {
  mode: "development",
  entry: {
    // 👇 对应渲染进程的 app.jsx 入口文件
    index: path.resolve(__dirname, "../src/renderer/app.tsx"),
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  target: "electron-renderer",
  devtool: "inline-source-map",
  devServer: {
    //Use static instead as contentBase is deprecated in latest Webpack v5
    static: path.join(__dirname, "../dist"),
    compress: true,
    host: "127.0.0.1", // webpack-dev-server启动时要指定ip，不能直接通过localhost启动，不指定会报错
    port: 7001, // 启动端口为 7001 的服务
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 👇 以此文件为模版，自动生成 HTML
      template: path.resolve(__dirname, "../src/renderer/index.html"),
      filename: path.resolve(__dirname, "../dist/index.html"),
      chunks: ["index"],
    }),
  ],
};

module.exports = webpackMerge.merge(baseConfig, devConfig);

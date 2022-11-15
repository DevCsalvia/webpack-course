const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const webpack = require("webpack");
const {PurgeCSSPlugin} = require("purgecss-webpack-plugin")
const glob = require("glob")

const purgePath = {
  src: path.join(__dirname, "src")
}

module.exports = {
  entry: {
    index: "./src/index.js",
    courses: "./src/pages/courses.js"
  },
  output: {
    // if contenthash changes bundle will be downloaded again
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, "dist"),
    // Clean dist on every build
    clean: true
  },
  devServer: {
    static: "./dist",
    client:{
      overlay: false
    }
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        // Style-loader injected css styles into bundle
        // MiniCssExtractPlugin will create css files in dist folder
        use: [MiniCssExtractPlugin.loader,
          {loader: "css-loader"}
        ]
      },
      {
        test: /\.s[ac]ss$/,
        // Style-loader injected css styles into bundle
        // MiniCssExtractPlugin will create css files in dist folder
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader"},
          {loader: "sass-loader"}
        ]
      }
    ]
  },
  plugins:[
    // To preserve index.html template with entry(chunk) 'index: "./src/index.js"' injected and bundle into file with filename: "index.html"
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      chunks: ["index"],
      inject: true,
      filename: "index.html"
    }),
    // To preserve courses.html template with entry(chunk) 'courses: "./src/pages/courses.js"' injected and bundle into file with filename: "courses.html"
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/pages/courses.html"),
      chunks: ["courses"],
      inject: true,
      filename: "courses.html"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets/images/*"),
          to: path.resolve(__dirname, "dist"),
          context: "src"
        }
      ]
    }),
    // Remove unused CSS code
    new PurgeCSSPlugin({
      paths: glob.sync(`${purgePath.src}/**/*`, {nodir: true}),
      safelist: ["dummy-css"]
    }),
    // new BundleAnalyzerPlugin({}),
    // For MiniCssExtractPlugin to work should be provided as plugin
    new MiniCssExtractPlugin({}),
    // Automatically load modules instead of having to import or require them everywhere.
    new webpack.ProvidePlugin({
      mnt: "moment",
      $: "jquery"
    })
  ],
  // Shared packages move to one chunk and loaded separately then caching of browsers do not reload them
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  }
}
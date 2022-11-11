const path = require("path");
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: "./src/index.js",
    product: "./src/products.js",
  },
  // To make bundles for each entry with different filename we should place [name] (name = "entry key")
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist"
  },
  plugins:[
      // To preserve index.html template with entry(chunk) 'index: "./src/index.js"' injected and bundle into file with filename: "index.html"
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "src/index.html"),
        chunks: ["index"],
        inject: true,
        filename: "index.html"
      }),
    // To preserve products.html template with entry(chunk) 'product: "./src/products.js"' injected and bundle into file with filename: "products.html"
      new htmlWebpackPlugin({
        template: path.resolve(__dirname, "src/products.html"),
        chunks: ["product"],
        inject: true,
        filename: "products.html"
      })
  ]
};

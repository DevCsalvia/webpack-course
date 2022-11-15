const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");

module.exports = merge(commonConfig, {
  mode: "development",
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
        use: [{loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },
      {
        test: /\.s[ac]ss$/,
        // Style-loader injected css styles into bundle
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "sass-loader"}
        ]
      }
    ]
  },
  plugins:[
    new BundleAnalyzerPlugin({})
  ],
})


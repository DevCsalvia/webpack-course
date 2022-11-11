const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: {
        index: "./src/index.js",
        courses: "./src/pages/courses.js"
    },
    output: {
        filename: '[name].bundle.js',
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
              use: [
                  {loader: "style-loader"},
                  {loader: "css-loader"}
              ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            }
        ]
    },
    plugins:[
        // To preserve index.html template with entry(chunk) 'index: "./src/index.js"' injected and bundle into file with filename: "index.html"
        new htmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
            chunks: ["index"],
            inject: true,
            filename: "index.html"
        }),
        // To preserve courses.html template with entry(chunk) 'courses: "./src/pages/courses.js"' injected and bundle into file with filename: "courses.html"
        new htmlWebpackPlugin({
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
        })
    ]
}
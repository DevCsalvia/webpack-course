const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

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
    module:{
        rules:[
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                type: "asset/resource"
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
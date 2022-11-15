const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {PurgeCSSPlugin} = require("purgecss-webpack-plugin")
const glob = require("glob")
const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.common");

const purgePath = {
    src: path.join(__dirname, "src")
}

module.exports = merge(commonConfig, {
    mode: "production",
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
        // For MiniCssExtractPlugin to work should be provided as plugin
        new MiniCssExtractPlugin({}),
    ],
})
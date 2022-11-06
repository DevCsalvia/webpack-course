const path = require("path");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname,"dist"),
        assetModuleFilename: "images/[hash][ext]",
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [
                    {loader:"style-loader"},
                    {loader:"css-loader", options:{modules: true}}
                ],
            },
            {
                test: /\.(s[ac]ss)$/,
                use: [
                    {loader:"style-loader"},
                    {loader:"css-loader", options:{modules: true}},
                    {loader:"sass-loader"}
                ],
            },
            // Loading of images doesn't require file-loader since it's already integrated into webpack
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource"
            }
        ]
    }
}
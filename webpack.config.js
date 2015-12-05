'use strict';
var webpack = require("webpack"),
    path = require("path");

const APP = path.join(__dirname, "src");
const BUILD = path.join(__dirname, "public/app");
const BUILD_JS = path.join(BUILD, "js");

module.exports = {
    context: APP,
    entry: {
        main: "./js/main.js",
        other: "./js/other.js"
    },
    output: {
        path: BUILD_JS,
        filename:  "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel",
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js")
    ]
};
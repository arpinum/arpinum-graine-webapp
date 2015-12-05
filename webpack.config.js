"use strict";
let webpack = require("webpack"),
    path = require("path"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin'),
    AssetsPlugin = require('assets-webpack-plugin');

const APP = path.join(__dirname, "src");
const BUILD = path.join(__dirname, "server/public/app");


module.exports = {
    context: APP,
    entry: {
        main: "./js/main.js",
        other: "./js/other.js"
    },
    output: {
        path: BUILD,
        filename: "[name].[chunkhash].js",
        publicPath: "/app/",
        chunkFilename: "[id].[name].[chunkhash].js"
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
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&minetype=image/svg+xml"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.[chunkhash].js"),
        new ExtractTextPlugin("[name].[chunkhash].css"),
        new ngAnnotatePlugin({
            add: true
        }),
        new AssetsPlugin({path: BUILD, filename:  "map.json"})
    ]
};
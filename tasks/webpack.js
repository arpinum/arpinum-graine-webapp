module.exports = function (grunt) {

  "use strict";
  let _ = require("lodash");
  let webpack = require("webpack");

  grunt.registerTask("webpack", function () {
    const compiler = webpack(makeConfig(grunt.config("prod")));
    let done = this.async();
    if (grunt.option("watch")) {
      compiler.watch({}, logResult(_.noop));
    } else {
      compiler.run(logResult(done));
    }
  });

  function logResult(callback) {
    return (err, stats) => {
      if (stats.hasError) {
        grunt.log.writeln(stats.toString({colors:true}));
      } else {
        grunt.log.ok(stats.toString({colors:true}));
      }
      callback();
    }
  }

  function makeConfig(prod) {
    let path = require("path"),
      ExtractTextPlugin = require("extract-text-webpack-plugin"),
      ngAnnotatePlugin = require('ng-annotate-webpack-plugin'),
      AssetsPlugin = require('assets-webpack-plugin');


    const APP = path.join(grunt.config("srcDir"));
    const BUILD = path.join(grunt.config("buildDir"));
    var configuration = {
      context: APP,
      entry: {
        main: "./js/main.js",
        other: "./js/other.js"
      },
      output: {
        path: BUILD,
        filename: makeName("[name]"),
        publicPath: "/app/",
        chunkFilename: makeName("[id].[name]")
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            loader: "babel",
            exclude: /node_modules/
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
        new webpack.optimize.CommonsChunkPlugin("vendor", makeName("vendor")),
        new ExtractTextPlugin(makeName("[name]", "css")),
        new ngAnnotatePlugin({
          add: true
        })

      ]
    };
    if (prod) {
      configuration.plugins.push(new webpack.optimize.UglifyJsPlugin());
      configuration.plugins.push(new AssetsPlugin({path: BUILD, filename: "map.json"}));
    }

    return configuration;

    function makeName(name, extension) {
      extension = extension || "js";
      return prod ? `${name}.[chunkhash].${extension}` : `${name}.${extension}`;
    }
  }

};
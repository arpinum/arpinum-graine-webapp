module.exports = function (grunt) {

    "use strict";
    var _ = require("lodash");

    grunt.registerTask("webpack", function () {
        grunt.util.spawn({
            cmd: "./node_modules/webpack/bin/webpack.js",
            args: _.extend(["--progress", "--colors"], grunt.option("prod") ? ["--optimize-minimize"]:[], grunt.option("watch") ? ["--watch"]: []),
            grunt: false,
            opts: {
                stdio: "inherit"
            }
        }, this.async());
    });
};
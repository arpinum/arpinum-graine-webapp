module.exports = function (grunt) {

    "use strict";
    var _ = require("lodash");

    grunt.registerTask("js", function () {
        grunt.util.spawn({
            cmd: "./node_modules/webpack/bin/webpack.js",
            args: _.extend(["--progress", "--colors"], grunt.option("watch") ? ["--watch"]: []),
            grunt: false,
            opts: {
                stdio: "inherit"
            }
        }, this.async());
    });
};
"use strict";


module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    var config = {
        pkg: grunt.file.readJSON("package.json"),
        prod: grunt.option("prod") || false,
        buildDir: "server/public/app"
    };

    grunt.util._.extend(config, loadConfig("./tasks/options/"));
    grunt.initConfig(config);


    grunt.loadTasks("tasks");

    grunt.registerTask("test", ["jshint", "mocha:console"]);

    grunt.registerTask("ci", ["jshint", "mocha:ci", "build"]);

    grunt.registerTask("default", ["clean", "dev"]);

    grunt.registerTask("build", ["clean", "assets"]);


    function loadConfig(path) {
        var glob = require("glob");
        var object = {};
        var key;

        glob.sync('*', {cwd: path}).forEach(function(option) {
            key = option.replace(/\.js$/,'');
            object[key] = require(path + option);
        });

        return object;
    }
};
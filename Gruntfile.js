"use strict";



module.exports = function (grunt) {

    var exposify = require("exposify");
    exposify.config = {angular: "angular"};

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        mustWatch: false,
        prod: grunt.option("prod") || false,
        buildDir: "public/genere",
        jshint: {
            all: ["src/js/**/*.js"],
            options: {
                jshintrc: true,
                reporter: require("jshint-stylish")
            }
        },
        mochaTest: {
            console: {
                src: ["src/js/**/*_spec.js"],
                options: {
                    reporter: ["spec"]
                }
            },
            watch: {
                src: ["src/js/**/*_spec.js"],
                options: {
                    reporter: ["dot"]
                }
            },
            ci: {
                src: ["src/js/**/*_spec.js"],
                options: {
                    reporter: ["Xunit"]
                }
            }
        },
        browserify: {
            main: {
                files: [{
                    expand: true,
                    cwd: "src/js",
                    src: ["*.js", "!*_spec.js", "!vendor.js"],
                    dest: "<%= buildDir %>/js/"
                }],
                options: {
                    watch: "<%= mustWatch %>",
                    transform: ["exposify"],
                    browserifyOptions: {
                        debug: "<%= !prod %>"
                    },
                    external: ["angular", "jquery", "underscore"]
                }
            },
            vendor: {
                src: "src/js/vendor.js",
                dest: "<%= buildDir %>/js/vendor.js",
                options: {
                    transform: ["browserify-shim"],
                    watch: "<%= mustWatch %>",
                    browserifyOptions: {
                        debug: "<%= !prod %>"
                    }
                }
            }
        },
        uglify: {
            prod: {
                files: [{
                    expand: true,
                    cwd: "<%= buildDir %>",
                    src: "js/*.js",
                    dest: "<%= buildDir %>/js/",
                    flatten: true
                }]
            }
        },
        less: {
            options: {
                cleancss: "<%= prod %>",
                sourceMap: "<%= !prod %>"
            },
            all: {
                files: [{
                    expand: true,
                    cwd: "src/less",
                    src: ["*.less"],
                    dest: "<%= buildDir %>/css",
                    ext: ".css"
                }]
            }
        },
        watch: {
            less: {
                files: "src/less/**/*.less",
                tasks: ["less"]
            },
            js: {
                files: ["src/js/**/*.js"],
                tasks: ["jshint", "mochaTest:watch"]
            }
        },
        nodemon: {
            server: {
                script: "server.js"
            }
        }
    });


    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.registerTask("test", ["jshint", "mochaTest:console"]);
    grunt.registerTask("ci", ["jshint", "build", "mochaTest:ci"]);

    grunt.registerTask("default", function () {
        grunt.config.set("mustWatch", true);
        //grunt.task.run(["less", "browserify", "nodemon:server", "watch"]);
        grunt.task.run(["less", "browserify", "watch"]);
    });

    grunt.registerTask("build", function () {
        grunt.task.run(["less", "browserify"]);
        if (grunt.option("prod")) {
            grunt.task.run("uglify");
        }
    });

    grunt.registerTask("test", ["mochaTest:console"]);
};
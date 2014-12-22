"use strict";
var watchify = require("watchify");
var browserify = require("browserify");
var _ = require("underscore");

module.exports = function (grunt) {
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
                    reporter: ["dot"]
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

    grunt.registerTask("vendor", function () {
        var done = this.async();
        var bowerResolve = require("bower-resolve");
        var shims = require("./shim.js"),
            sharedModules = Object.keys(shims);

        bowerResolve.init(function () {
            var vendor = createBundle({
                debug: true,
                noParse: sharedModules
            }).transform(["browserify-shim"]);

            sharedModules.forEach(function (shareModule) {
                vendor.require(bowerResolve(shareModule), {expose: shareModule});
            });
            bundle(vendor, grunt.template.process("<%= buildDir%>/js/vendor.js"), done, false);
        });


    });

    grunt.registerTask("app", function () {
        var done = this.async();
        var shims = require("./shim.js"),
            sharedModules = Object.keys(shims);

        var appMapping = grunt.file.expandMapping(["*.js", "!*_spec.js", "!vendor.js"], grunt.template.process("<%= buildDir %>/js"), {
            flatten: true,
            cwd: "./src/js"
        });
        appMapping.forEach(function (mapping) {
            var app = createBundle({}, grunt.option("watch"));
            app.external(sharedModules);
            app.transform("browserify-ngannotate");
            mapping.src.forEach(function (file) {
                app.add("./" + file);
            });
            bundle(app, mapping.dest, done, grunt.option("watch"));
        });
    });

    function createBundle(options, watch) {
        options = _.extend(options || {}, {debug: !grunt.option("prod")});
        if (watch) {
            return browserify(_.extend(options, watchify.args));
        }
        return browserify(options);
    }

    function bundle(b, output, done, watch) {
        if (watch) {
            grunt.log.write("Watchify " + output);
            var w = watchify(b);
            w.on('update', function () {
                bundle(w);
            });
            w.on('log', grunt.log.ok);
            bundle(w);
        } else {
            bundle(b);
        }

        function bundle(wrapper) {
            wrapper.bundle(function (err, buff) {
                if (err) {
                    grunt.log.error(err.toString());
                    if (!watch) {
                        done(false);
                    }
                } else {
                    grunt.file.write(output, buff);
                    if (!watch) {
                        done();
                    }
                }
            });
        }
    }

    grunt.registerTask("test", ["jshint", "mochaTest:console"]);
    grunt.registerTask("ci", ["jshint", "build", "mochaTest:ci"]);

    grunt.registerTask("default", function () {
        var backgroundWatch = grunt.util.spawn({grunt:true, args: ["js", "--watch"]}, function () {
            grunt.log.writeln("done");
        });
        backgroundWatch.stdout.pipe(process.stdout);
        backgroundWatch.stderr.pipe(process.stderr);
        grunt.task.run(["less", "jshint", "mochaTest:console", "watch"]);
    });

    grunt.registerTask("build", function () {
        grunt.task.run(["less", "js"]);
        if (grunt.option("prod")) {
            grunt.task.run("uglify");
        }
    });

    grunt.registerTask("js", ["vendor", "app"]);
};
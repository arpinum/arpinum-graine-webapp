module.exports = function (grunt) {

    var watchify = require("watchify");
    var browserify = require("browserify");
    var _ = require("underscore");

    grunt.registerTask("js", ["vendor", "app"]);

    grunt.registerTask("vendor", function () {
        var done = this.async();
        var bowerResolve = require("bower-resolve");
        var shims = require(".././shim.js"),
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
        var shims = require(".././shim.js"),
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
};
module.exports = function (grunt) {

    grunt.registerTask("dev", function () {
        var backgroundWatch = grunt.util.spawn({grunt: true, args: ["js", "--watch"]}, function () {
            grunt.log.writeln("done");
        });

        grunt.option.watch = true;
        backgroundWatch.stdout.pipe(process.stdout);
        backgroundWatch.stderr.pipe(process.stderr);
        grunt.task.run(["less", "jshint", "mocha:console", "watch"]);
    });

};
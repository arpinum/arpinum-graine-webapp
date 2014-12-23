module.exports = function (grunt) {
    grunt.registerTask("build", function () {
        grunt.task.run(["clean", "less", "js"]);
        if (grunt.config.get("prod")) {
            grunt.task.run(["uglify", "rev"]);
        }
    });
};
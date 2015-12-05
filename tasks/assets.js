module.exports = function (grunt) {
    grunt.registerTask("assets", function () {
        grunt.task.run(["webpack"]);

    });
};
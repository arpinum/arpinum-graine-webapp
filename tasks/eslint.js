module.exports = function (grunt) {

  grunt.registerTask('eslint', function () {
    grunt.util.spawn({
      cmd: './node_modules/eslint/bin/eslint.js',
      args: ['.'],
      grunt: false,
      opts: {
        stdio: 'inherit'
      }
    }, this.async());
  });
};
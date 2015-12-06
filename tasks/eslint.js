module.exports = function (grunt) {

  grunt.registerTask('eslint', function () {
    grunt.util.spawn({
      cmd: './node_modules/eslint/bin/eslint.js',
      args: ['*.js', '--ignore-path node_modules server/public'],
      grunt: false,
      opts: {
        stdio: 'inherit'
      }
    }, this.async());
  });
};
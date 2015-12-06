'use strict';


module.exports = function (grunt) {

    var tests = './src/js/**/*_spec.js';
    var _ = require('lodash');

    grunt.registerTask('mocha:ci', function () {
        run('xunit', this.async());
    });

    grunt.registerTask('mocha:console', function () {
        run('dot', this.async());
    });

    function run(reporter, done) {
        grunt.util.spawn({
            cmd: './node_modules/mocha/bin/mocha',
            args: _.extend(['--compilers', 'js:babel-register', '--reporter', reporter, tests]),
            opts: {
              stdio : 'inherit'
            },
            grunt: false
        }, done);
    }
};